import React, { useState, useEffect } from 'react';
import { useAlerts } from '@/context/AlertsContext';
import { Alert } from '@/context/AlertsContext';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  Calendar,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  ChevronDown,
  Download,
  Mail,
  Share2,
  Clock,
  Map,
  X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Market Trend Card Component
const MarketTrendCard = ({ alert, onClick }: { alert: Alert, onClick: (alert: Alert) => void }) => {
  const getTrendIcon = () => {
    if (alert.type === 'market_trend') {
      return alert.details?.market_trend_direction === 'up' 
        ? <ArrowUpRight className="h-5 w-5 text-green-500" /> 
        : <ArrowDownRight className="h-5 w-5 text-red-500" />;
    }
    
    if (alert.type === 'seasonal_opportunity') {
      return <Calendar className="h-5 w-5 text-blue-500" />;
    }
    
    return <TrendingUp className="h-5 w-5 text-gray-500" />;
  };
  
  const getTypeName = (type: Alert['type']) => {
    switch (type) {
      case 'market_trend':
        return 'Market Trend';
      case 'seasonal_opportunity':
        return 'Seasonal Opportunity';
      default:
        return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };
  
  const getDescription = () => {
    if (alert.type === 'market_trend' && alert.details?.market_trend_percentage) {
      const direction = alert.details.market_trend_direction === 'up' ? '↑' : '↓';
      return `${alert.details.property_type || 'Property'} prices ${direction}${alert.details.market_trend_percentage}% in ${alert.details.market_trend_period || 'recent period'}`;
    }
    
    if (alert.type === 'seasonal_opportunity' && alert.details?.seasonal_factor) {
      return `${alert.details.seasonal_factor} in ${alert.details.neighborhood || 'target area'}`;
    }
    
    return alert.description;
  };
  
  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow ${!alert.read ? 'border-blue-300' : ''}`} 
      onClick={() => onClick(alert)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200">
            {getTypeName(alert.type)}
          </Badge>
          
          {!alert.read && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gray-100 rounded-full">
            {getTrendIcon()}
          </div>
          <h4 className="font-medium">{alert.title}</h4>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{getDescription()}</p>
        
        <div className="flex justify-between items-center mt-2">
          <div className="h-8 w-20 bg-gray-100 rounded flex items-center justify-center">
            <BarChart2 className="h-5 w-5 text-gray-400" />
          </div>
          
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// Market Alert Details Panel
export const MarketAlertDetail = ({ alert, onBack }: { alert: Alert, onBack: () => void }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            {alert.title}
          </h3>
          <p className="text-sm text-gray-500">
            {alert.type === 'market_trend' 
              ? alert.details?.market_trend_period || 'Recent period'
              : formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Dismiss
          </Button>
          
          <Button variant="outline" size="sm">
            Mark as Note
          </Button>
        </div>
      </div>
      
      {/* Insight Summary */}
      <div className="border rounded-lg p-4">
        <h4 className="font-medium mb-3">Insight Summary</h4>
        
        <div className="mb-4">
          <p className="text-base">
            {alert.type === 'market_trend' && alert.details?.market_trend_percentage ? (
              <>
                {alert.details.property_type || 'Residential'} prices 
                {alert.details.market_trend_direction === 'up' ? ' ↑' : ' ↓'}
                {alert.details.market_trend_percentage}% {alert.details.market_trend_period || 'over recent period'} 
                {alert.details.neighborhood ? ` in ${alert.details.neighborhood}` : ' in Cook County'}
              </>
            ) : alert.description}
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Data sources: MLS, County Assessor, Public Records</span>
        </div>
      </div>
      
      {/* Visualizations */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Market Visualization</h4>
          
          <div className="flex items-center">
            <Button variant="ghost" size="sm">
              By Asset Class <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
            
            <Button variant="ghost" size="sm">
              By Neighborhood <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
        
        <div className="aspect-[16/9] bg-gray-50 rounded-lg flex flex-col items-center justify-center mb-4">
          {alert.type === 'market_trend' ? (
            <BarChart2 className="h-12 w-12 text-gray-300" />
          ) : (
            <Map className="h-12 w-12 text-gray-300" />
          )}
          <p className="text-sm text-gray-400 mt-2">Interactive Chart</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            {alert.type === 'market_trend' ? (
              <>
                This trend shows a {alert.details?.market_trend_percentage || ''}% 
                {alert.details?.market_trend_direction === 'up' ? ' increase' : ' decrease'} in 
                {alert.details?.property_type ? ` ${alert.details.property_type}` : ' property'} values 
                during {alert.details?.market_trend_period || 'the recent period'}.
              </>
            ) : (
              <>
                Seasonal patterns indicate {alert.details?.seasonal_factor || 'changes'} 
                in {alert.details?.neighborhood || 'this area'}, which may present 
                investment opportunities.
              </>
            )}
          </p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Set up Email Update
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Insight
        </Button>
      </div>
    </div>
  );
};

// Main Market Alerts Component
export function MarketAlerts({ selectedAlert, setSelectedAlert }: { 
  selectedAlert: Alert | null,
  setSelectedAlert: (alert: Alert | null) => void
}) {
  const { alerts, loading, fetchAlerts } = useAlerts();
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState({
    type: 'all',
    timeframe: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter only market-related alerts
  useEffect(() => {
    const marketTypes = ['market_trend', 'seasonal_opportunity'];
    
    let filtered = alerts.filter(alert => 
      marketTypes.includes(alert.type) && 
      !alert.dismissed
    );
    
    // Apply additional filters
    if (filter.type !== 'all') {
      filtered = filtered.filter(alert => alert.type === filter.type);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(alert => 
        alert.title.toLowerCase().includes(term) ||
        alert.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredAlerts(filtered);
  }, [alerts, filter, searchTerm]);
  
  // Load alerts on mount
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);
  
  const handleSelectAlert = (alert: Alert) => {
    setSelectedAlert(alert);
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
  };
  
  if (selectedAlert) {
    return <MarketAlertDetail alert={selectedAlert} onBack={() => setSelectedAlert(null)} />;
  }
  
  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search market trends..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div>
          <Select 
            value={filter.type} 
            onValueChange={(value) => setFilter({...filter, type: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Alert Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="market_trend">Market Trends</SelectItem>
              <SelectItem value="seasonal_opportunity">Seasonal Opportunities</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={filter.timeframe} 
            onValueChange={(value) => setFilter({...filter, timeframe: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="quarter">Past Quarter</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Visualizations Section */}
      <div className="border rounded-lg p-4 mb-4">
        <h4 className="font-medium mb-3">Market Overview</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-3 bg-gray-50 h-48 flex flex-col items-center justify-center">
            <BarChart2 className="h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">Average Sale Price by Submarket</p>
          </div>
          
          <div className="border rounded-lg p-3 bg-gray-50 h-48 flex flex-col items-center justify-center">
            <Map className="h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">Activity Heatmap by ZIP Code</p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <h4 className="font-medium">Market Alerts</h4>
      
      {/* Results */}
      <ScrollArea className="h-[calc(100vh-450px)] min-h-[200px] pr-4">
        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-3"></div>
              <p className="text-muted-foreground">Loading market alerts...</p>
            </div>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="text-center">
              <TrendingUp className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground mb-1">No market alerts found</p>
              <p className="text-sm text-gray-400">
                {searchTerm || filter.type !== 'all'
                  ? 'Try adjusting your filters' 
                  : 'Market alerts will appear here when available'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlerts.map(alert => (
              <MarketTrendCard
                key={alert.id}
                alert={alert}
                onClick={handleSelectAlert}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}