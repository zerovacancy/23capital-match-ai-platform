import React, { useState, useEffect } from 'react';
import { useAlerts } from '@/context/AlertsContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Mail, 
  MessageSquare,
  Save,
  RefreshCw,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

// Define types
export interface AlertPreferencesProps {
  onClose?: () => void;
}

interface AlertTypePreference {
  enabled: boolean;
  priority: 'high' | 'medium' | 'low';
  channels: {
    email: boolean;
    sms: boolean;
    dashboard: boolean;
  };
}

interface AlertFrequencyPreference {
  real_time: boolean;
  daily_digest: boolean;
  weekly_digest: boolean;
  digest_day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  digest_time: string;
}

interface AlertPreference {
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

export function AlertPreferences({ onClose }: AlertPreferencesProps) {
  const { getAlertPreferences, saveAlertPreferences } = useAlerts();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [preferences, setPreferences] = useState<AlertPreference | null>(null);
  
  useEffect(() => {
    async function loadPreferences() {
      try {
        const prefs = await getAlertPreferences();
        setPreferences(prefs);
      } catch (error) {
        console.error('Failed to load alert preferences:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPreferences();
  }, [getAlertPreferences]);
  
  const handleSave = async () => {
    if (!preferences) return;
    
    setSaving(true);
    setSaveStatus('idle');
    
    try {
      await saveAlertPreferences(preferences);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Failed to save preferences:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };
  
  const updateTypePreference = (
    type: keyof AlertPreference['alert_types'], 
    field: keyof AlertTypePreference, 
    value: any
  ) => {
    if (!preferences) return;
    
    setPreferences({
      ...preferences,
      alert_types: {
        ...preferences.alert_types,
        [type]: {
          ...preferences.alert_types[type],
          [field]: value
        }
      }
    });
  };
  
  const updateChannelPreference = (
    type: keyof AlertPreference['alert_types'],
    channel: keyof AlertTypePreference['channels'],
    value: boolean
  ) => {
    if (!preferences) return;
    
    setPreferences({
      ...preferences,
      alert_types: {
        ...preferences.alert_types,
        [type]: {
          ...preferences.alert_types[type],
          channels: {
            ...preferences.alert_types[type].channels,
            [channel]: value
          }
        }
      }
    });
  };
  
  const updateFrequencyPreference = (
    field: keyof AlertFrequencyPreference,
    value: any
  ) => {
    if (!preferences) return;
    
    setPreferences({
      ...preferences,
      frequency: {
        ...preferences.frequency,
        [field]: value
      }
    });
  };
  
  const updateThresholdPreference = (
    field: keyof AlertPreference['thresholds'],
    value: number
  ) => {
    if (!preferences) return;
    
    setPreferences({
      ...preferences,
      thresholds: {
        ...preferences.thresholds,
        [field]: value
      }
    });
  };
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-3"></div>
              <p className="text-muted-foreground">Loading alert preferences...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!preferences) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center">
              <AlertCircle className="h-8 w-8 text-destructive mb-3" />
              <p className="text-muted-foreground">Failed to load preferences</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Alert Preferences</CardTitle>
            <CardDescription>Customize how and when you receive alerts</CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="alert-types">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="alert-types">Alert Types</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Options</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          </TabsList>
          
          {/* Alert Types Tab */}
          <TabsContent value="alert-types" className="space-y-6">
            {Object.entries(preferences.alert_types).map(([type, settings]) => {
              const typeName = type
                .replace(/_/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
              
              return (
                <div key={type} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <h3 className="font-medium">{typeName}</h3>
                    </div>
                    <Switch 
                      checked={settings.enabled} 
                      onCheckedChange={(checked) => updateTypePreference(
                        type as keyof AlertPreference['alert_types'], 
                        'enabled', 
                        checked
                      )}
                    />
                  </div>
                  
                  {settings.enabled && (
                    <>
                      <div className="mb-4">
                        <Label className="mb-2 block text-sm">Default Priority</Label>
                        <Select 
                          value={settings.priority} 
                          onValueChange={(value) => updateTypePreference(
                            type as keyof AlertPreference['alert_types'], 
                            'priority', 
                            value as 'high' | 'medium' | 'low'
                          )}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block text-sm">Delivery Channels</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`${type}-email`}
                              checked={settings.channels.email}
                              onCheckedChange={(checked) => updateChannelPreference(
                                type as keyof AlertPreference['alert_types'],
                                'email',
                                checked
                              )}
                            />
                            <Label htmlFor={`${type}-email`} className="flex items-center">
                              <Mail className="h-4 w-4 mr-1.5" />
                              Email
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`${type}-sms`}
                              checked={settings.channels.sms}
                              onCheckedChange={(checked) => updateChannelPreference(
                                type as keyof AlertPreference['alert_types'],
                                'sms',
                                checked
                              )}
                            />
                            <Label htmlFor={`${type}-sms`} className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1.5" />
                              SMS
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`${type}-dashboard`}
                              checked={settings.channels.dashboard}
                              onCheckedChange={(checked) => updateChannelPreference(
                                type as keyof AlertPreference['alert_types'],
                                'dashboard',
                                checked
                              )}
                            />
                            <Label htmlFor={`${type}-dashboard`} className="flex items-center">
                              <Bell className="h-4 w-4 mr-1.5" />
                              Dashboard
                            </Label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </TabsContent>
          
          {/* Delivery Options Tab */}
          <TabsContent value="delivery" className="space-y-6">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">Alert Frequency</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="real-time-alerts" className="flex items-center">
                    <span>Real-time alerts</span>
                  </Label>
                  <Switch
                    id="real-time-alerts"
                    checked={preferences.frequency.real_time}
                    onCheckedChange={(checked) => updateFrequencyPreference('real_time', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-digest" className="flex items-center">
                    <span>Daily digest</span>
                  </Label>
                  <Switch
                    id="daily-digest"
                    checked={preferences.frequency.daily_digest}
                    onCheckedChange={(checked) => updateFrequencyPreference('daily_digest', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="weekly-digest" className="flex items-center">
                    <span>Weekly digest</span>
                  </Label>
                  <Switch
                    id="weekly-digest"
                    checked={preferences.frequency.weekly_digest}
                    onCheckedChange={(checked) => updateFrequencyPreference('weekly_digest', checked)}
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {(preferences.frequency.daily_digest || preferences.frequency.weekly_digest) && (
                <div className="space-y-4">
                  {preferences.frequency.weekly_digest && (
                    <div>
                      <Label className="mb-2 block text-sm">Weekly digest day</Label>
                      <Select 
                        value={preferences.frequency.digest_day} 
                        onValueChange={(value) => updateFrequencyPreference(
                          'digest_day', 
                          value as AlertFrequencyPreference['digest_day']
                        )}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <Label className="mb-2 block text-sm">Digest delivery time</Label>
                    <Select 
                      value={preferences.frequency.digest_time} 
                      onValueChange={(value) => updateFrequencyPreference('digest_time', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Thresholds Tab */}
          <TabsContent value="thresholds" className="space-y-6">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">Alert Thresholds</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Price Change Threshold (%)</Label>
                    <span className="text-sm font-medium">
                      {preferences.thresholds.price_change_threshold}%
                    </span>
                  </div>
                  <Slider
                    value={[preferences.thresholds.price_change_threshold]}
                    min={1}
                    max={20}
                    step={1}
                    onValueChange={(value) => updateThresholdPreference('price_change_threshold', value[0])}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    You'll be alerted when property prices change by at least {preferences.thresholds.price_change_threshold}%.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Opportunity Score Threshold</Label>
                    <span className="text-sm font-medium">
                      {preferences.thresholds.opportunity_score_threshold}
                    </span>
                  </div>
                  <Slider
                    value={[preferences.thresholds.opportunity_score_threshold]}
                    min={50}
                    max={95}
                    step={5}
                    onValueChange={(value) => updateThresholdPreference('opportunity_score_threshold', value[0])}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    You'll be alerted about high opportunity properties when their score is above {preferences.thresholds.opportunity_score_threshold}.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center"
          >
            {saving ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                Saving...
              </>
            ) : saveStatus === 'success' ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Saved
              </>
            ) : saveStatus === 'error' ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Failed to save
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}