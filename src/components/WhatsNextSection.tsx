import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const WhatsNextSection = () => {
  return (
    <div className="py-16 relative overflow-hidden" id="whats-next">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title text-[#275E91] mb-3">What We're Prioritizing First</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our implementation roadmap for building LG Development's AI-powered platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Phase 1 */}
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-[#275E91] to-[#7A8D79] z-0"></div>
            
            <div className="flex mb-4">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#275E91] flex items-center justify-center text-white font-bold">1</div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-1 text-gray-900">Phase 1</h3>
                <p className="text-[#275E91] font-medium">Immediate Focus</p>
              </div>
            </div>
            
            <div className="ml-12 pl-8 space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7A8D79] mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Build LP-deal matching engine and capital raise tracker</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7A8D79] mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Create automated investor outreach system</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7A8D79] mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Implement basic analytics dashboard</span>
              </div>
            </div>
          </div>
          
          {/* Phase 2 */}
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-[#275E91]/70 to-[#7A8D79]/70 z-0"></div>
            
            <div className="flex mb-4">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#275E91]/80 flex items-center justify-center text-white font-bold">2</div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-1 text-gray-900">Phase 2</h3>
                <p className="text-[#275E91] font-medium">Content Generation</p>
              </div>
            </div>
            
            <div className="ml-12 pl-8 space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7A8D79]/80 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Set up proposal + OM auto-generation tools</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7A8D79]/80 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Implement natural language analytics</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#7A8D79]/80 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Build pro forma creation and analysis tools</span>
              </div>
            </div>
          </div>
          
          {/* Phase 3 */}
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-[#275E91]/50 to-[#7A8D79]/50 z-0"></div>
            
            <div className="flex mb-4">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#275E91]/60 flex items-center justify-center text-white font-bold">3</div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-1 text-gray-900">Phase 3</h3>
                <p className="text-[#275E91] font-medium">Integration Expansion</p>
              </div>
            </div>
            
            <div className="ml-12 pl-8 space-y-4">
              <div className="flex items-start">
                <Circle className="h-5 w-5 text-[#7A8D79]/60 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Integrate HubSpot for investor intelligence</span>
              </div>
              <div className="flex items-start">
                <Circle className="h-5 w-5 text-[#7A8D79]/60 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Connect to LoopNet and CoStar for deal sourcing</span>
              </div>
              <div className="flex items-start">
                <Circle className="h-5 w-5 text-[#7A8D79]/60 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Implement title data and transaction monitoring</span>
              </div>
            </div>
          </div>
          
          {/* Phase 4 */}
          <div className="relative">
            <div className="flex mb-4">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#275E91]/40 flex items-center justify-center text-white font-bold">4</div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-1 text-gray-900">Phase 4</h3>
                <p className="text-[#275E91] font-medium">Multi-Division Expansion</p>
              </div>
            </div>
            
            <div className="ml-12 pl-8 space-y-4">
              <div className="flex items-start">
                <Circle className="h-5 w-5 text-[#7A8D79]/40 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Expand to LGA workflows for design and layout generation</span>
              </div>
              <div className="flex items-start">
                <Circle className="h-5 w-5 text-[#7A8D79]/40 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Build LGB-specific estimating and GR tracking tools</span>
              </div>
              <div className="flex items-start">
                <Circle className="h-5 w-5 text-[#7A8D79]/40 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-700">Implement cross-division social media content creation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNextSection;