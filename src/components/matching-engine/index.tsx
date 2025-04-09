import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { matches } from '@/data';
import { MatchCard } from './MatchCard';
import { MatchDetail } from './MatchDetail';

export function MatchingEngine() {
  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [search, setSearch] = useState('');
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [filter, setFilter] = useState('all');
  
  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.lpName.toLowerCase().includes(search.toLowerCase()) || 
                         match.dealName.toLowerCase().includes(search.toLowerCase());
    const meetsThreshold = match.confidenceScore >= confidenceThreshold;
    
    if (!matchesSearch || !meetsThreshold) return false;
    
    if (filter === 'all') return true;
    if (filter === 'highConfidence') return match.confidenceScore >= 85;
    if (filter === 'mediumConfidence') return match.confidenceScore >= 70 && match.confidenceScore < 85;
    if (filter === 'lowConfidence') return match.confidenceScore < 70;
    
    return true;
  });
  
  // Sort by confidence score (descending)
  const sortedMatches = [...filteredMatches].sort((a, b) => b.confidenceScore - a.confidenceScore);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-1">
            <div className="p-2 bg-[#F8F5F0] rounded-md mr-3 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Matching Algorithm</h2>
              <p className="text-gray-500">Match deals with appropriate LPs based on criteria alignment</p>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <Button className="bg-[#275E91] hover:bg-[#1E4A73] text-white">
              <Plus className="mr-2 h-4 w-4" /> Log New Commitment
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-12 gap-6 h-[calc(100%-5rem)]">
        <div className="col-span-12 md:col-span-5 flex flex-col h-full">
          <div className="space-y-4 mb-5">
            <Input 
              placeholder="Search LP or deal..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-gray-200 focus:border-[#275E91] focus:ring-[#275E91]/20"
            />
            
            <div className="flex flex-col bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Confidence Threshold: <span className="text-[#275E91]">{confidenceThreshold}%</span></span>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[150px] h-8 border-gray-200 text-gray-700 hover:border-gray-300 focus:border-[#275E91] focus:ring-[#275E91]/20">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Matches</SelectItem>
                    <SelectItem value="highConfidence">High Confidence</SelectItem>
                    <SelectItem value="mediumConfidence">Medium Confidence</SelectItem>
                    <SelectItem value="lowConfidence">Low Confidence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Slider 
                defaultValue={[70]} 
                max={100} 
                step={5} 
                value={[confidenceThreshold]}
                onValueChange={(values) => setConfidenceThreshold(values[0])}
                className="py-2"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Min: 0%</span>
                <span>Max: 100%</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1">
            <div className="bg-gray-50 p-3 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Match Results</span>
              <span className="text-xs bg-[#F8F5F0] text-[#275E91] py-1 px-2 rounded-full">{sortedMatches.length} results</span>
            </div>
            <ScrollArea className="h-[calc(100%-3rem)]">
              <div className="space-y-0 divide-y divide-gray-100">
                {sortedMatches.map(match => (
                  <div key={match.id} className={`hover:bg-gray-50 transition-colors ${selectedMatch.id === match.id ? 'bg-[#F8F5F0]' : ''}`}>
                    <MatchCard 
                      match={match}
                      selected={selectedMatch.id === match.id}
                      onClick={() => setSelectedMatch(match)}
                    />
                  </div>
                ))}
                {sortedMatches.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No matches found matching your search criteria.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-7 h-full">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 h-full">
            <MatchDetail match={selectedMatch} />
          </div>
        </div>
      </div>
    </div>
  );
}