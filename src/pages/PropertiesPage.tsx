import React from 'react';
import { SimpleSidebar } from '@/components/alerts/SimpleSidebar';
import { Building, Search, Filter, MapPin, DollarSign, ArrowUpDown, AlertCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PropertiesPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Properties</h1>
              <p className="text-gray-500">
                Cook County property inventory and opportunity tracking
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                <span>Map View</span>
              </Button>
              
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search properties by address, neighborhood, PIN..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <Tabs defaultValue="opportunities" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-4">
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                <TabsTrigger value="all">All Properties</TabsTrigger>
              </TabsList>
              
              <TabsContent value="opportunities" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({length: 6}).map((_, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-md cursor-pointer transition-shadow">
                      <div className="h-40 bg-muted flex items-center justify-center">
                        <Building className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-base">123 Lincoln Park Way</h3>
                          <Badge className="bg-red-100 text-red-800">High</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          <span>Lincoln Park, Chicago</span>
                        </div>
                        <div className="flex justify-between items-center mt-3 text-sm">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span className="font-medium">$2,450,000</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 mr-1" />
                            <span>92 Score</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="watchlist" className="mt-0">
                <Card className="mb-4">
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Property Watchlist</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <span>Sort by</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 border-b bg-muted/50 p-2 text-sm font-medium">
                        <div className="flex items-center">
                          <span>Address</span>
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                        <div>Type</div>
                        <div>Status</div>
                        <div>Price</div>
                        <div>Added</div>
                      </div>
                      
                      {Array.from({length: 5}).map((_, index) => (
                        <div 
                          key={index} 
                          className="grid grid-cols-5 p-3 hover:bg-muted/50 border-b last:border-0 cursor-pointer"
                        >
                          <div className="font-medium">456 West Loop Ave</div>
                          <div>Commercial</div>
                          <div>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              For Sale
                            </Badge>
                          </div>
                          <div>$3,200,000</div>
                          <div className="text-sm text-muted-foreground">2 weeks ago</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="all" className="mt-0">
                <div className="flex items-center justify-center h-[300px] text-muted-foreground border rounded-lg">
                  <div className="flex flex-col items-center">
                    <AlertCircle className="h-12 w-12 mb-4 opacity-20" />
                    <p>This feature requires a database connection</p>
                    <p className="text-sm mt-1">Connect to Cook County property database to view all properties</p>
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

export default PropertiesPage;