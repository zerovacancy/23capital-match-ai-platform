import React from 'react';
import { Database, Mail, GitMerge, FileText, BarChart } from 'lucide-react';

const IntegrationVisualSection = () => {
  return (
    <div className="py-16 relative overflow-hidden" id="integration-visual">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title text-[#275E91] mb-3">How It Works: Connect Your Data, Unlock New Value</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Seamlessly integrate with your existing tools and data sources to power intelligent real estate decisions
          </p>
        </div>
        
        <div className="relative">
          {/* Connection lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#275E91]/50 via-[#7A8D79]/50 to-[#275E91]/50 z-0"></div>
          <div className="absolute top-1/4 bottom-1/4 left-1/3 w-0.5 bg-gradient-to-b from-[#275E91]/10 via-[#7A8D79]/30 to-[#275E91]/10 z-0"></div>
          <div className="absolute top-1/4 bottom-1/4 right-1/3 w-0.5 bg-gradient-to-b from-[#275E91]/10 via-[#7A8D79]/30 to-[#275E91]/10 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Inputs Column */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-[#F8F5F0] flex items-center justify-center mb-6 mx-auto">
                <Database className="h-7 w-7 text-[#275E91]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">Inputs</h3>
              <ul className="space-y-4">
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h20"></path>
                      <path d="M21 3v17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3"></path>
                      <path d="M16 3s-2-1-6-1-6 1-6 1"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">HubSpot</span>
                </li>
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                      <path d="M2 7h20"></path>
                      <path d="M5 12h14"></path>
                      <path d="M7 17h10"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">LoopNet / CoStar</span>
                </li>
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-[#275E91]" />
                  </div>
                  <span className="text-gray-700">Title Records & News</span>
                </li>
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <Mail className="h-5 w-5 text-[#275E91]" />
                  </div>
                  <span className="text-gray-700">Internal Email Threads</span>
                </li>
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"></path>
                      <path d="M7 17l4-4 4 4 6-6"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Procore & Sage</span>
                </li>
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <span className="text-gray-700">Pro Formas / OMs</span>
                </li>
              </ul>
            </div>
            
            {/* AI Assistant Core Column */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md transform hover:scale-105 transition-transform duration-300 relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#275E91]/20 via-[#7A8D79]/20 to-[#275E91]/20 blur-lg rounded-xl"></div>
              
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#275E91] to-[#7A8D79] flex items-center justify-center mb-6 mx-auto">
                  <GitMerge className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-6 text-center text-gray-900">AI Assistant Core</h3>
                
                <div className="space-y-5">
                  <div className="bg-[#F8F5F0] p-4 rounded-lg relative">
                    <div className="absolute top-0 left-4 -mt-2 w-4 h-4 rotate-45 bg-[#F8F5F0]"></div>
                    <h4 className="font-medium text-[#275E91] mb-2">LP Profile Engine</h4>
                    <p className="text-sm text-gray-700">Creates and maintains profiles of investor predilections based on transaction history</p>
                  </div>
                  
                  <div className="bg-[#F8F5F0] p-4 rounded-lg relative">
                    <h4 className="font-medium text-[#275E91] mb-2">Deal Matching Engine</h4>
                    <p className="text-sm text-gray-700">Algorithmically pairs deals with investors using multiple criteria</p>
                  </div>
                  
                  <div className="bg-[#F8F5F0] p-4 rounded-lg relative">
                    <h4 className="font-medium text-[#275E91] mb-2">Proposal & Pro Forma Generator</h4>
                    <p className="text-sm text-gray-700">Creates tailored investment materials based on LP preferences</p>
                  </div>
                  
                  <div className="bg-[#F8F5F0] p-4 rounded-lg relative">
                    <div className="absolute bottom-0 right-4 -mb-2 w-4 h-4 rotate-45 bg-[#F8F5F0]"></div>
                    <h4 className="font-medium text-[#275E91] mb-2">Investor & Project Tracker</h4>
                    <p className="text-sm text-gray-700">Monitors ongoing engagements and project milestones</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Outputs Column */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-[#F8F5F0] flex items-center justify-center mb-6 mx-auto">
                <BarChart className="h-7 w-7 text-[#275E91]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">Outputs</h3>
              <ul className="space-y-4">
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-700">Investor Pitch Decks</span>
                </li>
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </div>
                  <span className="text-gray-700">Executive Summaries</span>
                </li>
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Outreach Recommendations</span>
                </li>
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <span className="text-gray-700">Capital Tracker Dashboards</span>
                </li>
                <li className="flex items-center p-2 bg-[#F8F5F0]/30 rounded-lg">
                  <div className="w-8 h-8 rounded-md bg-[#F8F5F0] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-700">Project Alerts in Microsoft Teams</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationVisualSection;