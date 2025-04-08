import React, { useCallback } from 'react';
import { LineChart, PieChart, BarChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalytics } from '@/context/AnalyticsContext';
import { useAnalyticsData } from '@/hooks/analytics';
import FilterBar from './FilterBar';
import PerformanceMetricsCard from './PerformanceMetricsCard';
import CapitalVelocityChart from './CapitalVelocityChart';
import InvestorSegmentationChart from './InvestorSegmentationChart';
import PredictiveInsightsCard from './PredictiveInsightsCard';

/**
 * Main Analytics Dashboard Component
 * 
 * This is the primary component for the Analytics section that:
 * - Provides filter controls
 * - Organizes analytics visualizations
 * - Implements view toggling and report generation
 */
const AnalyticsDashboard: React.FC = () => {
  const { refreshData, isLoading, activeView, setActiveView } = useAnalytics();
  const { performanceMetrics, velocityTrend, sourceBreakdown } = useAnalyticsData();
  
  // Handle data refresh
  const handleRefresh = useCallback(() => {
    refreshData();
  }, [refreshData]);
  
  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <FilterBar onRefresh={handleRefresh} />
      
      {/* View Selection */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
        <Tabs value={activeView} onValueChange={(val: any) => setActiveView(val)} className="w-auto">
          <TabsList className="grid w-auto grid-cols-3">
            <TabsTrigger value="basic" className="px-3 py-1.5">Basic</TabsTrigger>
            <TabsTrigger value="detailed" className="px-3 py-1.5">Detailed</TabsTrigger>
            <TabsTrigger value="custom" className="px-3 py-1.5">Custom</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Performance Metrics Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center">
                <LineChart className="h-4 w-4 mr-2 text-[#275E91]" />
                Performance Metrics
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                Details
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <CardDescription>Key fundraising metrics and KPIs</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceMetricsCard metrics={performanceMetrics} />
          </CardContent>
        </Card>
        
        {/* Capital Velocity Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center">
                <BarChart className="h-4 w-4 mr-2 text-[#275E91]" />
                Capital Velocity Trends
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                Export
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <CardDescription>Monthly fundraising velocity vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <CapitalVelocityChart data={velocityTrend} isLoading={isLoading} />
          </CardContent>
        </Card>
        
        {/* Investor Segmentation Chart */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center">
                <PieChart className="h-4 w-4 mr-2 text-[#275E91]" />
                LP Breakdown
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                Details
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <CardDescription>Capital sources by investor type</CardDescription>
          </CardHeader>
          <CardContent>
            <InvestorSegmentationChart data={sourceBreakdown} isLoading={isLoading} />
          </CardContent>
        </Card>
        
        {/* Predictive Insights Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                AI-Driven Insights
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                Refresh
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <CardDescription>Machine learning-powered fundraising analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <PredictiveInsightsCard isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;