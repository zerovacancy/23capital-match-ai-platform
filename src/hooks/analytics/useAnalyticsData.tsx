import { useCallback, useMemo } from 'react';
import { useAnalytics } from '@/context/AnalyticsContext';
import { analyticsCache } from '@/lib/analyticsCache';

/**
 * Custom hook for computed analytics data.
 * 
 * This hook provides various derived metrics and data transformations
 * based on the raw data from the analytics context. It handles:
 * - Applying filters to raw data
 * - Computing derived metrics
 * - Caching expensive calculations
 */
export const useAnalyticsData = () => {
  const {
    capitalMetrics,
    commitmentData,
    progressData,
    sourceData,
    filters,
    isLoading,
  } = useAnalytics();

  // Function to filter commitment data based on current filters
  const getFilteredCommitments = useCallback(() => {
    const { dateRange, lpType, dealType, status, searchQuery } = filters;
    
    // Use the cache key based on the filters
    const cacheKey = `filtered_commitments_${JSON.stringify(filters)}`;
    const cachedResult = analyticsCache.get(cacheKey);
    
    if (cachedResult) {
      return cachedResult;
    }
    
    // Apply filters
    let result = [...commitmentData];
    
    // Filter by date range if set
    if (dateRange.startDate || dateRange.endDate) {
      result = result.filter(item => {
        if (!item.commitmentDate) return true;
        
        const itemDate = new Date(item.commitmentDate);
        
        if (dateRange.startDate && itemDate < dateRange.startDate) {
          return false;
        }
        
        if (dateRange.endDate && itemDate > dateRange.endDate) {
          return false;
        }
        
        return true;
      });
    }
    
    // Filter by status
    if (status !== 'all') {
      result = result.filter(item => 
        item.status.toLowerCase().replace(' ', '-') === status
      );
    }
    
    // Filter by search query if provided
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.lpName.toLowerCase().includes(query) || 
          item.dealName.toLowerCase().includes(query) ||
          item.notes.toLowerCase().includes(query)
      );
    }
    
    // Cache the result for 5 minutes
    analyticsCache.set(cacheKey, result);
    
    return result;
  }, [commitmentData, filters]);
  
  // Capital velocity trend data (last 6 months)
  const velocityTrend = useMemo(() => {
    return progressData.map(month => ({
      name: month.month,
      target: month.target,
      actual: month.actual,
      projected: month.projected || null,
    }));
  }, [progressData]);
  
  // Compute capital source breakdown
  const sourceBreakdown = useMemo(() => {
    // Group by status
    const byStatus = sourceData.reduce((acc, item) => {
      const status = item.status;
      if (!acc[status]) {
        acc[status] = {
          status,
          total: 0,
          count: 0,
          sources: [],
        };
      }
      
      acc[status].total += item.amount;
      acc[status].count += 1;
      acc[status].sources.push(item.source);
      
      return acc;
    }, {} as Record<string, { status: string, total: number, count: number, sources: string[] }>);
    
    return Object.values(byStatus);
  }, [sourceData]);
  
  // Calculate key metrics and performance indicators
  const performanceMetrics = useMemo(() => {
    return {
      totalCommitted: capitalMetrics.softCommitments + capitalMetrics.hardCommitments,
      percentComplete: (capitalMetrics.hardCommitments / capitalMetrics.goalAmount) * 100,
      timeProgress: ((capitalMetrics.goalDate ? 
        (Date.now() - new Date(capitalMetrics.goalDate).getTime()) : 0) / 
        (capitalMetrics.remainingDays * 24 * 60 * 60 * 1000)) * 100,
      velocityTarget: capitalMetrics.velocityTarget,
      currentVelocity: capitalMetrics.currentVelocity,
      velocityRatio: capitalMetrics.currentVelocity / capitalMetrics.velocityTarget,
      probabilityOfSuccess: capitalMetrics.probabilityOfSuccess,
    };
  }, [capitalMetrics]);
  
  // Calculate trend insights
  const trendInsights = useMemo(() => {
    // Calculate month-over-month changes
    const velocityChanges = progressData
      .filter(m => m.actual > 0)
      .map((month, i, arr) => {
        if (i === 0) return { month: month.month, change: 0 };
        
        const prevMonth = arr[i - 1];
        const change = (month.actual - prevMonth.actual) / prevMonth.actual * 100;
        
        return {
          month: month.month,
          change: change
        };
      })
      .filter((_, i) => i > 0); // Remove first month as it has no comparison
    
    // Calculate performance vs target
    const performanceVsTarget = progressData.map(month => ({
      month: month.month,
      percentage: month.actual ? (month.actual / month.target) * 100 : 0,
    }));
    
    return {
      velocityChanges,
      performanceVsTarget,
      lastMonthPerformance: performanceVsTarget[performanceVsTarget.length - 1]?.percentage || 0,
    };
  }, [progressData]);
  
  return {
    // Raw data (filtered)
    filteredCommitments: getFilteredCommitments(),
    
    // Computed metrics
    velocityTrend,
    sourceBreakdown,
    performanceMetrics,
    trendInsights,
    
    // Status
    isLoading,
  };
};