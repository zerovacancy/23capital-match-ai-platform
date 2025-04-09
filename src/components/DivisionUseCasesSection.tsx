import React from 'react';
import { Building, GitBranch, LayoutTemplate } from 'lucide-react';

const DivisionUseCasesSection = () => {
  return (
    <div className="py-16 relative overflow-hidden" id="division-use-cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title text-[#275E91] mb-3">AI Workflows Tailored to Each Division</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Specialized AI assistants and workflows designed for each business unit's unique requirements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LGA Column */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#F8F5F0]/30 rounded-full -mr-20 -mt-20 z-0"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-lg bg-[#F8F5F0] flex items-center justify-center mb-6">
                <LayoutTemplate className="h-7 w-7 text-[#275E91]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Architecture & Pre-Construction</h3>
              <span className="text-sm font-medium text-[#7A8D79] bg-[#7A8D79]/10 px-3 py-1 rounded-full mb-4 inline-block">LGA</span>
              <ul className="space-y-3 mt-5">
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Notify team of new resi and commercial listings</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Generate on-the-spot layouts, renderings, and pricing</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Auto-generate proposals and design briefs</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Support insurance claims (fires, floods, damages)</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Draft and schedule social media content</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* LGB Column */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#F8F5F0]/30 rounded-full -mr-20 -mt-20 z-0"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-lg bg-[#F8F5F0] flex items-center justify-center mb-6">
                <Building className="h-7 w-7 text-[#275E91]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Construction & Estimating</h3>
              <span className="text-sm font-medium text-[#7A8D79] bg-[#7A8D79]/10 px-3 py-1 rounded-full mb-4 inline-block">LGB</span>
              <ul className="space-y-3 mt-5">
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Track internal resources (PM hours, field labor)</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Flag anomalies in GR spend or budget variance</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Automate estimating + bid proposals</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Trigger HubSpot outreach for open bids</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Surface title-related signals and insurance claims</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* LGD Column */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#F8F5F0]/30 rounded-full -mr-20 -mt-20 z-0"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-lg bg-[#F8F5F0] flex items-center justify-center mb-6">
                <GitBranch className="h-7 w-7 text-[#275E91]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Capital, Investment, and Development</h3>
              <span className="text-sm font-medium text-[#7A8D79] bg-[#7A8D79]/10 px-3 py-1 rounded-full mb-4 inline-block">LGD</span>
              <ul className="space-y-3 mt-5">
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Match deals with investor predilections</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Track equity projects via public data and news</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Create LP-specific pro formas and offering memoranda</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Analyze rents, costs, and value-creation potential</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-[#F8F5F0] p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-[#275E91]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Predict rent growth and map demographic trends</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionUseCasesSection;