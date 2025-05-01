import React, { useState, useEffect } from 'react';
import { useAlerts } from '@/context/AlertsContext';
import { AlertDetail } from './AlertDetail';
import { AlertPreferences } from './AlertPreferences';
import { PropertyAlerts } from './PropertyAlerts';
import { MarketAlerts } from './MarketAlerts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Alert } from '@/context/AlertsContext';

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
    search: '',
    // Deal statistics filters
    propertyType: 'all',
    buildingSize: 'all',
    buildingAge: 'all',
    priceRange: 'all',
    neighborhood: 'all',
    showDealFilters: true // Controls visibility of deal filters
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
    await fetchAlerts(getApiFilters());
    setTimeout(() => setRefreshing(false), 500); // Minimum animation time
  };

  // Get API-friendly filters
  const getApiFilters = () => {
    const apiFilters: any = {};
    
    if (filter.isRead !== 'all') {
      apiFilters.read = filter.isRead === 'read';
    }
    
    if (filter.priority !== 'all') {
      apiFilters.priority = [filter.priority];
    }
    
    if (filter.type !== 'all') {
      apiFilters.type = [filter.type];
    }
    
    return apiFilters;
  };
  
  // Filter alerts client-side (for search and deal statistics filters)
  const filteredAlerts = alerts.filter(alert => {
    // Search filter
    if (filter.search && !alert.description.toLowerCase().includes(filter.search.toLowerCase()) &&
        !(alert.property_address || '').toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    
    // Property type filter
    if (filter.propertyType !== 'all' && 
        alert.details?.property_type?.toLowerCase() !== filter.propertyType &&
        !alert.details?.property_type?.toLowerCase().includes(filter.propertyType)) {
      return false;
    }
    
    // Building size filter
    if (filter.buildingSize !== 'all' && alert.details?.square_footage) {
      const sqft = alert.details.square_footage;
      if (filter.buildingSize === 'small' && sqft >= 10000) return false;
      if (filter.buildingSize === 'medium' && (sqft < 10000 || sqft > 50000)) return false;
      if (filter.buildingSize === 'large' && (sqft < 50000 || sqft > 100000)) return false;
      if (filter.buildingSize === 'xlarge' && sqft < 100000) return false;
    }
    
    // Building age filter
    if (filter.buildingAge !== 'all' && alert.details?.year_built) {
      const age = new Date().getFullYear() - alert.details.year_built;
      if (filter.buildingAge === 'new' && age > 5) return false;
      if (filter.buildingAge === 'recent' && (age < 5 || age > 20)) return false;
      if (filter.buildingAge === 'established' && (age < 20 || age > 50)) return false;
      if (filter.buildingAge === 'historic' && age < 50) return false;
    }
    
    // Price range filter
    if (filter.priceRange !== 'all') {
      const price = alert.details?.new_price || alert.details?.previous_price;
      if (!price) return true; // Skip if no price information
      
      if (filter.priceRange === 'under1m' && price >= 1000000) return false;
      if (filter.priceRange === '1to5m' && (price < 1000000 || price > 5000000)) return false;
      if (filter.priceRange === '5to10m' && (price < 5000000 || price > 10000000)) return false;
      if (filter.priceRange === 'over10m' && price < 10000000) return false;
    }
    
    // Neighborhood filter
    if (filter.neighborhood !== 'all' && 
        !alert.details?.neighborhood?.toLowerCase().includes(filter.neighborhood.replace(/([A-Z])/g, ' $1').trim().toLowerCase())) {
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
    fetchAlerts(getApiFilters());
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
    // Direct to the appropriate detail view based on alert type
    if (['high_opportunity_property', 'price_change', 'new_listing'].includes(selectedAlert.type)) {
      return (
        <PropertyAlerts 
          selectedAlert={selectedAlert} 
          setSelectedAlert={setSelectedAlert} 
        />
      );
    } else if (['market_trend', 'seasonal_opportunity'].includes(selectedAlert.type)) {
      return (
        <MarketAlerts 
          selectedAlert={selectedAlert} 
          setSelectedAlert={setSelectedAlert} 
        />
      );
    } else {
      // Fallback to the generic alert detail for other types
      return <AlertDetail alert={selectedAlert} onBack={handleCloseDetail} />;
    }
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
            <TabsTrigger 
              value="all" 
              onClick={() => setFilter((prev) => ({...prev, type: 'all', showDealFilters: true}))}
            >
              <List className="h-4 w-4 mr-1" />
              All
            </TabsTrigger>
            <TabsTrigger 
              value="properties" 
              onClick={() => setFilter((prev) => ({...prev, type: 'all', showDealFilters: true}))}
            >
              <Building className="h-4 w-4 mr-1" />
              Properties
            </TabsTrigger>
            <TabsTrigger 
              value="market" 
              onClick={() => setFilter((prev) => ({...prev, type: 'market', showDealFilters: false}))}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Market
            </TabsTrigger>
          </TabsList>
          
          {/* Deal Statistics Filters - Show only when not on market tab */}
          {filter.showDealFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-4 bg-muted/20 p-3 rounded-md">
            <div className="flex items-center mr-2">
              <Building className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm font-medium">Deal Filters:</span>
            </div>
            
            <Select 
              value={filter.propertyType}
              onValueChange={(value) => setFilter(prev => ({...prev, propertyType: value}))}
            >
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="multifamily">Multifamily</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="mixed use">Mixed Use</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="office">Office</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filter.buildingSize}
              onValueChange={(value) => setFilter(prev => ({...prev, buildingSize: value}))}
            >
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Building Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="small">Under 10k sqft</SelectItem>
                <SelectItem value="medium">10k-50k sqft</SelectItem>
                <SelectItem value="large">50k-100k sqft</SelectItem>
                <SelectItem value="xlarge">Over 100k sqft</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filter.buildingAge}
              onValueChange={(value) => setFilter(prev => ({...prev, buildingAge: value}))}
            >
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Building Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="new">New (0-5 yrs)</SelectItem>
                <SelectItem value="recent">Recent (5-20 yrs)</SelectItem>
                <SelectItem value="established">Established (20-50 yrs)</SelectItem>
                <SelectItem value="historic">Historic (50+ yrs)</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filter.priceRange}
              onValueChange={(value) => setFilter(prev => ({...prev, priceRange: value}))}
            >
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under1m">Under $1M</SelectItem>
                <SelectItem value="1to5m">$1M - $5M</SelectItem>
                <SelectItem value="5to10m">$5M - $10M</SelectItem>
                <SelectItem value="over10m">Over $10M</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filter.neighborhood}
              onValueChange={(value) => setFilter(prev => ({...prev, neighborhood: value}))}
            >
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Neighborhood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="lincolnpark">Lincoln Park</SelectItem>
                <SelectItem value="westloop">West Loop</SelectItem>
                <SelectItem value="wickerpark">Wicker Park</SelectItem>
                <SelectItem value="rivernorth">River North</SelectItem>
                <SelectItem value="loganquare">Logan Square</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => setFilter(prev => ({
                ...prev,
                propertyType: 'all',
                buildingSize: 'all',
                buildingAge: 'all',
                priceRange: 'all',
                neighborhood: 'all'
              }))}
            >
              Reset Filters
            </Button>
          </div>
          )}
          
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
                            className={`text-xs inline-flex items-center ${
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
            <PropertyAlerts 
              selectedAlert={selectedAlert} 
              setSelectedAlert={setSelectedAlert} 
            />
          </TabsContent>
          
          <TabsContent value="market" className="mt-0">
            <MarketAlerts 
              selectedAlert={selectedAlert} 
              setSelectedAlert={setSelectedAlert} 
            />
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