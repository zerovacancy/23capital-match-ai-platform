import React from 'react';
import { SimpleSidebar } from '@/components/alerts/SimpleSidebar';
import { Settings, User, BellRing, Shield, Mail, Database, Globe, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-500">
              Manage your account preferences and application settings
            </p>
          </div>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full max-w-md mb-6">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <BellRing className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>Integrations</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Alex Miller" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="alex@capitalmatch.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" defaultValue="Investment Analyst" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" defaultValue="Capital Match" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="america-chicago">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america-chicago">America/Chicago (UTC-06:00)</SelectItem>
                          <SelectItem value="america-new_york">America/New York (UTC-05:00)</SelectItem>
                          <SelectItem value="america-los_angeles">America/Los Angeles (UTC-08:00)</SelectItem>
                          <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preferences</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">Marketing emails</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                      </div>
                      <Switch id="marketing" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark mode</Label>
                        <p className="text-sm text-muted-foreground">Use dark theme for the application interface</p>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Email Notifications</h3>
                      
                      <div className="rounded-md border p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Property Alerts</Label>
                            <p className="text-sm text-muted-foreground">Notifications about new property opportunities</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Market Updates</Label>
                            <p className="text-sm text-muted-foreground">Regular updates about market trends and analysis</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Deal Activity</Label>
                            <p className="text-sm text-muted-foreground">Updates about deal progress and milestones</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">In-App Notifications</h3>
                      
                      <div className="rounded-md border p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>All Notifications</Label>
                            <p className="text-sm text-muted-foreground">Enable in-app notifications for all events</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Sound Alerts</Label>
                            <p className="text-sm text-muted-foreground">Play sound for high priority notifications</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Email Digest Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time (immediate)</SelectItem>
                          <SelectItem value="daily">Daily digest</SelectItem>
                          <SelectItem value="weekly">Weekly digest</SelectItem>
                          <SelectItem value="never">Never (disabled)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        <span>Save Preferences</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Password</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        
                        <div></div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline">Change Password</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                      
                      <div className="rounded-md border p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Enable Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <Button variant="outline">Configure 2FA</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Session Management</h3>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Active Sessions</p>
                            <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
                          </div>
                          <Button variant="outline" size="sm">Sign Out All Devices</Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                            <div>
                              <p className="text-sm font-medium">Current Device - Chrome on macOS</p>
                              <p className="text-xs text-muted-foreground">Chicago, IL - Last active: Now</p>
                            </div>
                            <Badge>Current</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>API & Integrations</CardTitle>
                  <CardDescription>Manage third-party integrations and API access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">Cook County Property Database</h3>
                          <p className="text-sm text-muted-foreground">Connect to the official Cook County property database</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-green-50 text-green-700 mr-2">Connected</Badge>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last synced:</span>
                          <span>Today, 9:45 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Records available:</span>
                          <span>1.2M properties</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">MLS Integration</h3>
                          <p className="text-sm text-muted-foreground">Connect to Multiple Listing Service for real-time data</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 mr-2">Setup Required</Badge>
                          <Button size="sm">Connect</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">CRM Integration</h3>
                          <p className="text-sm text-muted-foreground">Connect to your CRM system for investor data</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-red-50 text-red-700 mr-2">Not Connected</Badge>
                          <Button size="sm" variant="outline">Configure</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-medium">API Access</h3>
                        <Button variant="outline" size="sm">Generate New Key</Button>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <p className="font-medium">API Key</p>
                            <p className="text-sm text-muted-foreground">Use this key to access the Capital Match API</p>
                          </div>
                          <Button variant="ghost" size="sm">Copy</Button>
                        </div>
                        
                        <div className="bg-muted p-2 rounded-md font-mono text-sm overflow-x-auto">
                          sk_test_51HG8u7CJANGuSrJ0JbKH9n4PwS9PwS9PwS9PwS9PwS9PwS9
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <Label>Enable API Access</Label>
                          <p className="text-sm text-muted-foreground">Allow third-party access to your account data</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;