import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { deals } from '@/data';
import { DealCard } from './DealCard';
import { DealDetail } from './DealDetail';

export function DealAnalyzer() {
  const [selectedDeal, setSelectedDeal] = useState(deals[0]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(search.toLowerCase()) || 
                         deal.location.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'btr') return matchesSearch && deal.type === 'Build-to-Rent';
    if (filter === 'midrise') return matchesSearch && deal.type === 'Mid-Rise Multifamily';
    if (filter === 'highrise') return matchesSearch && deal.type === 'High-Rise Multifamily';
    if (filter === 'core') return matchesSearch && deal.market === 'Core';
    if (filter === 'growth') return matchesSearch && deal.market === 'Strategic Growth';
    if (filter === 'opportunistic') return matchesSearch && deal.market === 'Opportunistic';
    
    return matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-1">
            <div className="p-2 bg-[#F8F5F0] rounded-md mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Deal Analysis Engine</h2>
              <p className="text-gray-500">Analyze and standardize deal metrics for consistent evaluation</p>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <Button className="bg-[#275E91] hover:bg-[#1E4A73] text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Deal
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-12 gap-6 h-[calc(100%-5rem)]">
        <div className="col-span-12 md:col-span-5 flex flex-col h-full">
          <div className="flex gap-3 mb-5">
            <Input 
              placeholder="Search deals..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-gray-200 focus:border-[#275E91] focus:ring-[#275E91]/20"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px] border-gray-200 text-gray-700 hover:border-gray-300 focus:border-[#275E91] focus:ring-[#275E91]/20">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deals</SelectItem>
                <SelectItem value="btr">Build-to-Rent</SelectItem>
                <SelectItem value="midrise">Mid-Rise</SelectItem>
                <SelectItem value="highrise">High-Rise</SelectItem>
                <SelectItem value="core">Core Market</SelectItem>
                <SelectItem value="growth">Strategic Growth</SelectItem>
                <SelectItem value="opportunistic">Opportunistic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1">
            <div className="bg-gray-50 p-3 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Deal Pipeline</span>
              <span className="text-xs bg-[#F8F5F0] text-[#275E91] py-1 px-2 rounded-full">{filteredDeals.length} results</span>
            </div>
            <ScrollArea className="h-[calc(100%-3rem)]">
              <div className="space-y-0 divide-y divide-gray-100">
                {filteredDeals.map(deal => (
                  <div key={deal.id} className={`hover:bg-gray-50 transition-colors ${selectedDeal.id === deal.id ? 'bg-[#F8F5F0]' : ''}`}>
                    <DealCard 
                      deal={deal}
                      selected={selectedDeal.id === deal.id}
                      onClick={() => setSelectedDeal(deal)}
                    />
                  </div>
                ))}
                {filteredDeals.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No deals found matching your search criteria.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-7 h-full">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 h-full">
            <DealDetail deal={selectedDeal} />
          </div>
        </div>
      </div>
    </div>
  );
}