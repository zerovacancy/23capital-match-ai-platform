import React from 'react';
import { SimpleSidebar } from '@/components/alerts/SimpleSidebar';
import { PieChart, BarChart, Activity, RefreshCw, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Capital Match Dashboard</h1>
              <p className="text-gray-500">
                Property acquisition intelligence and market overview
              </p>
            </div>
            
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
                <CardDescription>Current month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Property Opportunities</CardTitle>
                <CardDescription>Active high-scoring properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>+5 new today</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Market Trends</CardTitle>
                <CardDescription>Cook County overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+3.2%</div>
                <div className="text-xs text-blue-500 flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Last quarter trends</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Deal Activity</CardTitle>
                <CardDescription>Monthly acquisition analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground">
                  <BarChart className="h-16 w-16 mb-4 opacity-30" />
                  <p>Monthly acquisition data visualization</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Property Types</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground">
                  <PieChart className="h-16 w-16 mb-4 opacity-30" />
                  <p>Property type distribution</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;