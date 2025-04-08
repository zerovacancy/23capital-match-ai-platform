import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';

interface SourceBreakdownData {
  status: string;
  total: number;
  count: number;
  sources: string[];
}

interface InvestorSegmentationChartProps {
  data: SourceBreakdownData[];
  isLoading?: boolean;
}

const COLORS = ['#275E91', '#7A8D79', '#3F7CAC', '#95A792', '#5D89A8', '#607973'];

const InvestorSegmentationChart: React.FC<InvestorSegmentationChartProps> = ({ 
  data, 
  isLoading = false 
}) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  
  if (isLoading) {
    return <Skeleton className="h-[250px] w-full" />;
  }
  
  // Format data for pie chart
  const chartData = data.map((item) => ({
    name: item.status,
    value: item.total,
    count: item.count,
    sources: item.sources,
  }));
  
  // Calculate total amount
  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);
  
  // Handle pie hover
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(undefined);
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm text-sm">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-[#275E91] font-medium mt-1">{formatCurrency(data.value)}</p>
          <p className="text-gray-500 mt-1">{((data.value / totalAmount) * 100).toFixed(1)}% of total</p>
          <p className="text-gray-500 mt-1">{data.count} investor{data.count !== 1 ? 's' : ''}</p>
        </div>
      );
    }
    return null;
  };
  
  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-col space-y-1.5 mt-2">
        {payload.map((entry: any, index: number) => (
          <li 
            key={`legend-${index}`} 
            className="flex items-center justify-between text-xs"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            <div className="flex items-center">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-gray-700">{entry.value}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                {chartData[index].count} LP{chartData[index].count !== 1 ? 's' : ''}
              </span>
              <span className="font-medium text-gray-900">
                {((chartData[index].value / totalAmount) * 100).toFixed(1)}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="#fff"
                strokeWidth={1}
                style={{
                  filter: activeIndex === index ? 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))' : 'none',
                  opacity: activeIndex === undefined || activeIndex === index ? 1 : 0.7,
                  transition: 'opacity 0.2s, filter 0.2s',
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={<CustomLegend />}
            verticalAlign="bottom"
            align="center"
            layout="vertical"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestorSegmentationChart;