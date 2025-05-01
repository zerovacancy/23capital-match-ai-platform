import React from 'react';
import { SimpleSidebar } from '@/components/alerts/SimpleSidebar';
import { Users, Search, Filter, PlusCircle, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InvestorsPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Investors</h1>
              <p className="text-gray-500">
                Manage investor relationships and match opportunities
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              
              <Button size="sm" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add Investor</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search investors by name, type, or preference..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-4">
                <TabsTrigger value="active">Active (24)</TabsTrigger>
                <TabsTrigger value="potential">Potential (8)</TabsTrigger>
                <TabsTrigger value="archived">Archived (3)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-0">
                <Card className="mb-4">
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Active Investors</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <span>Sort by: Recent Activity</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 border-b bg-muted/50 p-2 text-sm font-medium">
                        <div className="flex items-center">
                          <span>Name</span>
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                        <div>Type</div>
                        <div>Asset Preferences</div>
                        <div>AUM</div>
                        <div>Last Contact</div>
                      </div>
                      
                      {[
                        {
                          name: "Sequoia Capital",
                          type: "Institutional",
                          typeColor: "blue",
                          preferences: ["Multifamily", "Office"],
                          aum: "$8.9B",
                          lastContact: "3 days ago"
                        },
                        {
                          name: "Blackstone Group",
                          type: "Private Equity",
                          typeColor: "indigo",
                          preferences: ["Commercial", "Industrial"],
                          aum: "$12.4B",
                          lastContact: "Yesterday"
                        },
                        {
                          name: "Brookfield Asset Management",
                          type: "Institutional",
                          typeColor: "blue",
                          preferences: ["Retail", "Office"],
                          aum: "$6.7B",
                          lastContact: "1 week ago"
                        },
                        {
                          name: "LaSalle Investment",
                          type: "REIT",
                          typeColor: "green",
                          preferences: ["Residential", "Mixed Use"],
                          aum: "$4.2B",
                          lastContact: "2 days ago"
                        },
                        {
                          name: "Lincoln Property Company",
                          type: "Developer",
                          typeColor: "amber",
                          preferences: ["Multifamily", "Commercial"],
                          aum: "$3.8B",
                          lastContact: "5 days ago"
                        }
                      ].map((investor, index) => (
                        <div 
                          key={index} 
                          className="grid grid-cols-5 p-3 hover:bg-muted/50 border-b last:border-0 cursor-pointer"
                        >
                          <div className="font-medium">{investor.name}</div>
                          <div>
                            <Badge 
                              variant="outline" 
                              className={investor.typeColor === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                         investor.typeColor === "indigo" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                                         investor.typeColor === "green" ? "bg-green-50 text-green-700 border-green-200" :
                                         investor.typeColor === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                         "bg-gray-50 text-gray-700 border-gray-200"}
                            >
                              {investor.type}
                            </Badge>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {investor.preferences.map((pref, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{pref}</Badge>
                            ))}
                          </div>
                          <div>{investor.aum}</div>
                          <div className="text-sm text-muted-foreground">{investor.lastContact}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" size="sm">Load More</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="potential" className="mt-0">
                <div className="flex items-center justify-center h-[300px] text-muted-foreground border rounded-lg">
                  <div className="flex flex-col items-center">
                    <Users className="h-12 w-12 mb-4 opacity-20" />
                    <p>Potential investors will appear here</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="archived" className="mt-0">
                <div className="flex items-center justify-center h-[300px] text-muted-foreground border rounded-lg">
                  <div className="flex flex-col items-center">
                    <Users className="h-12 w-12 mb-4 opacity-20" />
                    <p>Archived investors will appear here</p>
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

export default InvestorsPage;