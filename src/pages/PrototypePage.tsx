import React, { useState, createContext, useContext } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LPProfileEngine } from '@/components/lp-profile';
import { DealAnalyzer } from '@/components/deal-analyzer';
import { MatchingEngine } from '@/components/matching-engine';
import { Dashboard } from '@/components/dashboard';
import Header from '@/components/Header';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, Table, BarChart } from 'lucide-react';

// Create a context to share the tab state
export const TabContext = createContext({
  activeTab: "dashboard",
  setActiveTab: (tab: string) => {}
});

const PrototypePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const getActiveTabLabel = () => {
    const tabLabels: Record<string, string> = {
      "dashboard": "Dashboard",
      "lp-profiles": "LP Profiles",
      "deal-analyzer": "Smart Deal Sourcing",
      "matching-engine": "LP Match + Personalized Outreach",
      "proposal-generator": "Proposal + Pro Forma Generator"
    };
    return tabLabels[activeTab] || "";
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="min-h-screen h-full flex flex-col bg-[#F8F5F0]/30">
        <Header />
        <BreadcrumbNav extraItems={[{ label: getActiveTabLabel() }]} />
        <div className="container mx-auto px-4 pb-8 pt-4 flex-1 flex flex-col">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-[#F8F5F0] rounded-md mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Capital Match AI Platform</h1>
              <p className="text-gray-500">AI-powered intelligence for real estate capital, development & design</p>
            </div>
          </div>
          
          <Tabs 
            defaultValue="dashboard" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col"
          >
            <div className="bg-white p-1 rounded-lg border border-gray-200 mb-6 inline-block">
              <TabsList className="grid grid-cols-5 relative z-20 bg-transparent">
                <TabsTrigger 
                  value="dashboard" 
                  data-value="dashboard"
                  className="data-[state=active]:bg-[#F8F5F0] data-[state=active]:text-[#275E91] hover:text-[#275E91] data-[state=active]:border-0 data-[state=active]:shadow-sm px-4"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="lp-profiles" 
                  data-value="lp-profiles"
                  className="data-[state=active]:bg-[#F8F5F0] data-[state=active]:text-[#275E91] hover:text-[#275E91] data-[state=active]:border-0 data-[state=active]:shadow-sm px-4"
                >
                  LP Profiles
                </TabsTrigger>
                <TabsTrigger 
                  value="deal-analyzer" 
                  data-value="deal-analyzer"
                  className="data-[state=active]:bg-[#F8F5F0] data-[state=active]:text-[#275E91] hover:text-[#275E91] data-[state=active]:border-0 data-[state=active]:shadow-sm px-4"
                >
                  Smart Deal Sourcing
                </TabsTrigger>
                <TabsTrigger 
                  value="matching-engine" 
                  data-value="matching-engine"
                  className="data-[state=active]:bg-[#F8F5F0] data-[state=active]:text-[#275E91] hover:text-[#275E91] data-[state=active]:border-0 data-[state=active]:shadow-sm px-4"
                >
                  LP Match + Outreach
                </TabsTrigger>
                <TabsTrigger 
                  value="proposal-generator" 
                  data-value="proposal-generator"
                  className="data-[state=active]:bg-[#F8F5F0] data-[state=active]:text-[#275E91] hover:text-[#275E91] data-[state=active]:border-0 data-[state=active]:shadow-sm px-4"
                >
                  Proposal + Pro Forma
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="flex-1">
              <Dashboard />
            </TabsContent>
            
            <TabsContent value="lp-profiles" className="flex-1">
              <LPProfileEngine />
            </TabsContent>
            
            <TabsContent value="deal-analyzer" className="flex-1">
              <DealAnalyzer />
            </TabsContent>
            
            <TabsContent value="matching-engine" className="flex-1">
              <MatchingEngine />
            </TabsContent>

            <TabsContent value="proposal-generator" className="flex-1">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center mb-1">
                    <div className="p-2 bg-[#F8F5F0] rounded-md mr-3">
                      <FileText className="h-5 w-5 text-[#275E91]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Proposal + Pro Forma Generator</h2>
                      <p className="text-gray-500">Auto-generate pro formas, investment summaries, and LP-ready proposals based on structured deal data and investor criteria.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                  {/* Main control panel */}
                  <div className="md:col-span-5 space-y-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium">Generate Investment Proposal</CardTitle>
                        <CardDescription>Generate a new proposal with AI assistance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <div className="font-medium text-sm text-gray-700">Select Property</div>
                            <select className="w-full p-2 border border-gray-200 rounded-md focus:border-[#275E91] focus:outline-none focus:ring-1 focus:ring-[#275E91]">
                              <option>The Apex at River North</option>
                              <option>Nashville BTR Portfolio</option>
                              <option>Chicago South Loop Mixed-Use</option>
                              <option>Cincinnati Urban Renewal</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="font-medium text-sm text-gray-700">Select Output Format</div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="border border-[#275E91] rounded-md p-2 flex flex-col items-center bg-[#F8F5F0] text-[#275E91]">
                                <FileText className="h-5 w-5 mb-1" />
                                <span className="text-xs font-medium">PDF</span>
                              </div>
                              <div className="border border-gray-200 rounded-md p-2 flex flex-col items-center text-gray-500">
                                <Table className="h-5 w-5 mb-1" />
                                <span className="text-xs font-medium">Excel</span>
                              </div>
                              <div className="border border-gray-200 rounded-md p-2 flex flex-col items-center text-gray-500">
                                <BarChart className="h-5 w-5 mb-1" />
                                <span className="text-xs font-medium">Slides</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="font-medium text-sm text-gray-700">Proposal Sections</div>
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-[#275E91]" checked readOnly />
                                <span className="text-sm">Executive Summary</span>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-[#275E91]" checked readOnly />
                                <span className="text-sm">Financial Projections</span>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-[#275E91]" checked readOnly />
                                <span className="text-sm">Market Analysis</span>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-[#275E91]" checked readOnly />
                                <span className="text-sm">Competitive Analysis</span>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-[#275E91]" checked readOnly />
                                <span className="text-sm">Deal Structure</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center pt-2">
                        <Button className="bg-[#275E91] hover:bg-[#1d4b77] text-white w-full">
                          <FileText className="mr-2 h-4 w-4" />
                          Generate Investment Proposal
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium">Recent Proposals</CardTitle>
                        <CardDescription>Previously generated materials</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center p-2 hover:bg-gray-50 rounded-md border border-gray-100">
                          <FileText className="h-5 w-5 text-[#275E91] mr-3" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">The Apex at River North</div>
                            <div className="text-xs text-gray-500">Generated 3 days ago</div>
                          </div>
                          <Button variant="outline" size="sm" className="text-[#275E91] border-[#275E91]">View</Button>
                        </div>
                        <div className="flex items-center p-2 hover:bg-gray-50 rounded-md border border-gray-100">
                          <FileText className="h-5 w-5 text-[#275E91] mr-3" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">Nashville BTR Portfolio</div>
                            <div className="text-xs text-gray-500">Generated 1 week ago</div>
                          </div>
                          <Button variant="outline" size="sm" className="text-[#275E91] border-[#275E91]">View</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Example Output Section */}
                  <div className="md:col-span-7 flex flex-col space-y-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Example Output: Auto-Generated Proposal</h3>
                      
                      <div className="rounded-lg border border-gray-200 overflow-hidden mb-4">
                        <div className="bg-[#275E91] p-3 text-white font-medium text-center">
                          The Apex at River North
                        </div>
                        <div className="p-4 bg-white">
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-[#F8F5F0] p-3 rounded-md text-center">
                              <div className="text-xs text-gray-500 mb-1">IRR</div>
                              <div className="text-lg font-bold text-[#275E91]">18.3%</div>
                            </div>
                            <div className="bg-[#F8F5F0] p-3 rounded-md text-center">
                              <div className="text-xs text-gray-500 mb-1">TDC</div>
                              <div className="text-lg font-bold text-[#275E91]">$65.4M</div>
                            </div>
                            <div className="bg-[#F8F5F0] p-3 rounded-md text-center">
                              <div className="text-xs text-gray-500 mb-1">Equity Multiple</div>
                              <div className="text-lg font-bold text-[#275E91]">2.1x</div>
                            </div>
                          </div>
                          
                          <div className="h-[200px] bg-gray-100 flex items-center justify-center mb-4 rounded-md">
                            <div className="flex flex-col items-center">
                              <BarChart className="h-10 w-10 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-500">Projected Returns Chart</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-4/5"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                          </div>
                          
                          <div className="text-center text-xs text-gray-500">
                            LG Development | Capital Match AI Platform
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-center">
                        <Button className="bg-[#275E91] hover:bg-[#1d4b77] text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Download Sample
                        </Button>
                        <Button variant="outline" className="border-[#275E91] text-[#275E91]">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Full Example
                        </Button>
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium">Pro Forma Features</CardTitle>
                        <CardDescription>Financial projection capabilities</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="p-1 bg-[#F8F5F0] rounded-full mr-2 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <div className="text-sm">Dynamic scenario modeling with adjustable parameters</div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-1 bg-[#F8F5F0] rounded-full mr-2 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <div className="text-sm">Customizable outputs tailored to LP preferences</div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-1 bg-[#F8F5F0] rounded-full mr-2 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <div className="text-sm">Integration with deal data and financial assumptions</div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-1 bg-[#F8F5F0] rounded-full mr-2 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <div className="text-sm">Auto-formatting and professionally designed templates</div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-1 bg-[#F8F5F0] rounded-full mr-2 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <div className="text-sm">Multi-format export (PDF, Excel, PowerPoint)</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TabContext.Provider>
  );
};

export default PrototypePage;