import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { 
  CapitalRaiseMetrics, 
  commitments, 
  capitalRaiseMetrics, 
  monthlyProgress, 
  capitalSourceBreakdown 
} from '@/data';

// Define filter types
export type DateRangeFilter = {
  startDate: Date | null;
  endDate: Date | null;
};

export type LPTypeFilter = 'all' | 'institutional' | 'individual' | 'family-office';
export type DealTypeFilter = 'all' | 'residential' | 'commercial' | 'mixed-use';
export type StatusFilter = 'all' | 'interested' | 'reviewing' | 'soft-commit' | 'hard-commit' | 'funded' | 'declined';

export type AnalyticsFilters = {
  dateRange: DateRangeFilter;
  lpType: LPTypeFilter;
  dealType: DealTypeFilter;
  status: StatusFilter;
  searchQuery: string;
};

// Define the context state type
export type AnalyticsContextType = {
  // Data states
  capitalMetrics: CapitalRaiseMetrics;
  commitmentData: typeof commitments;
  progressData: typeof monthlyProgress;
  sourceData: typeof capitalSourceBreakdown;
  
  // Filter states
  filters: AnalyticsFilters;
  setDateRange: (range: DateRangeFilter) => void;
  setLpTypeFilter: (type: LPTypeFilter) => void;
  setDealTypeFilter: (type: DealTypeFilter) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  
  // UI states
  isLoading: boolean;
  activeView: 'basic' | 'detailed' | 'custom';
  setActiveView: (view: 'basic' | 'detailed' | 'custom') => void;
  
  // Data actions
  refreshData: () => void;
};

// Create context with default values
export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

// Default filters
const defaultFilters: AnalyticsFilters = {
  dateRange: {
    startDate: null,
    endDate: null,
  },
  lpType: 'all',
  dealType: 'all',
  status: 'all',
  searchQuery: '',
};

// Context provider component
export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data states
  const [capitalMetrics, setCapitalMetrics] = useState<CapitalRaiseMetrics>(capitalRaiseMetrics);
  const [commitmentData, setCommitmentData] = useState(commitments);
  const [progressData, setProgressData] = useState(monthlyProgress);
  const [sourceData, setSourceData] = useState(capitalSourceBreakdown);
  
  // Filter states
  const [filters, setFilters] = useState<AnalyticsFilters>(defaultFilters);
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'basic' | 'detailed' | 'custom'>('basic');
  
  // Filter update handlers
  const setDateRange = useCallback((range: DateRangeFilter) => {
    setFilters(prev => ({ ...prev, dateRange: range }));
  }, []);
  
  const setLpTypeFilter = useCallback((type: LPTypeFilter) => {
    setFilters(prev => ({ ...prev, lpType: type }));
  }, []);
  
  const setDealTypeFilter = useCallback((type: DealTypeFilter) => {
    setFilters(prev => ({ ...prev, dealType: type }));
  }, []);
  
  const setStatusFilter = useCallback((status: StatusFilter) => {
    setFilters(prev => ({ ...prev, status: status }));
  }, []);
  
  const setSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  }, []);
  
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);
  
  // Data refresh function
  const refreshData = useCallback(() => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    // For now, we'll just simulate loading
    setTimeout(() => {
      // Reapply the current data
      setCapitalMetrics(capitalRaiseMetrics);
      setCommitmentData(commitments);
      setProgressData(monthlyProgress);
      setSourceData(capitalSourceBreakdown);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Compute the context value
  const contextValue = useMemo(
    () => ({
      // Data
      capitalMetrics,
      commitmentData,
      progressData,
      sourceData,
      
      // Filters
      filters,
      setDateRange,
      setLpTypeFilter,
      setDealTypeFilter,
      setStatusFilter,
      setSearchQuery,
      resetFilters,
      
      // UI states
      isLoading,
      activeView,
      setActiveView,
      
      // Actions
      refreshData,
    }),
    [
      capitalMetrics,
      commitmentData,
      progressData,
      sourceData,
      filters,
      setDateRange,
      setLpTypeFilter,
      setDealTypeFilter,
      setStatusFilter,
      setSearchQuery,
      resetFilters,
      isLoading,
      activeView,
      setActiveView,
      refreshData,
    ]
  );
  
  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Custom hook for using the analytics context
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};