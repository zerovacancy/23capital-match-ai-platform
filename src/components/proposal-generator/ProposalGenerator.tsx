import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Table, BarChart, Check, X, ArrowRight, ChevronRight, Maximize2, Eye, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Sample property data
const properties = [
  {
    id: 1,
    name: "The Apex at River North",
    location: "Chicago, IL",
    type: "Mixed-Use",
    units: 235,
    irr: 18.3,
    multiple: 2.1,
    tdc: 65.4,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    name: "Nashville BTR Portfolio",
    location: "Nashville, TN",
    type: "Build-to-Rent",
    units: 180,
    irr: 16.8,
    multiple: 1.9,
    tdc: 42.7,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
  },
  {
    id: 3,
    name: "Chicago South Loop Mixed-Use",
    location: "Chicago, IL",
    type: "Mixed-Use",
    units: 320,
    irr: 17.5,
    multiple: 2.3,
    tdc: 78.2,
    image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    name: "Cincinnati Urban Renewal",
    location: "Cincinnati, OH",
    type: "Mid-Rise Multifamily",
    units: 140,
    irr: 15.9,
    multiple: 1.8,
    tdc: 38.6,
    image: "https://images.unsplash.com/photo-1596446391793-3c7dc525aa5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  }
];

// Sample recent proposals
const recentProposals = [
  {
    id: 1,
    propertyId: 1,
    name: "The Apex at River North",
    date: "3 days ago",
    format: "PDF"
  },
  {
    id: 2,
    propertyId: 2,
    name: "Nashville BTR Portfolio",
    date: "1 week ago",
    format: "Excel"
  }
];

export const ProposalGenerator: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<number>(1);
  const [selectedFormat, setSelectedFormat] = useState<string>("PDF");
  const [sections, setSections] = useState({
    executiveSummary: true,
    financialProjections: true,
    marketAnalysis: true,
    competitiveAnalysis: true,
    dealStructure: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState<any>(null);
  const [openFullPreview, setOpenFullPreview] = useState(false);
  
  // Get the selected property data
  const property = properties.find(p => p.id === selectedProperty) || properties[0];
  
  // Handle generate button click
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate generation with a delay
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedProposal(property);
    }, 1500);
  };
  
  // Handle section toggle
  const toggleSection = (section: string) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };
  
  // View a recent proposal
  const viewRecentProposal = (proposalId: number) => {
    const proposal = recentProposals.find(p => p.id === proposalId);
    if (proposal) {
      const property = properties.find(p => p.id === proposal.propertyId);
      setGeneratedProposal(property);
    }
  };
  
  return (
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
                  <select 
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(Number(e.target.value))}
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.location})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium text-sm text-gray-700">Output Format</div>
                  <div className="flex space-x-2">
                    <Button
                      variant={selectedFormat === "PDF" ? "default" : "outline"}
                      className={selectedFormat === "PDF" ? "bg-[#275E91]" : ""}
                      size="sm"
                      onClick={() => setSelectedFormat("PDF")}
                    >
                      <FileText className="h-4 w-4 mr-1" /> PDF
                    </Button>
                    <Button
                      variant={selectedFormat === "Excel" ? "default" : "outline"}
                      className={selectedFormat === "Excel" ? "bg-[#275E91]" : ""}
                      size="sm"
                      onClick={() => setSelectedFormat("Excel")}
                    >
                      <Table className="h-4 w-4 mr-1" /> Excel
                    </Button>
                    <Button
                      variant={selectedFormat === "PPT" ? "default" : "outline"}
                      className={selectedFormat === "PPT" ? "bg-[#275E91]" : ""}
                      size="sm"
                      onClick={() => setSelectedFormat("PPT")}
                    >
                      <BarChart className="h-4 w-4 mr-1" /> PPT
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium text-sm text-gray-700">Include Sections</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="exec-summary" 
                        className="h-4 w-4 text-[#275E91] border-gray-300 rounded"
                        checked={sections.executiveSummary}
                        onChange={() => toggleSection('executiveSummary')}
                      />
                      <label htmlFor="exec-summary" className="ml-2 text-sm">Executive Summary</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="financials" 
                        className="h-4 w-4 text-[#275E91] border-gray-300 rounded"
                        checked={sections.financialProjections}
                        onChange={() => toggleSection('financialProjections')}
                      />
                      <label htmlFor="financials" className="ml-2 text-sm">Financial Projections</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="market" 
                        className="h-4 w-4 text-[#275E91] border-gray-300 rounded"
                        checked={sections.marketAnalysis}
                        onChange={() => toggleSection('marketAnalysis')}
                      />
                      <label htmlFor="market" className="ml-2 text-sm">Market Analysis</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="competitive" 
                        className="h-4 w-4 text-[#275E91] border-gray-300 rounded"
                        checked={sections.competitiveAnalysis}
                        onChange={() => toggleSection('competitiveAnalysis')}
                      />
                      <label htmlFor="competitive" className="ml-2 text-sm">Competitive Analysis</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="structure" 
                        className="h-4 w-4 text-[#275E91] border-gray-300 rounded"
                        checked={sections.dealStructure}
                        onChange={() => toggleSection('dealStructure')}
                      />
                      <label htmlFor="structure" className="ml-2 text-sm">Deal Structure</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                className="w-full bg-[#275E91]" 
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Proposal <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Recent Proposals</CardTitle>
              <CardDescription>Previously generated proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentProposals.map((proposal) => (
                  <div key={proposal.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div>
                      <div className="font-medium text-sm">{proposal.name}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {proposal.date}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{proposal.format}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewRecentProposal(proposal.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Pro Forma Features</CardTitle>
              <CardDescription>Intelligent financial projections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>10-year cashflow projections</span>
                </div>
                <div className="flex">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Market-based capitalization rates</span>
                </div>
                <div className="flex">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>IRR, NPV, cash-on-cash calculations</span>
                </div>
                <div className="flex">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Sensitivity analysis with parameters</span>
                </div>
                <div className="flex">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Capital stack visualization</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Example Output Preview */}
        <div className="md:col-span-7">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base font-medium">Example Output</CardTitle>
                  <CardDescription>Preview of the generated proposal</CardDescription>
                </div>
                <Dialog open={openFullPreview} onOpenChange={setOpenFullPreview}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" disabled={!generatedProposal}>
                      <Maximize2 className="h-4 w-4 mr-1" /> Full Preview
                    </Button>
                  </DialogTrigger>
                  {generatedProposal && (
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{generatedProposal.name} - Investment Proposal</DialogTitle>
                      </DialogHeader>
                      <div className="p-4">
                        {/* Full preview content would go here */}
                        <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                          <div className="text-center p-6">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">Full proposal preview would be displayed here</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-76px)] overflow-hidden">
              {generatedProposal ? (
                <div className="h-full flex flex-col">
                  {/* Property header */}
                  <div className="relative h-40 overflow-hidden rounded-t-md mb-4">
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${generatedProposal.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{generatedProposal.name}</h3>
                      <p className="text-sm opacity-90">{generatedProposal.location} · {generatedProposal.type}</p>
                    </div>
                  </div>
                  
                  {/* Key metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">Projected IRR</div>
                      <div className="text-xl font-bold text-[#275E91]">{generatedProposal.irr}%</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">Equity Multiple</div>
                      <div className="text-xl font-bold text-[#275E91]">{generatedProposal.multiple}x</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">TDC (M)</div>
                      <div className="text-xl font-bold text-[#275E91]">${generatedProposal.tdc}M</div>
                    </div>
                  </div>
                  
                  {/* Document preview */}
                  <div className="bg-gray-50 rounded-md p-4 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-medium">Document Preview</div>
                      <div className="text-xs text-gray-500">
                        {selectedFormat} Format · {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <ScrollArea className="h-[calc(100%-32px)]">
                      <div className="space-y-3">
                        {sections.executiveSummary && (
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <div className="text-sm font-medium mb-1">Executive Summary</div>
                            <div className="h-20 bg-gray-100 rounded-sm animate-pulse"></div>
                          </div>
                        )}
                        {sections.financialProjections && (
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <div className="text-sm font-medium mb-1">Financial Projections</div>
                            <div className="h-32 bg-gray-100 rounded-sm animate-pulse"></div>
                          </div>
                        )}
                        {sections.marketAnalysis && (
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <div className="text-sm font-medium mb-1">Market Analysis</div>
                            <div className="h-24 bg-gray-100 rounded-sm animate-pulse"></div>
                          </div>
                        )}
                        {sections.competitiveAnalysis && (
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <div className="text-sm font-medium mb-1">Competitive Analysis</div>
                            <div className="h-24 bg-gray-100 rounded-sm animate-pulse"></div>
                          </div>
                        )}
                        {sections.dealStructure && (
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <div className="text-sm font-medium mb-1">Deal Structure</div>
                            <div className="h-24 bg-gray-100 rounded-sm animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button className="bg-[#275E91]" size="sm">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-md">
                  <div className="text-center p-6">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-1">No proposal generated yet</p>
                    <p className="text-xs text-gray-400">Configure and generate a proposal using the panel on the left</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};