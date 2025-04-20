import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// MCP-enabled components
import { MCPVisualizer } from '@/components/matching-engine/match-path-visualizer';
import { MCPMarketComparison } from '@/components/deal-analyzer/market-comparison';

// Data Imports
import { deals } from '@/data/deals';
import { lps } from '@/data/lps';
import { matches } from '@/data/matches';

export function PrototypeExample() {
  const [selectedDealId, setSelectedDealId] = useState(deals[0].id);
  const [selectedLPId, setSelectedLPId] = useState(lps[0].id);
  const [activeTab, setActiveTab] = useState("matching");
  
  // Find selected entities
  const selectedDeal = deals.find(deal => deal.id === selectedDealId) || deals[0];
  const selectedLP = lps.find(lp => lp.id === selectedLPId) || lps[0];
  
  // Find match between selected LP and deal
  const match = matches.find(
    m => m.dealId === selectedDealId && m.lpId === selectedLPId
  ) || matches[0];
  
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="bg-[#ECEDE3] border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl text-lg-text">AI Platform Prototype</CardTitle>
            <CardDescription className="text-lg-text/80">
              Demonstrating Model Context Protocol (MCP) Implementation
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            MCP-Enabled Demo
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Selection Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-md border">
            <div>
              <Label htmlFor="deal-select" className="text-sm font-medium mb-2 block">
                Select Deal
              </Label>
              <Select
                value={selectedDealId}
                onValueChange={setSelectedDealId}
              >
                <SelectTrigger id="deal-select" className="w-full">
                  <SelectValue placeholder="Select a deal" />
                </SelectTrigger>
                <SelectContent>
                  {deals.map(deal => (
                    <SelectItem key={deal.id} value={deal.id}>
                      {deal.name} ({deal.location})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="lp-select" className="text-sm font-medium mb-2 block">
                Select Limited Partner
              </Label>
              <Select
                value={selectedLPId}
                onValueChange={setSelectedLPId}
              >
                <SelectTrigger id="lp-select" className="w-full">
                  <SelectValue placeholder="Select an LP" />
                </SelectTrigger>
                <SelectContent>
                  {lps.map(lp => (
                    <SelectItem key={lp.id} value={lp.id}>
                      {lp.name} ({lp.tier})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Tabs for different MCP views */}
          <Tabs defaultValue="matching" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="matching">LP-Deal Matching (MCP)</TabsTrigger>
              <TabsTrigger value="market">Market Analysis (MCP)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="matching" className="mt-0">
              <MCPVisualizer 
                lp={selectedLP} 
                deal={selectedDeal} 
              />
            </TabsContent>
            
            <TabsContent value="market" className="mt-0">
              <MCPMarketComparison deal={selectedDeal} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4 border-t flex justify-between">
        <div className="text-sm text-gray-500">
          <p>Powered by Model Context Protocol (MCP)</p>
        </div>
        <Button
          variant="outline"
          onClick={() => alert("MCP Documentation available in the codebase at docs/MCP_IMPLEMENTATION_GUIDE.md")}
        >
          View MCP Documentation
        </Button>
      </CardFooter>
    </Card>
  );
}