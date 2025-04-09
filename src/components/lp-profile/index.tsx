import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { lps } from '@/data';
import { LPProfileCard } from './LPProfileCard';
import { LPProfileDetail } from './LPProfileDetail';

export function LPProfileEngine() {
  const [selectedLP, setSelectedLP] = useState(lps[0]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredLPs = lps.filter(lp => {
    const matchesSearch = lp.name.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'tier1') return matchesSearch && lp.tier === 'Tier 1';
    if (filter === 'tier2') return matchesSearch && lp.tier === 'Tier 2';
    if (filter === 'tier3') return matchesSearch && lp.tier === 'Tier 3';
    if (filter === 'chicago') return matchesSearch && 
      (lp.geographicPreferences.primary.includes('Chicago') || 
       lp.geographicPreferences.secondary.includes('Chicago'));
    if (filter === 'growth') return matchesSearch && 
      (lp.geographicPreferences.primary.some(loc => ['Denver', 'Charlotte', 'Raleigh', 'Nashville'].includes(loc)) ||
       lp.geographicPreferences.secondary.some(loc => ['Denver', 'Charlotte', 'Raleigh', 'Nashville'].includes(loc)));
       
    return matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-1">
            <div className="p-2 bg-[#F8F5F0] rounded-md mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">LP Profile Engine</h2>
              <p className="text-gray-500">Manage investor relationships and match criteria with deals</p>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <Button className="bg-[#275E91] hover:bg-[#1E4A73] text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New LP
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-12 gap-6 h-[calc(100%-5rem)]">
        <div className="col-span-12 md:col-span-5 flex flex-col h-full">
          <div className="flex gap-3 mb-5">
            <Input 
              placeholder="Search LPs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-gray-200 focus:border-[#275E91] focus:ring-[#275E91]/20"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px] border-gray-200 text-gray-700 hover:border-gray-300 focus:border-[#275E91] focus:ring-[#275E91]/20">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All LPs</SelectItem>
                <SelectItem value="tier1">Tier 1</SelectItem>
                <SelectItem value="tier2">Tier 2</SelectItem>
                <SelectItem value="tier3">Tier 3</SelectItem>
                <SelectItem value="chicago">Chicago Focus</SelectItem>
                <SelectItem value="growth">Growth Markets</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1">
            <div className="bg-gray-50 p-3 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Investor Profiles</span>
              <span className="text-xs bg-[#F8F5F0] text-[#275E91] py-1 px-2 rounded-full">{filteredLPs.length} results</span>
            </div>
            <ScrollArea className="h-[calc(100%-3rem)]">
              <div className="space-y-0 divide-y divide-gray-100">
                {filteredLPs.map(lp => (
                  <div key={lp.id} className={`hover:bg-gray-50 transition-colors ${selectedLP.id === lp.id ? 'bg-[#F8F5F0]' : ''}`}>
                    <LPProfileCard 
                      lp={lp}
                      selected={selectedLP.id === lp.id}
                      onClick={() => setSelectedLP(lp)}
                    />
                  </div>
                ))}
                {filteredLPs.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No LPs found matching your search criteria.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-7 h-full">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 h-full">
            <LPProfileDetail lp={selectedLP} />
          </div>
        </div>
      </div>
    </div>
  );
}