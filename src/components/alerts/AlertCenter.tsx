import React, { useState, useEffect } from 'react';
import { useAlerts } from '@/context/AlertsContext';
import { AlertDetail } from './AlertDetail';
import { AlertPreferences } from './AlertPreferences';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  BellRing,
  AlertTriangle,
  AlertCircle,
  Settings,
  Search,
  TrendingUp,
  Building,
  DollarSign,
  Calendar,
  RefreshCw,
  CheckCircle2,
  X,
  Eye,
  List,
  Check,
  Filter
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Alert, AlertFilters } from '@/context/AlertsContext';

export function AlertCenter() {
  const { 
    alerts,
    unreadCount, 
    loading, 
    error, 
    fetchAlerts,
    markAllAsRead,
    preferences
  } = useAlerts();
  
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [filter, setFilter] = useState({
    isRead: 'all', // 'all', 'read', 'unread'
    priority: 'all', // 'all', 'high', 'medium', 'low'
    type: 'all',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Handle alert selection
  const handleSelectAlert = (alert: Alert) => {
    setSelectedAlert(alert);
  };
  
  // Handle closing alert detail
  const handleCloseDetail = () => {
    setSelectedAlert(null);
  };
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAlerts(currentPage, 20, getApiFilters());
    setTimeout(() => setRefreshing(false), 500); // Minimum animation time
  };

  // Get API-friendly filters
  const getApiFilters = () => {
    const apiFilters: any = {};
    
    if (filter.isRead !== 'all') {
      apiFilters.isRead = filter.isRead === 'read';
    }
    
    if (filter.priority !== 'all') {
      apiFilters.priority = filter.priority;
    }
    
    if (filter.type !== 'all') {
      apiFilters.type = filter.type;
    }
    
    return apiFilters;
  };
  
  // Filter alerts client-side (for search functionality)
  const filteredAlerts = alerts.filter(alert => {
    // Search filter
    if (filter.search && !alert.description.toLowerCase().includes(filter.search.toLowerCase()) &&
        !(alert.property?.address || '').toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Get alert type options
  const alertTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'high_opportunity_property', label: 'High Opportunity' },
    { value: 'price_change', label: 'Price Change' },
    { value: 'status_change', label: 'Status Change' },
    { value: 'new_listing', label: 'New Listing' },
    { value: 'neighborhood_opportunity', label: 'Neighborhood' },
    { value: 'market_trend', label: 'Market Trend' },
    { value: 'seasonal_opportunity', label: 'Seasonal Opportunity' }
  ];
  
  // Apply filters when changed
  useEffect(() => {
    fetchAlerts(currentPage, 20, getApiFilters());
  }, [filter.isRead, filter.priority, filter.type, currentPage, fetchAlerts]);
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  if (showPreferences) {
    return <AlertPreferences onBack={() => setShowPreferences(false)} />;
  }
  
  if (selectedAlert) {
    return <AlertDetail alert={selectedAlert} onBack={handleCloseDetail} />;
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <BellRing className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Alerts</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowPreferences(true)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Preferences
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-4 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search alerts..." 
              value={filter.search}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
              <DropdownMenuRadioGroup 
                value={filter.isRead} 
                onValueChange={(value) => setFilter(prev => ({...prev, isRead: value}))}
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="unread">Unread</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="read">Read</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>Filter Priority</DropdownMenuLabel>
              <DropdownMenuRadioGroup 
                value={filter.priority} 
                onValueChange={(value) => setFilter(prev => ({...prev, priority: value}))}
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>Alert Type</DropdownMenuLabel>
              <DropdownMenuRadioGroup 
                value={filter.type} 
                onValueChange={(value) => setFilter(prev => ({...prev, type: value}))}
              >
                {alertTypeOptions.map(option => (
                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllAsRead()}
            >
              <Check className="h-4 w-4 mr-1" />
              Mark All Read
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-4">
            <TabsTrigger value="all" onClick={() => setFilter(prev => ({...prev, type: 'all'}))}>
              <List className="h-4 w-4 mr-1" />
              All
            </TabsTrigger>
            <TabsTrigger value="properties" onClick={() => setFilter(prev => ({...prev, type: 'high_opportunity_property'}))}>
              <AlertCircle className="h-4 w-4 mr-1" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="market" onClick={() => setFilter(prev => ({...prev, type: 'market_trend'}))}>
              <Calendar className="h-4 w-4 mr-1" />
              Market
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : filteredAlerts.length > 0 ? (
              <div className="space-y-2">
                {filteredAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-4 border rounded-lg mb-2 hover:bg-gray-50 cursor-pointer transition-colors ${alert.read ? 'border-gray-200' : 'border-blue-200 bg-blue-50 hover:bg-blue-50'}`}
                    onClick={() => handleSelectAlert(alert)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${alert.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                        {alert.type === 'high_opportunity_property' && <Building className="h-4 w-4" />}
                        {alert.type === 'price_change' && <DollarSign className="h-4 w-4" />}
                        {alert.type === 'market_trend' && <TrendingUp className="h-4 w-4" />}
                        {alert.type === 'seasonal_opportunity' && <Calendar className="h-4 w-4" />}
                        {['high_opportunity_property', 'price_change', 'market_trend', 'seasonal_opportunity'].includes(alert.type) || <AlertTriangle className="h-4 w-4" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className={`text-sm font-medium truncate ${alert.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {alert.title}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              alert.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' : 
                              alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                              'bg-green-100 text-green-800 border-green-200'
                            }`}
                          >
                            {alert.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                          {alert.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
                          </span>
                          
                          {alert.property_address && (
                            <span className="text-xs text-gray-500 truncate max-w-[180px]">
                              {alert.property_address}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No alerts found</p>
                <p className="text-sm">
                  {filter.search 
                    ? "Try a different search term or filter"
                    : "You'll be notified when new alerts become available"}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="properties" className="mt-0">
            {/* Property alerts content */}
            {/* This is handled by the filter change on tab click */}
          </TabsContent>
          
          <TabsContent value="market" className="mt-0">
            {/* Market alerts content */}
            {/* This is handled by the filter change on tab click */}
          </TabsContent>
        </Tabs>
        
        {/* Pagination */}
        {filteredAlerts.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            <span className="text-sm">Page {currentPage}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredAlerts.length < 20}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}