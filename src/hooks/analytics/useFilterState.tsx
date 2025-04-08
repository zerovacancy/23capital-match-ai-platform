import { useMemo } from 'react';
import { useAnalytics } from '@/context/AnalyticsContext';

/**
 * Custom hook for managing filter UI state and operations
 * 
 * This hook provides helper functions and UI state for filter controls
 * while using the context for the actual filter values and updates.
 */
export const useFilterState = () => {
  const {
    filters,
    setDateRange,
    setLpTypeFilter,
    setDealTypeFilter,
    setStatusFilter,
    setSearchQuery,
    resetFilters,
  } = useAnalytics();
  
  // Define options for dropdown filters
  const filterOptions = useMemo(() => ({
    lpTypes: [
      { value: 'all', label: 'All Investor Types' },
      { value: 'institutional', label: 'Institutional' },
      { value: 'individual', label: 'Individual' },
      { value: 'family-office', label: 'Family Office' },
    ],
    dealTypes: [
      { value: 'all', label: 'All Deals' },
      { value: 'residential', label: 'Residential' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'mixed-use', label: 'Mixed Use' },
    ],
    statusOptions: [
      { value: 'all', label: 'All Statuses' },
      { value: 'interested', label: 'Interested' },
      { value: 'reviewing', label: 'Reviewing' },
      { value: 'soft-commit', label: 'Soft Commit' },
      { value: 'hard-commit', label: 'Hard Commit' },
      { value: 'funded', label: 'Funded' },
      { value: 'declined', label: 'Declined' },
    ],
  }), []);
  
  // Generate presets for date range filters
  const dateRangePresets = useMemo(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfQuarter = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Last 30 days
    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);
    
    // Last 90 days
    const last90Days = new Date();
    last90Days.setDate(now.getDate() - 90);
    
    return [
      { 
        label: 'This Year', 
        range: { startDate: startOfYear, endDate: now } 
      },
      { 
        label: 'This Quarter', 
        range: { startDate: startOfQuarter, endDate: now } 
      },
      { 
        label: 'This Month', 
        range: { startDate: startOfMonth, endDate: now } 
      },
      { 
        label: 'Last 30 Days', 
        range: { startDate: last30Days, endDate: now } 
      },
      { 
        label: 'Last 90 Days', 
        range: { startDate: last90Days, endDate: now } 
      },
      { 
        label: 'All Time', 
        range: { startDate: null, endDate: null } 
      },
    ];
  }, []);
  
  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.dateRange.startDate !== null ||
      filters.dateRange.endDate !== null ||
      filters.lpType !== 'all' ||
      filters.dealType !== 'all' ||
      filters.status !== 'all' ||
      filters.searchQuery.trim() !== ''
    );
  }, [filters]);
  
  // Get labels for active filters
  const activeFilterLabels = useMemo(() => {
    const labels: string[] = [];
    
    // Date range label
    if (filters.dateRange.startDate || filters.dateRange.endDate) {
      // Find matching preset if possible
      const matchingPreset = dateRangePresets.find(preset => 
        preset.range.startDate?.getTime() === filters.dateRange.startDate?.getTime() &&
        preset.range.endDate?.getTime() === filters.dateRange.endDate?.getTime()
      );
      
      if (matchingPreset) {
        labels.push(matchingPreset.label);
      } else if (filters.dateRange.startDate && filters.dateRange.endDate) {
        // Custom date range
        const start = filters.dateRange.startDate.toLocaleDateString();
        const end = filters.dateRange.endDate.toLocaleDateString();
        labels.push(`${start} - ${end}`);
      } else if (filters.dateRange.startDate) {
        // Only start date
        const start = filters.dateRange.startDate.toLocaleDateString();
        labels.push(`Since ${start}`);
      } else if (filters.dateRange.endDate) {
        // Only end date
        const end = filters.dateRange.endDate.toLocaleDateString();
        labels.push(`Until ${end}`);
      }
    }
    
    // LP Type label
    if (filters.lpType !== 'all') {
      const option = filterOptions.lpTypes.find(opt => opt.value === filters.lpType);
      if (option) {
        labels.push(option.label);
      }
    }
    
    // Deal Type label
    if (filters.dealType !== 'all') {
      const option = filterOptions.dealTypes.find(opt => opt.value === filters.dealType);
      if (option) {
        labels.push(option.label);
      }
    }
    
    // Status label
    if (filters.status !== 'all') {
      const option = filterOptions.statusOptions.find(opt => opt.value === filters.status);
      if (option) {
        labels.push(option.label);
      }
    }
    
    // Search query
    if (filters.searchQuery.trim()) {
      labels.push(`Search: "${filters.searchQuery}"`);
    }
    
    return labels;
  }, [filters, dateRangePresets, filterOptions]);
  
  return {
    // Current filter values
    filters,
    
    // Filter options
    filterOptions,
    dateRangePresets,
    
    // Filter status
    hasActiveFilters,
    activeFilterLabels,
    
    // Filter actions
    setDateRange,
    setLpTypeFilter,
    setDealTypeFilter,
    setStatusFilter,
    setSearchQuery,
    resetFilters,
  };
};