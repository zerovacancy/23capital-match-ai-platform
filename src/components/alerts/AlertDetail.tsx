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
      alert(`Navigating to property details for ${alert.property?.address || 'this property'}`);
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
          <span className="ml-2">{alert.typeDisplay}</span>
        </h2>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle>{alert.typeDisplay}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(alert.priority)}>
                {alert.priority}
              </Badge>
              {alert.isRead && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Read
                </Badge>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatDate(alert.createdAt)}
          </p>
        </CardHeader>
        
        <CardContent>
          <p className="text-base mb-4">{alert.description}</p>
          
          {alert.property && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Property Details
              </h3>
              
              <div className="bg-muted p-4 rounded-md mb-4">
                <h4 className="font-medium">{alert.property.address}</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Type</span>
                    <p>{alert.property.type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Neighborhood</span>
                    <p>{alert.property.neighborhood}</p>
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
            
            {alert.type === 'high_opportunity_property' && alert.data && (
              <div className="grid grid-cols-2 gap-4">
                {alert.data.investment_opportunity_score && (
                  <div>
                    <span className="text-sm text-muted-foreground">Investment Score</span>
                    <p className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      {alert.data.investment_opportunity_score}
                    </p>
                  </div>
                )}
                
                {alert.data.acquisition_potential_score && (
                  <div>
                    <span className="text-sm text-muted-foreground">Acquisition Potential</span>
                    <p>{alert.data.acquisition_potential_score}</p>
                  </div>
                )}
                
                {alert.data.renovation_potential_score && (
                  <div>
                    <span className="text-sm text-muted-foreground">Renovation Potential</span>
                    <p>{alert.data.renovation_potential_score}</p>
                  </div>
                )}
                
                {alert.data.neighborhood_growth_score && (
                  <div>
                    <span className="text-sm text-muted-foreground">Neighborhood Growth</span>
                    <p>{alert.data.neighborhood_growth_score}</p>
                  </div>
                )}
                
                {alert.data.price_analysis_score && (
                  <div>
                    <span className="text-sm text-muted-foreground">Price Analysis</span>
                    <p>{alert.data.price_analysis_score}</p>
                  </div>
                )}
              </div>
            )}
            
            {alert.type === 'price_change' && alert.data && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Previous Price</span>
                    <p className="font-medium">${alert.data.old_price?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">New Price</span>
                    <p className="font-medium">${alert.data.new_price?.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Price Change</span>
                  <p className={alert.data.price_change_pct < 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {alert.data.price_change_pct > 0 ? '+' : ''}{alert.data.price_change_pct?.toFixed(1)}%
                    ({alert.data.price_change > 0 ? '+' : ''}${alert.data.price_change?.toLocaleString()})
                  </p>
                </div>
                
                {alert.data.change_date && (
                  <div>
                    <span className="text-sm text-muted-foreground">Change Date</span>
                    <p>{formatDate(alert.data.change_date)}</p>
                  </div>
                )}
              </div>
            )}
            
            {alert.type === 'market_trend' && alert.data && (
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">Market Direction</span>
                  <p className="font-medium">{alert.data.market_direction}</p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Summary</span>
                  <p>{alert.data.market_conditions?.join(', ')}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Price Change</span>
                    <p className={alert.data.price_change_pct < 0 ? "text-green-600" : "text-red-600"}>
                      {alert.data.price_change_pct > 0 ? '+' : ''}{alert.data.price_change_pct?.toFixed(1)}%
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Volume Change</span>
                    <p className={alert.data.volume_change_pct > 0 ? "text-green-600" : "text-red-600"}>
                      {alert.data.volume_change_pct > 0 ? '+' : ''}{alert.data.volume_change_pct?.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Default data display for any other alert types */}
            {!['high_opportunity_property', 'price_change', 'market_trend'].includes(alert.type) && (
              <div className="space-y-2">
                {Object.entries(alert.data || {}).map(([key, value]) => {
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