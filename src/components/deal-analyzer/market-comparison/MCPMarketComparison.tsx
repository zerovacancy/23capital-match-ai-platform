import React from 'react';
import { useMCPMarketComparison } from './useMCPMarketComparison';
import { MarketComparisonChart } from './MarketComparisonChart';
import { Deal } from '@/data/deals';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// No need to import missing Spinner component

// Temporary fix for missing Spinner component
const TempSpinner = ({ className }: { className?: string }) => (
  <div className={`animate-spin ${className}`}>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);
import { Badge } from '@/components/ui/badge';

interface MCPMarketComparisonProps {
  deal: Deal;
  className?: string;
}

export const MCPMarketComparison: React.FC<MCPMarketComparisonProps> = ({ 
  deal, 
  className 
}) => {
  const {
    isLoading,
    marketData,
    metrics,
    analysisText,
    dealStrengths,
    dealChallenges
  } = useMCPMarketComparison(deal);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div>
            <CardTitle>MCP Market Analysis</CardTitle>
            <CardDescription>
              AI-powered market comparison powered by Model Context Protocol
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-50">MCP-Enabled</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <TempSpinner className="w-10 h-10 text-blue-700" />
            <span className="ml-3">Analyzing market data...</span>
          </div>
        ) : marketData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Market Analysis Text */}
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700">Market Analysis</h3>
                  <p className="text-sm text-gray-800">{analysisText}</p>
                </div>
                
                {/* Strengths and Challenges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="border border-green-100 bg-green-50 p-4 rounded-md">
                    <h4 className="text-sm font-semibold mb-2 text-green-800">Market Strengths</h4>
                    {dealStrengths.length > 0 ? (
                      <ul className="text-xs space-y-2">
                        {dealStrengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1 mr-2 flex-shrink-0"></span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500">No significant strengths identified.</p>
                    )}
                  </div>
                  
                  {/* Challenges */}
                  <div className="border border-amber-100 bg-amber-50 p-4 rounded-md">
                    <h4 className="text-sm font-semibold mb-2 text-amber-800">Market Challenges</h4>
                    {dealChallenges.length > 0 ? (
                      <ul className="text-xs space-y-2">
                        {dealChallenges.map((challenge, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 mr-2 flex-shrink-0"></span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500">No significant challenges identified.</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Market Comparison Chart */}
              <MarketComparisonChart 
                deal={deal} 
                marketMetrics={metrics} 
              />
            </div>
            
            {/* Market Metrics Table */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Market Metrics Detail</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-medium">Metric</th>
                      <th className="text-center py-2 px-3 font-medium">{marketData.marketName}</th>
                      <th className="text-center py-2 px-3 font-medium">Low</th>
                      <th className="text-center py-2 px-3 font-medium">Average</th>
                      <th className="text-center py-2 px-3 font-medium">High</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(metrics).map((key) => {
                      const metric = metrics[key];
                      const value = marketData.metrics[key];
                      const { low, average, high } = metric.benchmarks;
                      
                      // Determine color based on value compared to benchmarks
                      let valueColor = 'text-gray-800';
                      if (value >= high) valueColor = 'text-green-600 font-medium';
                      else if (value <= low) valueColor = 'text-amber-600 font-medium';
                      
                      return (
                        <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-2 px-3">{metric.name}</td>
                          <td className={`text-center py-2 px-3 ${valueColor}`}>{value}{metric.unit}</td>
                          <td className="text-center py-2 px-3 text-gray-600">{low}{metric.unit}</td>
                          <td className="text-center py-2 px-3 text-gray-600">{average}{metric.unit}</td>
                          <td className="text-center py-2 px-3 text-gray-600">{high}{metric.unit}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-gray-50 rounded-md">
            <p className="text-gray-500">No market data available for {deal.location}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};