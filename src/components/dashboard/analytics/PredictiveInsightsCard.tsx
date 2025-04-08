import React from 'react';
import { Lightbulb, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PredictiveInsightsCardProps {
  isLoading?: boolean;
}

const PredictiveInsightsCard: React.FC<PredictiveInsightsCardProps> = ({ 
  isLoading = false 
}) => {
  if (isLoading) {
    return <Skeleton className="h-[200px] w-full" />;
  }
  
  // In a real app, these would be generated from actual data analysis
  const insights = [
    {
      id: 1,
      type: 'opportunity',
      icon: <Lightbulb className="h-4 w-4 text-amber-500" />,
      content: 'Increase outreach to family offices - this investor segment has 40% higher conversion rate than institutional investors',
    },
    {
      id: 2,
      type: 'trend',
      icon: <TrendingUp className="h-4 w-4 text-green-600" />,
      content: 'March commitments increased by 45% compared to February, indicating growing momentum',
    },
    {
      id: 3,
      type: 'prediction',
      icon: <Clock className="h-4 w-4 text-blue-600" />,
      content: 'Based on current velocity, fundraising will complete 32 days ahead of schedule',
    },
    {
      id: 4,
      type: 'risk',
      icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      content: 'Two large LPs ($5M+ potential) have delayed commitment decisions for >30 days',
    }
  ];
  
  return (
    <div className="space-y-3">
      {insights.map((insight) => (
        <div 
          key={insight.id} 
          className={`rounded-lg border p-3 ${
            insight.type === 'opportunity' ? 'bg-amber-50 border-amber-100' : 
            insight.type === 'trend' ? 'bg-green-50 border-green-100' : 
            insight.type === 'prediction' ? 'bg-blue-50 border-blue-100' : 
            'bg-red-50 border-red-100'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5">
              {insight.icon}
            </div>
            <div>
              <h5 className={`text-sm font-medium ${
                insight.type === 'opportunity' ? 'text-amber-800' : 
                insight.type === 'trend' ? 'text-green-800' : 
                insight.type === 'prediction' ? 'text-blue-800' : 
                'text-red-800'
              }`}>
                {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
              </h5>
              <p className="text-sm text-gray-700 mt-0.5">{insight.content}</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-xs text-gray-500 mt-2">
        AI insights updated daily based on current fundraising data, market trends, and historical patterns.
      </div>
    </div>
  );
};

export default PredictiveInsightsCard;