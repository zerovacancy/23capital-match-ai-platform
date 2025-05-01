import React from 'react';
import { SimpleSidebar } from '@/components/alerts/SimpleSidebar';
import { Percent, PieChart, BarChart, LineChart, Calendar, Download, RefreshCw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h1>
              <p className="text-gray-500">
                Cook County property market insights and trend analysis
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span>Q2 2023</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Property Price</CardTitle>
                  <CardDescription>Cook County</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1.25M</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <Percent className="h-3 w-3 mr-1" />
                    <span>+4.3% YoY</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
                  <CardDescription>Last quarter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">324</div>
                  <div className="text-xs text-red-500 flex items-center mt-1">
                    <Percent className="h-3 w-3 mr-1" />
                    <span>-2.1% QoQ</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Market Liquidity</CardTitle>
                  <CardDescription>Days on market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">43 days</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <Percent className="h-3 w-3 mr-1" />
                    <span>-5 days from previous quarter</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="market" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-4">
                <TabsTrigger value="market">Market Trends</TabsTrigger>
                <TabsTrigger value="properties">Property Analysis</TabsTrigger>
                <TabsTrigger value="geography">Geographic</TabsTrigger>
              </TabsList>
              
              <TabsContent value="market" className="mt-0">
                <Card className="mb-4">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Price Trends</CardTitle>
                        <CardDescription>Historical price changes by property type</CardDescription>
                      </div>
                      <Select defaultValue="quarterly">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <LineChart className="h-16 w-16 mb-4 opacity-30" />
                      <p>Price trend analysis visualization</p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction Volume</CardTitle>
                      <CardDescription>Monthly sales count</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] flex items-center justify-center">
                      <div className="flex flex-col items-center text-muted-foreground">
                        <BarChart className="h-16 w-16 mb-4 opacity-30" />
                        <p>Transaction volume chart</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Type Distribution</CardTitle>
                      <CardDescription>By transaction value</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] flex items-center justify-center">
                      <div className="flex flex-col items-center text-muted-foreground">
                        <PieChart className="h-16 w-16 mb-4 opacity-30" />
                        <p>Property type distribution chart</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="properties" className="mt-0">
                <div className="flex items-center justify-center h-[300px] text-muted-foreground border rounded-lg">
                  <div className="flex flex-col items-center">
                    <BarChart className="h-12 w-12 mb-4 opacity-20" />
                    <p>Property analysis visualizations will appear here</p>
                    <p className="text-sm mt-1">Select property types and metrics to analyze</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="geography" className="mt-0">
                <div className="flex items-center justify-center h-[300px] text-muted-foreground border rounded-lg">
                  <div className="flex flex-col items-center">
                    <PieChart className="h-12 w-12 mb-4 opacity-20" />
                    <p>Geographic analysis visualizations will appear here</p>
                    <p className="text-sm mt-1">View neighborhood comparisons and heat maps</p>
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

export default AnalyticsPage;