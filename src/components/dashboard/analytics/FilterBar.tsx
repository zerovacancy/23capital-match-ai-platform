import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Calendar, 
  Users, 
  Building, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  DateRangePicker, 
  DateRange 
} from '@/components/ui/date-range-picker';
import { Badge } from '@/components/ui/badge';
import { useFilterState } from '@/hooks/analytics';
import { DateRangeFilter } from '@/context/AnalyticsContext';

/**
 * FilterBar Component
 * 
 * Provides filtering controls for analytics data including:
 * - Search
 * - Date range selection
 * - LP type filtering
 * - Deal type filtering
 * - Status filtering
 * - Filter reset
 */
const FilterBar: React.FC<{ onRefresh?: () => void }> = ({ onRefresh }) => {
  const {
    filters,
    filterOptions,
    dateRangePresets,
    hasActiveFilters,
    activeFilterLabels,
    setDateRange,
    setLpTypeFilter,
    setDealTypeFilter,
    setStatusFilter,
    setSearchQuery,
    resetFilters,
  } = useFilterState();
  
  // Local state for search input
  const [searchValue, setSearchValue] = useState(filters.searchQuery);
  
  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchValue);
  };
  
  // Handle date range change
  const handleDateRangeChange = (range: DateRange) => {
    const dateRangeFilter: DateRangeFilter = {
      startDate: range.from,
      endDate: range.to,
    };
    setDateRange(dateRangeFilter);
  };
  
  // Get current date range for the picker
  const currentDateRange: DateRange = {
    from: filters.dateRange.startDate,
    to: filters.dateRange.endDate,
  };
  
  return (
    <div className="bg-white rounded-lg border shadow-sm mb-6">
      <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
        {/* Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex w-full sm:w-auto items-center space-x-2"
        >
          <div className="relative flex-1 sm:min-w-[260px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search investors, deals or notes..."
              className="pl-9 w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button 
                type="button"
                onClick={() => {
                  setSearchValue('');
                  setSearchQuery('');
                }}
                className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-400 hover:text-gray-800"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit" className="bg-[#275E91] shrink-0">Search</Button>
        </form>
        
        <div className="flex items-center space-x-4">
          {/* Date Range Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Date Range</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-4 pb-0">
                <h4 className="font-medium text-sm mb-3">Select Date Range</h4>
              </div>
              <DateRangePicker
                value={currentDateRange}
                onChange={handleDateRangeChange}
              />
              <div className="border-t p-3">
                <div className="text-xs font-medium mb-2">Quick Select</div>
                <div className="grid grid-cols-2 gap-2">
                  {dateRangePresets.map((preset) => (
                    <Button
                      key={preset.label}
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => setDateRange(preset.range)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* LP Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>LP Type</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Investor Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOptions.lpTypes.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setLpTypeFilter(option.value)}
                  className="flex items-center justify-between"
                >
                  {option.label}
                  {filters.lpType === option.value && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Deal Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                <span>Deal Type</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Project Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOptions.dealTypes.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setDealTypeFilter(option.value)}
                  className="flex items-center justify-between"
                >
                  {option.label}
                  {filters.dealType === option.value && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Commitment Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOptions.statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className="flex items-center justify-between"
                >
                  {option.label}
                  {filters.status === option.value && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Refresh Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onRefresh}
            title="Refresh data"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="px-4 py-2 bg-gray-50 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Active Filters:</span>
          {activeFilterLabels.map((label, i) => (
            <Badge key={i} variant="secondary" className="flex items-center gap-1">
              {label}
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="ml-auto text-sm text-gray-500 hover:text-red-600"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;