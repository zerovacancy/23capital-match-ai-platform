import React, { useState } from 'react';
import { format } from 'date-fns';
import { Alert } from '@/context/AlertsContext';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Building, 
  DollarSign, 
  Map, 
  Calendar, 
  TrendingUp, 
  Star, 
  Home,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface AlertDetailProps {
  alert: Alert;
  onBack: () => void;
}

export function AlertDetail({ alert, onBack }: AlertDetailProps) {
  const [loading, setLoading] = useState(false);
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP pp');
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  // Get icon based on alert type
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'high_opportunity_property':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'price_change':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'status_change':
        return <Building className="h-5 w-5 text-blue-500" />;
      case 'new_listing':
        return <Home className="h-5 w-5 text-purple-500" />;
      case 'neighborhood_opportunity':
        return <Map className="h-5 w-5 text-amber-500" />;
      case 'market_trend':
        return <TrendingUp className="h-5 w-5 text-cyan-500" />;
      case 'seasonal_opportunity':
        return <Calendar className="h-5 w-5 text-emerald-500" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };
  
  // Handle viewing property details (simulate)
  const handleViewProperty = () => {
    setLoading(true);
    
    // In a real app, navigate to property details page
    setTimeout(() => {
      setLoading(false);
      alert(`Navigating to property details for ${alert.property_address || 'this property'}`);
    }, 1000);
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-xl font-semibold flex items-center">
          {getAlertIcon()}
          <span className="ml-2">{alert.title}</span>
        </h2>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle>{alert.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(alert.priority)}>
                {alert.priority}
              </Badge>
              {alert.read && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Read
                </Badge>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatDate(alert.created_at)}
          </p>
        </CardHeader>
        
        <CardContent>
          <p className="text-base mb-4">{alert.description}</p>
          
          {alert.property_address && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Property Details
              </h3>
              
              <div className="bg-muted p-4 rounded-md mb-4">
                <h4 className="font-medium">{alert.property_address}</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Type</span>
                    <p>{alert.details?.property_type || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Neighborhood</span>
                    <p>{alert.details?.neighborhood || 'Unknown'}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full"
                onClick={handleViewProperty}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    View Property Details
                  </span>
                )}
              </Button>
            </div>
          )}
          
          <Separator className="my-6" />
          
          {/* Additional data section based on alert type */}
          <div>
            <h3 className="text-lg font-medium mb-4">Alert Details</h3>
            
            {alert.type === 'high_opportunity_property' && alert.details && (
              <div className="grid grid-cols-2 gap-4">
                {alert.details.opportunity_score && (
                  <div>
                    <span className="text-sm text-muted-foreground">Opportunity Score</span>
                    <p className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      {alert.details.opportunity_score}
                    </p>
                  </div>
                )}
                
                {/* Display other details if available */}
                <div>
                  <span className="text-sm text-muted-foreground">Property Type</span>
                  <p>{alert.details.property_type || 'Unknown'}</p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Neighborhood</span>
                  <p>{alert.details.neighborhood || 'Unknown'}</p>
                </div>
              </div>
            )}
            
            {alert.type === 'price_change' && alert.details && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Previous Price</span>
                    <p className="font-medium">${alert.details.previous_price?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">New Price</span>
                    <p className="font-medium">${alert.details.new_price?.toLocaleString() || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Price Change</span>
                  <p className={alert.details.price_change_percentage && alert.details.price_change_percentage < 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {alert.details.price_change_percentage && alert.details.price_change_percentage > 0 ? '+' : ''}
                    {alert.details.price_change_percentage ? `${alert.details.price_change_percentage.toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
                
                {alert.created_at && (
                  <div>
                    <span className="text-sm text-muted-foreground">Change Date</span>
                    <p>{formatDate(alert.created_at)}</p>
                  </div>
                )}
              </div>
            )}
            
            {alert.type === 'market_trend' && alert.details && (
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">Market Direction</span>
                  <p className="font-medium">{alert.details.market_trend_direction === 'up' ? 'Upward' : 'Downward'}</p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Time Period</span>
                  <p>{alert.details.market_trend_period || 'Recent period'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Percentage Change</span>
                    <p className={alert.details.market_trend_percentage && alert.details.market_trend_percentage < 0 ? "text-green-600" : "text-red-600"}>
                      {alert.details.market_trend_percentage && alert.details.market_trend_percentage > 0 ? '+' : ''}
                      {alert.details.market_trend_percentage ? `${alert.details.market_trend_percentage.toFixed(1)}%` : 'N/A'}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Property Type</span>
                    <p>{alert.details.property_type || 'All types'}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Default data display for any other alert types */}
            {!['high_opportunity_property', 'price_change', 'market_trend'].includes(alert.type) && alert.details && (
              <div className="space-y-2">
                {Object.entries(alert.details).map(([key, value]) => {
                  // Skip null/undefined values and complex objects
                  if (value === null || value === undefined || typeof value === 'object') {
                    return null;
                  }
                  
                  return (
                    <div key={key}>
                      <span className="text-sm text-muted-foreground">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <p>{String(value)}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}