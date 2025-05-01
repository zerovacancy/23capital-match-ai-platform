import React, { useState, useEffect } from 'react';
import { useAlerts } from '@/context/AlertsContext';
import { Alert } from '@/context/AlertsContext';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  DollarSign,
  MapPin,
  Calendar,
  Search,
  Filter,
  PlusCircle,
  CalendarRange,
  Map,
  BarChart3,
  Clock,
  X,
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowUpDown
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Property Alert Card Component
const PropertyAlertCard = ({ alert, onClick }: { alert: Alert, onClick: (alert: Alert) => void }) => {
  const getIconForType = (type: Alert['type']) => {
    switch (type) {
      case 'high_opportunity_property':
        return <Building className="h-4 w-4" />;
      case 'price_change':
        return <DollarSign className="h-4 w-4" />;
      case 'new_listing':
        return <PlusCircle className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  const getTypeName = (type: Alert['type']) => {
    switch (type) {
      case 'high_opportunity_property':
        return 'High-Opportunity';
      case 'price_change':
        return 'Price Change';
      case 'new_listing':
        return 'New Listing';
      default:
        return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow ${!alert.read ? 'border-blue-300' : ''}`} 
      onClick={() => onClick(alert)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-gray-100 rounded-lg h-16 w-16 flex-shrink-0 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-gray-500" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-sm">{alert.property_address}</h4>
              {!alert.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1"></div>}
            </div>
            
            <p className="text-xs text-gray-500 mb-1">{alert.details?.neighborhood || 'Unknown Neighborhood'}</p>
            
            <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
                {getIconForType(alert.type)}
                <span className="ml-1">{getTypeName(alert.type)}</span>
              </Badge>
              
              <div className="flex flex-wrap gap-1">
                {alert.details?.square_footage && (
                  <Badge variant="outline" className="text-xs bg-gray-50">
                    {(alert.details.square_footage / 1000).toFixed(1)}K sqft
                  </Badge>
                )}
                
                {alert.details?.year_built && (
                  <Badge variant="outline" className="text-xs bg-gray-50">
                    Built {alert.details.year_built}
                  </Badge>
                )}
                
                {alert.details?.opportunity_score && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                    Score: {alert.details.opportunity_score}
                  </Badge>
                )}
              </div>
              
              <span className="text-xs text-gray-400 w-full text-right mt-1">
                {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Alert Details Panel for Properties
export const PropertyAlertDetail = ({ alert, onBack }: { alert: Alert, onBack: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToWatchlist = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Show success notification here
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold hover:text-primary hover:underline cursor-pointer">
            {alert.property_address}
          </h3>
          <p className="text-sm text-gray-500">{alert.details?.neighborhood || 'Unknown Neighborhood'}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={
            alert.priority === 'high' ? 'bg-red-100 text-red-800' : 
            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-green-100 text-green-800'
          }>
            {alert.priority} priority
          </Badge>
          
          <Button variant="outline" size="sm">
            Mark as Read
          </Button>
        </div>
      </div>
      
      {/* Why This Alert Section */}
      <div className="border rounded-lg p-4">
        <h4 className="font-medium mb-3">Why This Alert?</h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {/* Common metrics for all property types */}
          <div className="border rounded p-3">
            <p className="text-xs text-gray-500">Property Type</p>
            <p className="text-lg font-bold">{alert.details?.property_type || 'N/A'}</p>
          </div>
          
          {alert.details?.square_footage && (
            <div className="border rounded p-3">
              <p className="text-xs text-gray-500">Building Size</p>
              <p className="text-lg font-bold">{new Intl.NumberFormat().format(alert.details.square_footage)} sqft</p>
            </div>
          )}
          
          {alert.details?.year_built && (
            <div className="border rounded p-3">
              <p className="text-xs text-gray-500">Year Built</p>
              <p className="text-lg font-bold">{alert.details.year_built}</p>
              <p className="text-xs text-gray-500">({new Date().getFullYear() - alert.details.year_built} years old)</p>
            </div>
          )}
          
          {alert.details?.num_units && (
            <div className="border rounded p-3">
              <p className="text-xs text-gray-500">Number of Units</p>
              <p className="text-lg font-bold">{alert.details.num_units}</p>
            </div>
          )}
          
          {/* Alert-specific metrics */}
          {alert.type === 'high_opportunity_property' && alert.details?.opportunity_score && (
            <div className="border rounded p-3 col-span-2">
              <p className="text-xs text-gray-500">Opportunity Score</p>
              <p className="text-lg font-bold">{alert.details.opportunity_score}/100</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${alert.details.opportunity_score}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {alert.type === 'price_change' && (
            <>
              <div className="border rounded p-3">
                <p className="text-xs text-gray-500">Price Change</p>
                <p className={`text-lg font-bold ${alert.details?.price_change_percentage && alert.details.price_change_percentage < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {alert.details?.price_change_percentage || 0}%
                </p>
              </div>
              
              <div className="border rounded p-3">
                <p className="text-xs text-gray-500">New Price</p>
                <p className="text-lg font-bold">${new Intl.NumberFormat().format(alert.details?.new_price || 0)}</p>
              </div>
              
              {alert.details?.previous_price && (
                <div className="border rounded p-3">
                  <p className="text-xs text-gray-500">Previous Price</p>
                  <p className="text-lg font-bold line-through text-gray-500">
                    ${new Intl.NumberFormat().format(alert.details.previous_price)}
                  </p>
                </div>
              )}
            </>
          )}
          
          {alert.type === 'new_listing' && alert.details?.new_price && (
            <div className="border rounded p-3 col-span-2">
              <p className="text-xs text-gray-500">Listing Price</p>
              <p className="text-lg font-bold">${new Intl.NumberFormat().format(alert.details.new_price)}</p>
              {alert.details?.square_footage && (
                <p className="text-xs text-gray-500">
                  ${Math.round(alert.details.new_price / alert.details.square_footage)}/sqft
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Data sources: Tax Assessor, MLS</span>
        </div>
      </div>
      
      {/* Visuals */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 flex flex-col items-center justify-center h-48 bg-gray-50">
          <Map className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Interactive Map</p>
        </div>
        
        <div className="border rounded-lg p-4 flex flex-col items-center justify-center h-48 bg-gray-50">
          <BarChart3 className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Price History</p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button 
          variant="default" 
          onClick={handleAddToWatchlist}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add to Watchlist'}
        </Button>
        
        <Button variant="outline">Schedule Tour</Button>
        <Button variant="outline">Compare Properties</Button>
      </div>
    </div>
  );
};

// Main Properties Tab
export function PropertyAlerts({ selectedAlert, setSelectedAlert }: { 
  selectedAlert: Alert | null,
  setSelectedAlert: (alert: Alert | null) => void
}) {
  const { alerts, loading, fetchAlerts } = useAlerts();
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState({
    type: 'all',
    priority: 'all',
    neighborhood: 'all',
    timeframe: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Filter only property-related alerts
  useEffect(() => {
    const propertyTypes = ['high_opportunity_property', 'price_change', 'new_listing'];
    
    let filtered = alerts.filter(alert => 
      propertyTypes.includes(alert.type) && 
      alert.property_address && 
      !alert.dismissed
    );
    
    // Apply additional filters
    if (filter.type !== 'all') {
      filtered = filtered.filter(alert => alert.type === filter.type);
    }
    
    if (filter.priority !== 'all') {
      filtered = filtered.filter(alert => alert.priority === filter.priority);
    }
    
    if (filter.neighborhood !== 'all') {
      filtered = filtered.filter(alert => 
        alert.details?.neighborhood?.toLowerCase().includes(filter.neighborhood.toLowerCase())
      );
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(alert => 
        alert.property_address?.toLowerCase().includes(term) ||
        alert.description.toLowerCase().includes(term) ||
        alert.details?.neighborhood?.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      // Extract values based on sort criteria
      switch(sortBy) {
        case 'price':
          aValue = a.details?.new_price || a.details?.previous_price || 0;
          bValue = b.details?.new_price || b.details?.previous_price || 0;
          break;
        case 'size':
          aValue = a.details?.square_footage || 0;
          bValue = b.details?.square_footage || 0;
          break;
        case 'age':
          aValue = a.details?.year_built ? new Date().getFullYear() - a.details.year_built : 0;
          bValue = b.details?.year_built ? new Date().getFullYear() - b.details.year_built : 0;
          break;
        case 'opportunity':
          aValue = a.details?.opportunity_score || 0;
          bValue = b.details?.opportunity_score || 0;
          break;
        default: // createdAt
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
      }
      
      // Apply sort order
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
    
    setFilteredAlerts(filtered);
  }, [alerts, filter, searchTerm, sortBy, sortOrder]);
  
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
    return <PropertyAlertDetail alert={selectedAlert} onBack={() => setSelectedAlert(null)} />;
  }
  
  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by address or neighborhood..."
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
              <SelectItem value="high_opportunity_property">High Opportunity</SelectItem>
              <SelectItem value="price_change">Price Change</SelectItem>
              <SelectItem value="new_listing">New Listing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={filter.priority} 
            onValueChange={(value) => setFilter({...filter, priority: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Additional Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <Select 
            value={filter.neighborhood} 
            onValueChange={(value) => setFilter({...filter, neighborhood: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Neighborhood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Neighborhoods</SelectItem>
              <SelectItem value="lincoln park">Lincoln Park</SelectItem>
              <SelectItem value="west loop">West Loop</SelectItem>
              <SelectItem value="wicker park">Wicker Park</SelectItem>
              <SelectItem value="river north">River North</SelectItem>
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
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="quarter">Past Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={sortBy} 
            onValueChange={setSortBy}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Added</SelectItem>
              <SelectItem value="price">Purchase Price</SelectItem>
              <SelectItem value="size">Building Size</SelectItem>
              <SelectItem value="age">Building Age</SelectItem>
              <SelectItem value="opportunity">Opportunity Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? (
              <ArrowUpAZ className="h-4 w-4" />
            ) : (
              <ArrowDownAZ className="h-4 w-4" />
            )}
          </Button>
          
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Results */}
      <ScrollArea className="h-[calc(100vh-300px)] min-h-[300px] pr-4">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-3"></div>
              <p className="text-muted-foreground">Loading property alerts...</p>
            </div>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-center">
              <Building className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground mb-1">No property alerts found</p>
              <p className="text-sm text-gray-400">
                {searchTerm || filter.type !== 'all' || filter.priority !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Property alerts will appear here when available'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlerts.map(alert => (
              <PropertyAlertCard
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