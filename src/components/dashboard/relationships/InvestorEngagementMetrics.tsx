import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { CommunicationLog, communicationLogs } from '@/data/communicationLogs';
import { lps } from '@/data/lps';
import { cn } from '@/lib/utils';

// Custom tooltip for the charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg border rounded-md">
        <p className="font-medium text-sm">{`${label}`}</p>
        <p className="text-sm text-gray-700">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

interface InvestorEngagementMetricsProps {
  lpId?: string;
  title?: string;
}

const InvestorEngagementMetrics: React.FC<InvestorEngagementMetricsProps> = ({ 
  lpId,
  title = "Investor Engagement Metrics" 
}) => {
  // Filter communications by lpId if provided
  const filteredCommunications = useMemo(() => {
    if (lpId) {
      return communicationLogs.filter(comm => comm.lpId === lpId);
    }
    return communicationLogs;
  }, [lpId]);
  
  // Communication by type chart data
  const communicationByType = useMemo(() => {
    const typeCount: Record<string, number> = {};
    
    filteredCommunications.forEach(comm => {
      if (!typeCount[comm.type]) {
        typeCount[comm.type] = 0;
      }
      typeCount[comm.type]++;
    });
    
    return Object.entries(typeCount).map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count
    })).sort((a, b) => b.count - a.count);
  }, [filteredCommunications]);
  
  // Communication by sentiment chart data
  const communicationBySentiment = useMemo(() => {
    const sentimentCount: Record<string, number> = {};
    
    filteredCommunications.forEach(comm => {
      if (!sentimentCount[comm.sentiment]) {
        sentimentCount[comm.sentiment] = 0;
      }
      sentimentCount[comm.sentiment]++;
    });
    
    return Object.entries(sentimentCount).map(([sentiment, count]) => ({
      sentiment: sentiment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      value: count,
      color: getSentimentColor(sentiment as any)
    })).sort((a, b) => b.value - a.value);
  }, [filteredCommunications]);
  
  // Communication by direction chart data
  const communicationByDirection = useMemo(() => {
    const incoming = filteredCommunications.filter(comm => comm.direction === 'incoming').length;
    const outgoing = filteredCommunications.filter(comm => comm.direction === 'outgoing').length;
    
    return [
      { name: 'Incoming', value: incoming, color: '#3b82f6' },
      { name: 'Outgoing', value: outgoing, color: '#64748b' }
    ];
  }, [filteredCommunications]);
  
  // Communication over time (by month) chart data
  const communicationOverTime = useMemo(() => {
    const timeData: Record<string, number> = {};
    const now = new Date();
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      timeData[monthName] = 0;
    }
    
    // Count communications by month
    filteredCommunications.forEach(comm => {
      const commDate = new Date(comm.date);
      // Only consider last 6 months
      if (commDate >= new Date(now.getFullYear(), now.getMonth() - 5, 1)) {
        const monthName = commDate.toLocaleString('default', { month: 'short', year: '2-digit' });
        if (timeData[monthName] !== undefined) {
          timeData[monthName]++;
        }
      }
    });
    
    return Object.entries(timeData).map(([month, count]) => ({
      month,
      count
    }));
  }, [filteredCommunications]);
  
  // LP engagement comparison (only for dashboard view, not individual LP view)
  const lpEngagement = useMemo(() => {
    if (lpId) return [];
    
    return lps.slice(0, 5).map(lp => {
      const lpComms = communicationLogs.filter(comm => comm.lpId === lp.id);
      return {
        name: lp.name,
        count: lpComms.length,
        incoming: lpComms.filter(comm => comm.direction === 'incoming').length,
        outgoing: lpComms.filter(comm => comm.direction === 'outgoing').length
      };
    }).sort((a, b) => b.count - a.count);
  }, [lpId]);
  
  // Helper function to get color by sentiment
  function getSentimentColor(sentiment: string): string {
    switch (sentiment) {
      case 'very-positive': return '#22c55e';
      case 'positive': return '#86efac';
      case 'neutral': return '#94a3b8';
      case 'negative': return '#f87171';
      default: return '#94a3b8';
    }
  }
  
  // Engagement metrics summary
  const metrics = useMemo(() => {
    const total = filteredCommunications.length;
    const incoming = filteredCommunications.filter(comm => comm.direction === 'incoming').length;
    const followUps = filteredCommunications.filter(comm => comm.followUpAction).length;
    const positive = filteredCommunications.filter(comm => 
      comm.sentiment === 'positive' || comm.sentiment === 'very-positive'
    ).length;
    
    const incomingRatio = total > 0 ? incoming / total : 0;
    const followUpRatio = total > 0 ? followUps / total : 0;
    const positiveRatio = total > 0 ? positive / total : 0;
    
    return {
      total,
      incomingRatio,
      followUpRatio,
      positiveRatio
    };
  }, [filteredCommunications]);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Metrics Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white border rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Total Communications</p>
            <h3 className="text-2xl font-bold text-gray-900">{metrics.total}</h3>
          </div>
          
          <div className="p-4 bg-white border rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Incoming Ratio</p>
            <h3 className="text-2xl font-bold text-gray-900">{(metrics.incomingRatio * 100).toFixed(0)}%</h3>
          </div>
          
          <div className="p-4 bg-white border rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Follow-up Rate</p>
            <h3 className="text-2xl font-bold text-gray-900">{(metrics.followUpRatio * 100).toFixed(0)}%</h3>
          </div>
          
          <div className="p-4 bg-white border rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Positive Sentiment</p>
            <h3 className="text-2xl font-bold text-gray-900">{(metrics.positiveRatio * 100).toFixed(0)}%</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Communication by Type Chart */}
          <div className="border rounded-lg p-4 bg-white">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Communication by Type</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={communicationByType}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#3b82f6" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Communication by Sentiment Chart */}
          <div className="border rounded-lg p-4 bg-white">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Communication by Sentiment</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={communicationBySentiment}
                    dataKey="value"
                    nameKey="sentiment"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {communicationBySentiment.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Communication Over Time Chart */}
          <div className="border rounded-lg p-4 bg-white">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Communication Trend (6 Months)</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={communicationOverTime}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#3b82f6" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Communication Direction Chart */}
          <div className="border rounded-lg p-4 bg-white">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Communication Direction</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={communicationByDirection}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {communicationByDirection.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* LP Engagement Comparison - Only show in dashboard view, not individual LP view */}
        {!lpId && lpEngagement.length > 0 && (
          <div className="border rounded-lg p-4 bg-white mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Top 5 LPs by Engagement</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lpEngagement}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="incoming" stackId="a" fill="#3b82f6" name="Incoming" />
                  <Bar dataKey="outgoing" stackId="a" fill="#64748b" name="Outgoing" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestorEngagementMetrics;