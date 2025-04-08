import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';

interface VelocityChartData {
  name: string;
  target: number;
  actual: number;
  projected: number | null;
}

interface CapitalVelocityChartProps {
  data: VelocityChartData[];
  isLoading?: boolean;
}

const CapitalVelocityChart: React.FC<CapitalVelocityChartProps> = ({ 
  data, 
  isLoading = false 
}) => {
  if (isLoading) {
    return <Skeleton className="h-[250px] w-full" />;
  }
  
  // Calculate average velocity
  const actualMonths = data.filter(month => month.actual > 0);
  const avgVelocity = actualMonths.length > 0
    ? actualMonths.reduce((sum, month) => sum + month.actual, 0) / actualMonths.length
    : 0;
  
  // Custom tooltip formatter
  const tooltipFormatter = (value: number) => {
    return formatCurrency(value);
  };
  
  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={tooltipFormatter}
            labelStyle={{ fontWeight: 'bold', color: '#274e91' }}
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend 
            iconType="circle" 
            iconSize={8}
            wrapperStyle={{ paddingTop: 10 }}
          />
          <ReferenceLine 
            y={avgVelocity} 
            stroke="#275E91" 
            strokeDasharray="3 3"
            label={{ 
              position: 'right', 
              value: 'Avg', 
              fill: '#275E91', 
              fontSize: 10,
            }}
          />
          <Bar 
            dataKey="target" 
            name="Target" 
            fill="#CBD5E1" 
            radius={[4, 4, 0, 0]} 
            barSize={20} 
          />
          <Bar 
            dataKey="actual" 
            name="Actual" 
            fill="#275E91" 
            radius={[4, 4, 0, 0]} 
            barSize={20}
          />
          <Bar 
            dataKey="projected" 
            name="Projected" 
            fill="#7A8D79" 
            radius={[4, 4, 0, 0]} 
            barSize={20}
            fillOpacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-[#275E91] mr-1.5"></span>
          Avg. Monthly Velocity: <span className="font-medium text-gray-800 ml-1">{formatCurrency(avgVelocity)}</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-[#7A8D79] mr-1.5"></span>
          Projected: <span className="font-medium text-gray-800 ml-1">{formatCurrency(data.reduce((sum, month) => sum + (month.projected || 0), 0))}</span>
        </div>
      </div>
    </div>
  );
};

export default CapitalVelocityChart;