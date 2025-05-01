import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Alert as AlertType } from '@/context/AlertsContext';
import { useAlerts } from '@/context/AlertsContext';
import { AlertCircle, Building, TrendingUp, DollarSign, Home, Map, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AlertItemProps {
  alert: AlertType;
  onSelect?: (alert: AlertType) => void;
}

export function AlertItem({ alert, onSelect }: AlertItemProps) {
  const { markAsRead } = useAlerts();
  
  const handleMarkRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    markAsRead(alert.id);
  };
  
  const handleClick = () => {
    if (!alert.isRead) {
      markAsRead(alert.id);
    }
    
    if (onSelect) {
      onSelect(alert);
    }
  };
  
  // Get icon based on alert type
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'high_opportunity_property':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'price_change':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'status_change':
        return <Building className="h-4 w-4 text-blue-500" />;
      case 'new_listing':
        return <Home className="h-4 w-4 text-purple-500" />;
      case 'neighborhood_opportunity':
        return <Map className="h-4 w-4 text-amber-500" />;
      case 'market_trend':
        return <TrendingUp className="h-4 w-4 text-cyan-500" />;
      case 'seasonal_opportunity':
        return <Calendar className="h-4 w-4 text-emerald-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };
  
  // Get background color based on read status and priority
  const getCardClass = () => {
    if (!alert.isRead) {
      switch (alert.priority) {
        case 'high':
          return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
        case 'medium':
          return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700';
        case 'low':
          return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
        default:
          return '';
      }
    }
    return '';
  };
  
  // Format date
  const formattedDate = formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true });
  
  return (
    <Card 
      className={`mb-3 cursor-pointer transition-colors hover:bg-muted/50 ${getCardClass()}`}
      onClick={handleClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getAlertIcon()}
            <CardTitle className="text-sm font-medium">{alert.typeDisplay}</CardTitle>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={alert.priority === 'high' ? "destructive" : alert.priority === 'medium' ? "default" : "secondary"}>
              {alert.priority}
            </Badge>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-2">
        <p className="text-sm">{alert.description}</p>
        
        {alert.property && (
          <div className="mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building className="h-3 w-3" />
              <span className="font-medium">{alert.property.address}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>{alert.property.type}</span>
              <span>{alert.property.neighborhood}</span>
            </div>
          </div>
        )}
        
        {/* Show any additional data here if needed */}
        {alert.data && alert.data.price && (
          <div className="mt-2 text-xs">
            <span className="font-medium">Price: ${alert.data.price.toLocaleString()}</span>
            
            {alert.data.price_change_pct && (
              <span className={alert.data.price_change_pct < 0 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                {alert.data.price_change_pct > 0 ? '+' : ''}{alert.data.price_change_pct.toFixed(1)}%
              </span>
            )}
          </div>
        )}
        
        {alert.data && alert.data.investment_opportunity_score && (
          <div className="mt-1 text-xs">
            <span className="font-medium">Opportunity Score: </span>
            <span className="text-blue-600">{alert.data.investment_opportunity_score}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleClick}>
          View Details
        </Button>
        
        {!alert.isRead && (
          <Button variant="ghost" size="sm" onClick={handleMarkRead}>
            Mark as Read
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}