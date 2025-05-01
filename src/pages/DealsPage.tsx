import React from 'react';
import { SimpleSidebar } from '@/components/alerts/SimpleSidebar';
import { DollarSign, Search, Filter, PlusCircle, Clock, CheckCircle, HelpCircle, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DealsPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Deals</h1>
              <p className="text-gray-500">
                Track and manage property acquisition deals
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              
              <Button size="sm" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>New Deal</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search deals by name, address, or investor..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-4">
                <TabsTrigger value="active">Active (12)</TabsTrigger>
                <TabsTrigger value="completed">Completed (8)</TabsTrigger>
                <TabsTrigger value="pipeline">Pipeline (4)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-0">
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Active Deals</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <span>Sort by: Recent Activity</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mt-4">
                      {Array.from({length: 3}).map((_, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
                          <div className="flex justify-between flex-wrap gap-2 mb-3">
                            <h3 className="font-medium">Lincoln Park Mixed-Use Development</h3>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Due Diligence</span>
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mb-4 text-sm">
                            <div>
                              <span className="text-muted-foreground mr-1">Value:</span>
                              <span className="font-medium">$4.2M</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground mr-1">Location:</span>
                              <span>123 Lincoln Park Way</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground mr-1">Investor:</span>
                              <span>Sequoia Capital</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Progress</span>
                              <span className="text-muted-foreground">65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                              <span>4/6 milestones completed</span>
                            </div>
                            <span className="text-sm text-muted-foreground">Updated 2 days ago</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({length: 4}).map((_, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-md cursor-pointer transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">West Loop Multifamily Acquisition</h3>
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </div>
                        <div className="mb-3 text-sm">
                          <span className="text-muted-foreground mr-1">Final Value:</span>
                          <span className="font-medium">$3.8M</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3 text-sm">
                          <div>
                            <span className="text-muted-foreground mr-1">Investor:</span>
                            <span>Harbor Capital</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1">Closed:</span>
                            <span>Jan 15, 2023</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pipeline" className="mt-0">
                <div className="flex items-center justify-center h-[300px] text-muted-foreground border rounded-lg">
                  <div className="flex flex-col items-center">
                    <HelpCircle className="h-12 w-12 mb-4 opacity-20" />
                    <p>Pipeline deals are in early stages</p>
                    <p className="text-sm mt-1">Create a new deal or convert property opportunities to deals</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;