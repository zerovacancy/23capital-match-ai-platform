import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Alert type definition
export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'high_opportunity_property' | 'price_change' | 'status_change' | 'new_listing' | 'neighborhood_opportunity' | 'market_trend' | 'seasonal_opportunity';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  read: boolean;
  dismissed: boolean;
  property_id?: string;
  property_address?: string;
  property_zip?: string;
  url?: string;
  // Relationships data
  relationships?: {
    brokers?: { name: string; company?: string; role?: string }[];
    ownerReps?: { name: string; company?: string; role?: string }[];
    equityGroups?: { name: string; type?: string; role?: string }[];
    lenders?: { name: string; type?: string }[];
  };
  // Type-specific data
  details?: {
    opportunity_score?: number;
    price_change_percentage?: number;
    previous_price?: number;
    new_price?: number;
    market_trend_period?: string;
    market_trend_direction?: 'up' | 'down';
    market_trend_percentage?: number;
    seasonal_factor?: string;
    property_type?: string;
    neighborhood?: string;
    year_built?: number;
    square_footage?: number;
    num_units?: number;
    lot_size?: number;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

// Alert preference types
export interface AlertTypePreference {
  enabled: boolean;
  priority: 'high' | 'medium' | 'low';
  channels: {
    email: boolean;
    sms: boolean;
    dashboard: boolean;
  };
}

export interface AlertFrequencyPreference {
  real_time: boolean;
  daily_digest: boolean;
  weekly_digest: boolean;
  digest_day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  digest_time: string;
}

export interface AlertPreference {
  alert_types: {
    high_opportunity_property: AlertTypePreference;
    price_change: AlertTypePreference;
    status_change: AlertTypePreference;
    new_listing: AlertTypePreference;
    neighborhood_opportunity: AlertTypePreference;
    market_trend: AlertTypePreference;
    seasonal_opportunity: AlertTypePreference;
  };
  frequency: AlertFrequencyPreference;
  thresholds: {
    price_change_threshold: number;
    opportunity_score_threshold: number;
  };
}

// Alert filters
export interface AlertFilters {
  type?: Alert['type'][];
  priority?: Alert['priority'][];
  read?: boolean;
  dismissed?: boolean;
  property_id?: string;
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Context interface
interface AlertsContextType {
  alerts: Alert[];
  unreadCount: number;
  highPriorityCount: number;
  loading: boolean;
  error: Error | null;
  fetchAlerts: (filters?: AlertFilters) => Promise<Alert[]>;
  markAsRead: (alertId: string) => Promise<void>;
  dismissAlert: (alertId: string) => Promise<void>;
  getAlertById: (alertId: string) => Alert | undefined;
  getAlertPreferences: () => Promise<AlertPreference>;
  saveAlertPreferences: (preferences: AlertPreference) => Promise<void>;
  refreshAlerts: () => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

// Create context with default values
const AlertsContext = createContext<AlertsContextType>({
  alerts: [],
  unreadCount: 0,
  highPriorityCount: 0,
  loading: false,
  error: null,
  fetchAlerts: async () => [],
  markAsRead: async () => {},
  dismissAlert: async () => {},
  getAlertById: () => undefined,
  getAlertPreferences: async () => ({ 
    alert_types: {} as any, 
    frequency: {} as any, 
    thresholds: {} as any 
  }),
  saveAlertPreferences: async () => {},
  refreshAlerts: async () => {},
  markAllAsRead: async () => {},
});

// Mock data to simulate backend responses
const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    title: 'High Opportunity Property Identified',
    description: 'A property in Lincoln Park has been identified as a high opportunity investment.',
    type: 'high_opportunity_property',
    priority: 'high',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    dismissed: false,
    property_id: 'prop123',
    property_address: '123 Lincoln Park Way, Chicago, IL',
    property_zip: '60614',
    relationships: {
      brokers: [
        { name: "Chuck Johanns", company: "Newmark", role: "seller's broker" }
      ],
      equityGroups: [
        { name: "AEW Capital Management", type: "private equity", role: "buyer" }
      ],
      lenders: [
        { name: "Wintrust Bank", type: "commercial" }
      ]
    },
    details: {
      opportunity_score: 92,
      property_type: 'Multifamily',
      neighborhood: 'Lincoln Park',
      year_built: 1985,
      square_footage: 25000,
      num_units: 18,
      coordinates: {
        lat: 41.9214,
        lng: -87.6513
      }
    }
  },
  {
    id: '2',
    title: 'Price Change Alert',
    description: 'A property in your watch list has decreased in price by 15%.',
    type: 'price_change',
    priority: 'medium',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    read: false,
    dismissed: false,
    property_id: 'prop456',
    property_address: '456 West Loop Ave, Chicago, IL',
    property_zip: '60607',
    relationships: {
      brokers: [
        { name: "Liz Gagliardi", company: "Newmark", role: "seller's broker" },
        { name: "Jeff Robbins", company: "Walker & Dunlop", role: "buyer's broker" }
      ],
      equityGroups: [
        { name: "MZ Capital Partners", type: "private equity", role: "equity partner" }
      ]
    },
    details: {
      price_change_percentage: -15,
      previous_price: 2500000,
      new_price: 2125000,
      property_type: 'Mixed Use',
      neighborhood: 'West Loop',
      year_built: 2002,
      square_footage: 18500,
      num_units: 6,
      coordinates: {
        lat: 41.8855,
        lng: -87.6536
      }
    }
  },
  {
    id: '3',
    title: 'Market Trend Detected',
    description: 'Cook County residential properties have increased 7% over the last quarter.',
    type: 'market_trend',
    priority: 'low',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    read: true,
    dismissed: false,
    details: {
      market_trend_period: 'Q2 2023',
      market_trend_direction: 'up',
      market_trend_percentage: 7,
      property_type: 'Residential'
    }
  },
  {
    id: '4',
    title: 'New Property Listing',
    description: 'A new commercial property has been listed in Wicker Park matching your criteria.',
    type: 'new_listing',
    priority: 'medium',
    created_at: new Date(Date.now() - 43200000).toISOString(),
    read: false,
    dismissed: false,
    property_id: 'prop789',
    property_address: '789 Wicker Park Blvd, Chicago, IL',
    property_zip: '60622',
    relationships: {
      brokers: [
        { name: "Susan Lawson", company: "Newmark", role: "listing broker" }
      ],
      lenders: [
        { name: "U.S. Department of Housing and Urban Development (HUD)", type: "government" }
      ]
    },
    details: {
      property_type: 'Commercial',
      neighborhood: 'Wicker Park',
      year_built: 1978,
      square_footage: 12000,
      new_price: 3450000,
      coordinates: {
        lat: 41.9087,
        lng: -87.6796
      }
    }
  },
  {
    id: '5',
    title: 'Seasonal Opportunity',
    description: 'Winter slowdown presents buying opportunities in North Side neighborhoods.',
    type: 'seasonal_opportunity',
    priority: 'medium',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    read: false,
    dismissed: false,
    details: {
      seasonal_factor: 'Winter Market Slowdown',
      property_type: 'Mixed',
      neighborhood: 'North Side',
    }
  },
  {
    id: '6',
    title: 'High Value Office Property',
    description: 'Premium office building in River North with excellent ROI potential.',
    type: 'high_opportunity_property',
    priority: 'high',
    created_at: new Date(Date.now() - 130000).toISOString(),
    read: false,
    dismissed: false,
    property_id: 'prop234',
    property_address: '234 River North Plaza, Chicago, IL',
    property_zip: '60654',
    relationships: {
      brokers: [
        { name: "Matt Ewig", company: "Walker & Dunlop", role: "seller's broker" },
        { name: "Chris Rumul", company: "Walker & Dunlop", role: "buyer's broker" }
      ],
      equityGroups: [
        { name: "JRG Capital Partners", type: "investment firm", role: "buyer" },
        { name: "AEW Capital Management", type: "private equity", role: "investor" }
      ],
      lenders: [
        { name: "Wintrust Bank", type: "commercial" },
        { name: "U.S. Department of Housing and Urban Development (HUD)", type: "government" }
      ]
    },
    details: {
      opportunity_score: 88,
      property_type: 'Office',
      neighborhood: 'River North',
      year_built: 2010,
      square_footage: 75000,
      num_units: 12,
      new_price: 12500000,
      coordinates: {
        lat: 41.8924,
        lng: -87.6341
      }
    }
  },
  {
    id: '7',
    title: 'Historic Building Opportunity',
    description: 'Landmark building in Wicker Park with renovation potential.',
    type: 'high_opportunity_property',
    priority: 'medium',
    created_at: new Date(Date.now() - 510000).toISOString(),
    read: true,
    dismissed: false,
    property_id: 'prop456',
    property_address: '456 Wicker Park Ave, Chicago, IL',
    property_zip: '60622',
    details: {
      opportunity_score: 76,
      property_type: 'Retail',
      neighborhood: 'Wicker Park',
      year_built: 1925,
      square_footage: 8500,
      new_price: 980000,
      coordinates: {
        lat: 41.9092,
        lng: -87.6745
      }
    }
  }
];

// Mock preferences
const MOCK_PREFERENCES: AlertPreference = {
  alert_types: {
    high_opportunity_property: {
      enabled: true,
      priority: 'high',
      channels: {
        email: true,
        sms: true,
        dashboard: true
      }
    },
    price_change: {
      enabled: true,
      priority: 'medium',
      channels: {
        email: true,
        sms: false,
        dashboard: true
      }
    },
    status_change: {
      enabled: true,
      priority: 'medium',
      channels: {
        email: true,
        sms: false,
        dashboard: true
      }
    },
    new_listing: {
      enabled: true,
      priority: 'medium',
      channels: {
        email: true,
        sms: false,
        dashboard: true
      }
    },
    neighborhood_opportunity: {
      enabled: true,
      priority: 'low',
      channels: {
        email: true,
        sms: false,
        dashboard: true
      }
    },
    market_trend: {
      enabled: true,
      priority: 'low',
      channels: {
        email: true,
        sms: false,
        dashboard: true
      }
    },
    seasonal_opportunity: {
      enabled: true,
      priority: 'medium',
      channels: {
        email: true,
        sms: false,
        dashboard: true
      }
    }
  },
  frequency: {
    real_time: true,
    daily_digest: true,
    weekly_digest: false,
    digest_day: 'monday',
    digest_time: '09:00'
  },
  thresholds: {
    price_change_threshold: 5,
    opportunity_score_threshold: 75
  }
};

// Provider component
export const AlertsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [pollInterval, setPollInterval] = useState<number>(60000); // 1 minute default
  
  // Computed values
  const unreadCount = alerts.filter(alert => !alert.read).length;
  const highPriorityCount = alerts.filter(alert => alert.priority === 'high' && !alert.dismissed).length;
  
  // Fetch alerts with optional filters
  const fetchAlerts = useCallback(async (filters?: AlertFilters): Promise<Alert[]> => {
    setLoading(true);
    try {
      // In a real implementation, this would make an API call with the filters
      // For now, we'll simulate filtering on the mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      let filteredAlerts = [...MOCK_ALERTS];
      
      if (filters) {
        if (filters.type?.length) {
          filteredAlerts = filteredAlerts.filter(alert => filters.type?.includes(alert.type));
        }
        
        if (filters.priority?.length) {
          filteredAlerts = filteredAlerts.filter(alert => filters.priority?.includes(alert.priority));
        }
        
        if (filters.read !== undefined) {
          filteredAlerts = filteredAlerts.filter(alert => alert.read === filters.read);
        }
        
        if (filters.dismissed !== undefined) {
          filteredAlerts = filteredAlerts.filter(alert => alert.dismissed === filters.dismissed);
        }
        
        if (filters.property_id) {
          filteredAlerts = filteredAlerts.filter(alert => alert.property_id === filters.property_id);
        }
        
        if (filters.search) {
          const search = filters.search.toLowerCase();
          filteredAlerts = filteredAlerts.filter(alert => 
            alert.title.toLowerCase().includes(search) || 
            alert.description.toLowerCase().includes(search) ||
            alert.property_address?.toLowerCase().includes(search)
          );
        }
        
        if (filters.dateRange) {
          const start = new Date(filters.dateRange.start).getTime();
          const end = new Date(filters.dateRange.end).getTime();
          
          filteredAlerts = filteredAlerts.filter(alert => {
            const alertDate = new Date(alert.created_at).getTime();
            return alertDate >= start && alertDate <= end;
          });
        }
      }
      
      // Sort by creation date (newest first) and priority
      filteredAlerts.sort((a, b) => {
        // First by priority (high > medium > low)
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        
        if (priorityDiff !== 0) return priorityDiff;
        
        // Then by creation date (newest first)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      
      setAlerts(filteredAlerts);
      setLastFetch(Date.now());
      return filteredAlerts;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Refresh alerts (for manual refresh or polling)
  const refreshAlerts = useCallback(async (): Promise<void> => {
    try {
      await fetchAlerts();
    } catch (err) {
      console.error('Failed to refresh alerts:', err);
    }
  }, [fetchAlerts]);
  
  // Mark an alert as read
  const markAsRead = useCallback(async (alertId: string): Promise<void> => {
    try {
      // Optimistic update
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === alertId ? { ...alert, read: true } : alert
        )
      );
      
      // In a real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      // If the API call failed, we would revert the optimistic update here
    } catch (err) {
      // Revert optimistic update
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === alertId ? { ...alert, read: false } : alert
        )
      );
      
      setError(err instanceof Error ? err : new Error('Failed to mark alert as read'));
      throw err;
    }
  }, []);
  
  // Mark all alerts as read
  const markAllAsRead = useCallback(async (): Promise<void> => {
    try {
      // Optimistic update
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => ({ ...alert, read: true }))
      );
      
      // In a real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // If the API call failed, we would revert the optimistic update here
    } catch (err) {
      // Revert to previous state
      setError(err instanceof Error ? err : new Error('Failed to mark all alerts as read'));
      throw err;
    }
  }, []);
  
  // Dismiss an alert
  const dismissAlert = useCallback(async (alertId: string): Promise<void> => {
    try {
      // Optimistic update
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === alertId ? { ...alert, dismissed: true } : alert
        )
      );
      
      // In a real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      // If the API call failed, we would revert the optimistic update here
    } catch (err) {
      // Revert optimistic update
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === alertId ? { ...alert, dismissed: false } : alert
        )
      );
      
      setError(err instanceof Error ? err : new Error('Failed to dismiss alert'));
      throw err;
    }
  }, []);
  
  // Get alert by ID
  const getAlertById = useCallback((alertId: string): Alert | undefined => {
    return alerts.find(alert => alert.id === alertId);
  }, [alerts]);
  
  // Get alert preferences
  const getAlertPreferences = useCallback(async (): Promise<AlertPreference> => {
    try {
      // In a real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      return MOCK_PREFERENCES;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get alert preferences'));
      throw err;
    }
  }, []);
  
  // Save alert preferences
  const saveAlertPreferences = useCallback(async (preferences: AlertPreference): Promise<void> => {
    try {
      // In a real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Update local mock for demo purposes
      Object.assign(MOCK_PREFERENCES, preferences);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save alert preferences'));
      throw err;
    }
  }, []);
  
  // Load alerts on mount and set up polling
  useEffect(() => {
    fetchAlerts();
    
    // Set up adaptive polling based on user activity
    const handleActivity = () => {
      // When user is active, poll more frequently
      setPollInterval(60000); // 1 minute when active
    };
    
    // When user becomes inactive, reduce polling frequency
    const inactivityTimer = setTimeout(() => {
      setPollInterval(300000); // 5 minutes when inactive
    }, 300000); // 5 minutes of inactivity
    
    // Monitor user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [fetchAlerts]);
  
  // Set up polling
  useEffect(() => {
    const poll = () => {
      // Only poll if the last fetch was more than the poll interval ago
      if (Date.now() - lastFetch >= pollInterval) {
        refreshAlerts();
      }
    };
    
    const pollTimer = setInterval(poll, pollInterval);
    
    return () => {
      clearInterval(pollTimer);
    };
  }, [lastFetch, pollInterval, refreshAlerts]);
  
  return (
    <AlertsContext.Provider
      value={{
        alerts,
        unreadCount,
        highPriorityCount,
        loading,
        error,
        fetchAlerts,
        markAsRead,
        dismissAlert,
        getAlertById,
        getAlertPreferences,
        saveAlertPreferences,
        refreshAlerts,
        markAllAsRead
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

// Custom hook for using the alerts context
export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};