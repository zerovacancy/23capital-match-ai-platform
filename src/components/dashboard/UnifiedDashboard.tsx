import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, LineChart, ChevronRight, Filter, Building, Users, ArrowRight, Maximize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CapitalProgressCard } from './CapitalProgressCard';
import { CapitalSourceChart } from './CapitalSourceChart';
import { MonthlyProgressChart } from './MonthlyProgressChart';
import { capitalRaiseMetrics } from '@/data/capitalRaise';
import { lps } from '@/data/lps';
import { deals } from '@/data/deals';
import { matches } from '@/data/matches';
import { LPProfileCard } from '../lp-profile/LPProfileCard';
import { DealCard } from '../deal-analyzer/DealCard';
import { MatchCard } from '../matching-engine/MatchCard';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";

// Import analytics components
import { AnalyticsDashboard } from './analytics';
import { AnalyticsProvider } from '@/context/AnalyticsContext';

// Import simplified relationships dashboard
import SimpleRelationshipsDashboard from './relationships/SimpleRelationshipsDashboard';

interface DashboardSummaryProps {
  title: string;
  value: string | number;
  description: string;
  change: number;
  icon: React.ReactNode;
}

const DashboardSummary = ({ title, value, description, change, icon }: DashboardSummaryProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="h-5 w-5 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <div className={cn(
          "text-xs mt-2 flex items-center font-medium",
          change > 0 ? "text-green-500" : "text-red-500"
        )}>
          {change > 0 ? "+" : ""}{change}% from last month
        </div>
      </CardContent>
    </Card>
  );
};

export function UnifiedDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedLP, setSelectedLP] = useState(lps[0]);
  const [selectedDeal, setSelectedDeal] = useState(deals[0]);
  
  // Top 3 LPs by commitment size
  const topLPs = [...lps].sort((a, b) => ((b as any).commitmentSize || 0) - ((a as any).commitmentSize || 0)).slice(0, 3);
  
  // Top 3 deals by match score
  const topDeals = [...deals].sort((a, b) => ((b as any).matchScore || 0) - ((a as any).matchScore || 0)).slice(0, 3);
  
  // Most recent matches
  const recentMatches = [...matches].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <div className="bg-card rounded-lg border shadow-sm flex flex-col h-full w-full">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="h2">LG Development Capital Match</h2>
          <p className="text-muted-foreground max-w-xl">Unified view of capital raising activities</p>
        </div>
      </div>
      
      <Tabs value={activeSection} onValueChange={setActiveSection} className="flex-1">
        <div className="px-6 pt-6 pb-2">
          <TabsList className="w-full flex justify-end">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="px-6 py-6 overflow-auto flex-1">
          <TabsContent value="overview" className="mt-0 space-y-6 h-full">
            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-full flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <div className="p-2 bg-[#F8F5F0] rounded-md flex-shrink-0">
                    <PieChart className="h-5 w-5 text-[#275E91]" />
                  </div>
                  <span className="text-sm font-medium text-green-600">+8.3%</span>
                </div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Capital Raised</h4>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900 mr-2">$42M</span>
                  <span className="text-sm text-gray-500">of $150M target</span>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#275E91] h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
                <p className="mt-2 text-xs text-gray-500">28% of fundraising goal achieved</p>
              </div>
              
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-full flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <div className="p-2 bg-[#F8F5F0] rounded-md flex-shrink-0">
                    <Users className="h-5 w-5 text-[#275E91]" />
                  </div>
                  <span className="text-sm font-medium text-green-600">+12.5%</span>
                </div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Active LPs</h4>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900 mr-2">{lps.length}</span>
                  <span className="text-sm text-gray-500">investor relationships</span>
                </div>
                <div className="relative mt-4 flex items-center">
                  <div className="relative z-10 w-6 h-6 rounded-full overflow-hidden border-2 border-white">
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                  <div className="relative z-20 -ml-2 w-6 h-6 rounded-full overflow-hidden border-2 border-white">
                    <div className="w-full h-full bg-gray-400"></div>
                  </div>
                  <div className="relative z-30 -ml-2 w-6 h-6 rounded-full overflow-hidden border-2 border-white">
                    <div className="w-full h-full bg-gray-500"></div>
                  </div>
                  <div className="relative z-40 -ml-2 w-6 h-6 flex items-center justify-center rounded-full border-2 border-white bg-[#F8F5F0] text-xs font-medium text-[#275E91]">
                    +{lps.length - 3}
                  </div>
                </div>
                <p className="mt-auto pt-3 text-xs text-gray-500">5 top LPs provide 60% of capital</p>
              </div>
              
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-full flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <div className="p-2 bg-[#F8F5F0] rounded-md flex-shrink-0">
                    <Building className="h-5 w-5 text-[#275E91]" />
                  </div>
                  <span className="text-sm font-medium text-green-600">+5.2%</span>
                </div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Deal Pipeline</h4>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900 mr-2">{deals.length}</span>
                  <span className="text-sm text-gray-500">active opportunities</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-1">
                  <div className="h-2 bg-gray-200 rounded-l-full">
                    <div className="h-2 bg-[#275E91] rounded-l-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="h-2 bg-gray-200">
                    <div className="h-2 bg-[#275E91]" style={{ width: '60%' }}></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-r-full">
                    <div className="h-2 bg-[#275E91] rounded-r-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <p className="mt-auto pt-3 text-xs text-gray-500">3 deals in final stage requiring attention</p>
              </div>
            </div>
            
            {/* Activity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Top Investors Panel */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="p-2 bg-[#F8F5F0] rounded-md mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Top Investors</h4>
                      <p className="text-sm text-gray-500">By commitment size</p>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-[#275E91] transition-colors duration-200" 
                              title="View in fullscreen">
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          Top Investors
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[calc(80vh-120px)] pr-4 mt-4">
                        <div className="space-y-3">
                          {lps.map(lp => (
                            <LPProfileCard
                              key={lp.id}
                              lp={lp}
                              selected={lp.id === selectedLP.id}
                              onClick={() => setSelectedLP(lp)}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="relative bg-white">
                  <div className="absolute top-0 right-0 left-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
                  <ScrollArea className="h-[240px] scrollbar-thin">
                    <div className="p-4 space-y-3">
                      {topLPs.map(lp => (
                        <LPProfileCard
                          key={lp.id}
                          lp={lp}
                          selected={false}
                          onClick={() => setSelectedLP(lp)}
                        />
                      ))}
                      <Button variant="outline" size="sm" className="w-full mt-3 border-gray-200 text-[#275E91] hover:bg-[#F8F5F0]">
                        View all investors
                        <ChevronRight className="h-3 w-3 ml-auto" />
                      </Button>
                    </div>
                  </ScrollArea>
                  <div className="absolute bottom-0 right-0 left-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none flex items-end justify-center pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 animate-bounce-subtle">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Top Deals Panel */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="p-2 bg-[#F8F5F0] rounded-md mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Top Deals</h4>
                      <p className="text-sm text-gray-500">By match probability</p>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-[#275E91] transition-colors duration-200" 
                              title="View in fullscreen">
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          Top Deals
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[calc(80vh-120px)] pr-4 mt-4">
                        <div className="space-y-3">
                          {deals.map(deal => (
                            <DealCard
                              key={deal.id}
                              deal={deal}
                              selected={deal.id === selectedDeal.id}
                              onClick={() => setSelectedDeal(deal)}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="relative bg-white">
                  <div className="absolute top-0 right-0 left-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
                  <ScrollArea className="h-[240px] scrollbar-thin">
                    <div className="p-4 space-y-3">
                      {topDeals.map(deal => (
                        <DealCard
                          key={deal.id}
                          deal={deal}
                          selected={false}
                          onClick={() => setSelectedDeal(deal)}
                        />
                      ))}
                      <Button variant="outline" size="sm" className="w-full mt-3 border-gray-200 text-[#275E91] hover:bg-[#F8F5F0]">
                        View all deals
                        <ChevronRight className="h-3 w-3 ml-auto" />
                      </Button>
                    </div>
                  </ScrollArea>
                  <div className="absolute bottom-0 right-0 left-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none flex items-end justify-center pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 animate-bounce-subtle">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Recent Matches Panel */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="p-2 bg-[#F8F5F0] rounded-md mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Recent Matches</h4>
                      <p className="text-sm text-gray-500">Investor-deal pairings</p>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-[#275E91] transition-colors duration-200" 
                              title="View in fullscreen">
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                          </svg>
                          Recent Matches
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[calc(80vh-120px)] pr-4 mt-4">
                        <div className="space-y-3">
                          {matches.map(match => (
                            <MatchCard
                              key={match.id}
                              match={match}
                              selected={false}
                              onClick={() => {}}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="relative bg-white">
                  <div className="absolute top-0 right-0 left-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
                  <ScrollArea className="h-[240px] scrollbar-thin">
                    <div className="p-4 space-y-3">
                      {recentMatches.map(match => (
                        <MatchCard
                          key={match.id}
                          match={match}
                          selected={false}
                          onClick={() => {}}
                        />
                      ))}
                      <Button variant="outline" size="sm" className="w-full mt-3 border-gray-200 text-[#275E91] hover:bg-[#F8F5F0]">
                        View all matches
                        <ChevronRight className="h-3 w-3 ml-auto" />
                      </Button>
                    </div>
                  </ScrollArea>
                  <div className="absolute bottom-0 right-0 left-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none flex items-end justify-center pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 animate-bounce-subtle">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Data Visualization Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:grid-rows-1">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden h-full flex flex-col">
                <div className="p-4 border-b border-gray-100">
                  <h4 className="text-base font-medium text-gray-900 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    Capital Progress
                  </h4>
                  <p className="text-sm text-gray-500">Tracking fundraising goals</p>
                </div>
                <div className="p-4 flex-1">
                  <CapitalProgressCard metrics={capitalRaiseMetrics} />
                </div>
              </div>
              
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden h-full flex flex-col">
                <div className="p-4 border-b border-gray-100">
                  <h4 className="text-base font-medium text-gray-900 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    Capital Sources
                  </h4>
                  <p className="text-sm text-gray-500">By investor type and commitment status</p>
                </div>
                <div className="p-4 flex-1">
                  <CapitalSourceChart />
                </div>
              </div>
            </div>
            
            {/* Monthly Progress Chart */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h4 className="text-base font-medium text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6" y2="6"></line>
                    <line x1="6" y1="18" x2="6" y2="18"></line>
                  </svg>
                  Monthly Capital Raise Progress
                </h4>
                <p className="text-sm text-gray-500">Target vs. actual monthly capital velocity</p>
              </div>
              <div className="p-4">
                <MonthlyProgressChart />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0">
            <AnalyticsProvider>
              <AnalyticsDashboard />
            </AnalyticsProvider>
          </TabsContent>
          
          <TabsContent value="relationships" className="mt-0">
            <SimpleRelationshipsDashboard />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}