import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';

interface PerformanceMetricProps {
  metrics: {
    totalCommitted: number;
    percentComplete: number;
    timeProgress: number;
    velocityTarget: number;
    currentVelocity: number;
    velocityRatio: number;
    probabilityOfSuccess: number;
  };
  isLoading?: boolean;
}

const PerformanceMetricsCard: React.FC<PerformanceMetricProps> = ({ 
  metrics,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }
  
  // Determine velocity trend indicator
  const renderVelocityTrend = () => {
    if (metrics.velocityRatio >= 1.1) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1.5" />
          <span className="text-sm font-medium">
            {((metrics.velocityRatio - 1) * 100).toFixed(1)}% above target
          </span>
        </div>
      );
    } else if (metrics.velocityRatio >= 0.9) {
      return (
        <div className="flex items-center text-blue-600">
          <span className="text-sm font-medium">On Target</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-amber-600">
          <TrendingDown className="h-4 w-4 mr-1.5" />
          <span className="text-sm font-medium">
            {((1 - metrics.velocityRatio) * 100).toFixed(1)}% below target
          </span>
        </div>
      );
    }
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-600";
    if (percentage >= 60) return "bg-blue-600";
    if (percentage >= 40) return "bg-amber-500";
    return "bg-red-500";
  };
  
  return (
    <div className="space-y-6">
      {/* Total Committed vs Goal */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline mb-1">
          <h4 className="text-sm font-medium text-gray-700">Committed Capital</h4>
          <span className="text-xs text-gray-500">Goal: {formatCurrency(metrics.totalCommitted * (100 / metrics.percentComplete))}</span>
        </div>
        <div className="text-2xl font-bold text-[#275E91]">
          {formatCurrency(metrics.totalCommitted)}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">{metrics.percentComplete.toFixed(1)}%</span>
          </div>
          <Progress 
            value={metrics.percentComplete} 
            max={100}
            className="h-2"
            indicatorClassName={getProgressColor(metrics.percentComplete)}
          />
        </div>
      </div>
      
      {/* Capital Velocity */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Capital Velocity</h4>
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold text-[#275E91]">
            {formatCurrency(metrics.currentVelocity)}<span className="text-sm font-normal text-gray-500">/month</span>
          </span>
          <div className="text-right">
            {renderVelocityTrend()}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Target: {formatCurrency(metrics.velocityTarget)}/month
        </div>
      </div>
      
      {/* Probability of Success */}
      <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-700 flex items-center">
            <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
            Fundraising Outlook
          </h4>
          <div className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
            metrics.probabilityOfSuccess >= 80 
              ? "bg-green-100 text-green-800" 
              : metrics.probabilityOfSuccess >= 60 
                ? "bg-blue-100 text-blue-800"
                : "bg-amber-100 text-amber-800"
          }`}>
            {metrics.probabilityOfSuccess}% Probability
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Based on current velocity, commitments, and market conditions
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsCard;