import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserRound, 
  BarChart2, 
  GitCompareArrows, 
  FileSpreadsheet, 
  ArrowUpRight, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  LineChart, 
  PieChart, 
  DollarSign, 
  ChevronDown,
  Info,
  Eye,
  X,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  color: string;
  label: string;
}

const TabButton: React.FC<TabProps> = ({ isActive, onClick, color, label }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 text-sm font-medium transition-colors relative border-b-2",
      isActive ? 
        "text-gray-900 border-current" : 
        "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
    )}
    style={{ color: isActive ? color : undefined, borderColor: isActive ? color : undefined }}
  >
    {label}
  </button>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  themeColor: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, themeColor }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: themeColor }}>
          <h3 className="font-semibold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const CapabilitiesSection = () => {
  const [activeTab, setActiveTab] = useState<Record<number, string>>({
    0: 'summary',
    1: 'summary',
    2: 'summary',
    3: 'summary'
  });
  
  const [previewModal, setPreviewModal] = useState<number | null>(null);
  
  const capabilities = [
    {
      title: "LP Profile Engine",
      description: "Build comprehensive investor profiles based on historical preferences, risk tolerance, and targeted returns.",
      icon: <UserRound className="w-14 h-14 text-[#275E91]" />,
      benefits: ["Automated preference tracking", "Adaptive learning", "Regulatory compliance"],
      metrics: [
        { label: "Investor Insights", value: "95%", description: "Accuracy in preference identification" },
        { label: "Time Savings", value: "3.5x", description: "Faster LP onboarding" },
      ],
      tags: [
        { label: "IRR: 18-22%", icon: <ArrowUpRight className="h-3 w-3 text-green-500" /> },
        { label: "BTR Focus", icon: <Building2 className="h-3 w-3 text-[#275E91]" /> },
        { label: "$1-5M", icon: <DollarSign className="h-3 w-3 text-[#275E91]" /> },
        { label: "Moderate Risk", icon: <LineChart className="h-3 w-3 text-[#275E91]" /> }
      ],
      features: [
        "Real-time sentiment tracking",
        "Investment history analysis",
        "Communication preference management",
        "Regulatory compliance automation"
      ],
      themeColor: "#275E91",
      lightColor: "#F8F5F0"
    },
    {
      title: "Deal Analysis Engine",
      description: "Advanced algorithms to evaluate development opportunities against multiple investment criteria.",
      icon: <BarChart2 className="w-14 h-14 text-[#275E91]" />,
      benefits: ["Multi-factor analysis", "Predictive modeling", "Market comparables"],
      metrics: [
        { label: "Projection Accuracy", value: "98%", description: "Financial forecast reliability" },
        { label: "Data Points", value: "250+", description: "Parameters per analysis" },
      ],
      tags: [
        { label: "IRR: 18.3%", icon: <ArrowUpRight className="h-3 w-3 text-green-500" /> },
        { label: "EM: 2.1x", icon: <ArrowUpRight className="h-3 w-3 text-green-500" /> },
        { label: "CoC: 9.5%", icon: <DollarSign className="h-3 w-3 text-[#275E91]" /> }
      ],
      features: [
        "Scenario modeling with variable inputs",
        "Historical market trend analysis",
        "Risk assessment calibration",
        "Geospatial opportunity mapping",
        "Investor-specific reporting",
        "Automated data verification"
      ],
      themeColor: "#275E91",
      lightColor: "#F8F5F0"
    },
    {
      title: "Matching Algorithm",
      description: "AI-powered matching system to align investor profiles with the right development opportunities.",
      icon: <GitCompareArrows className="w-14 h-14 text-[#275E91]" />,
      benefits: ["98% match accuracy", "Real-time updates", "Custom weighting"],
      metrics: [
        { label: "Time Reduction", value: "87%", description: "From weeks to minutes" },
        { label: "Match Quality", value: "4.9/5", description: "LP satisfaction score" },
      ],
      tags: [
        { label: "98% Match", icon: <CheckCircle2 className="h-3 w-3 text-green-500" /> },
        { label: "AI-Powered", icon: <Activity className="h-3 w-3 text-[#275E91]" /> }
      ],
      features: [
        "Multi-dimensional criteria matching",
        "Weighted preference ranking",
        "Automated shortlist generation",
        "Confidence scoring for matches"
      ],
      themeColor: "#275E91",
      lightColor: "#F8F5F0"
    },
    {
      title: "Reporting Generator",
      description: "Automated creation of detailed reports for investors, executives, and regulatory compliance.",
      icon: <FileSpreadsheet className="w-14 h-14 text-[#275E91]" />,
      benefits: ["Custom templates", "Multi-format export", "Scheduled delivery"],
      metrics: [
        { label: "Time Saved", value: "45+", description: "Hours per month on reporting" },
        { label: "Compliance", value: "100%", description: "Regulatory standards" },
      ],
      tags: [
        { label: "PDF", icon: <FileSpreadsheet className="h-3 w-3 text-[#275E91]" /> },
        { label: "CSV", icon: <FileSpreadsheet className="h-3 w-3 text-[#275E91]" /> },
        { label: "XLSX", icon: <FileSpreadsheet className="h-3 w-3 text-[#275E91]" /> }
      ],
      features: [
        "White-labeled investor reporting",
        "Regulatory filing preparation",
        "Automated distribution scheduling",
        "Interactive data visualization"
      ],
      themeColor: "#275E91",
      lightColor: "#F8F5F0"
    }
  ];

  const renderVisualization = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-full max-w-[280px] mx-auto">
              <div className="relative z-10 h-16 w-16 mx-auto rounded-full border-2 border-[#275E91] bg-white flex items-center justify-center mb-6">
                <UserRound className="h-8 w-8 text-[#275E91]" />
                <div className="absolute top-0 right-0 h-5 w-5 rounded-full bg-[#275E91] text-white flex items-center justify-center text-xs font-bold">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 relative z-10">
                {capabilities[0].tags.map((tag, i) => (
                  <Badge 
                    key={i}
                    variant="outline" 
                    className="py-1.5 border-[#275E91]/30 bg-[#F8F5F0] flex items-center gap-1.5 justify-center"
                  >
                    {tag.icon}
                    <span className="text-xs font-medium text-gray-700">{tag.label}</span>
                  </Badge>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Investor Profile Summary</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Geographic Focus</span>
                    <span className="text-xs font-medium">Chicago, Nashville</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Investment Size</span>
                    <span className="text-xs font-medium">$1M - $5M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Target Returns</span>
                    <span className="text-xs font-medium">18-22% IRR</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Risk Tolerance</span>
                    <span className="text-xs font-medium">Moderate</span>
                  </div>
                </div>
                <div className="text-xs text-center text-gray-500 italic">Last updated: 2 days ago</div>
              </div>
              
              <div className="text-center mb-4">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#275E91] text-white text-sm font-medium rounded-md shadow-sm hover:bg-[#1d4b77] transition-colors">
                  <UserRound className="w-4 h-4" />
                  View Investor Profile
                </button>
              </div>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-full max-w-[300px] mx-auto">
              <div className="relative z-10 h-16 w-16 mx-auto rounded-full border-2 border-[#275E91] bg-white flex items-center justify-center mb-6">
                <BarChart2 className="h-8 w-8 text-[#275E91]" />
                <div className="absolute top-0 right-0 h-5 w-5 rounded-full bg-[#275E91] text-white flex items-center justify-center text-xs font-bold">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Projected Returns</h4>
                <div className="grid grid-cols-3 gap-4 w-full mx-auto">
                  {capabilities[1].tags.map((tag, i) => (
                    <div key={i} className="bg-[#F8F5F0] p-2 rounded-md text-center">
                      <div className="text-xs text-gray-500 mb-1">{tag.label.split(':')[0]}</div>
                      <div className="text-sm font-medium text-[#275E91]">{tag.label.split(':')[1] || tag.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Capital Structure</h4>
                <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="absolute inset-y-0 left-0 bg-[#275E91]" style={{ width: '65%' }}></div>
                  <div className="absolute inset-y-0 right-0 bg-gray-300" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-xs">
                    <span className="text-[#275E91] font-medium">Debt: 65%</span>
                    <br />
                    <span className="text-gray-500">$42.5M</span>
                  </div>
                  <div className="text-xs text-right">
                    <span className="text-gray-700 font-medium">Equity: 35%</span>
                    <br />
                    <span className="text-gray-500">$22.9M</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#275E91] text-white text-sm font-medium rounded-md shadow-sm hover:bg-[#1d4b77] transition-colors">
                  <PieChart className="w-4 h-4" />
                  View Analysis
                </button>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[280px]">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Match Analysis</h4>
                    <p className="text-xs text-gray-500">LP to Deal Compatibility</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
                    98% Match
                  </Badge>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#F8F5F0] flex items-center justify-center">
                    <UserRound className="w-6 h-6 text-[#275E91]" />
                  </div>
                  
                  <div className="flex-1 px-4">
                    <div className="h-1 w-full bg-[#275E91]">
                      <div className="h-full w-1/4 bg-green-500 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-[#F8F5F0] flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#275E91]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Geographic Match</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 text-xs">100%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Size Alignment</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 text-xs">95%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Return Targets</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 text-xs">98%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Risk Profile</span>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0 text-xs">92%</Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#275E91] text-white text-sm font-medium rounded-md shadow-sm hover:bg-[#1d4b77] transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                  Send Match Notification
                </button>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-[280px]">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Quarterly Report</h4>
                    <p className="text-xs text-gray-500">Auto-generated for LP partners</p>
                  </div>
                  <div className="flex gap-1">
                    {capabilities[3].tags.map((tag, i) => (
                      <Badge key={i} className="bg-[#F8F5F0] text-[#275E91] hover:bg-[#F8F5F0] border-0 text-xs">
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <div className="h-6 bg-[#275E91]"></div>
                  <div className="p-2 bg-white">
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/5 mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6 mb-2"></div>
                    
                    <div className="h-10 mb-2 flex items-end justify-between gap-1">
                      <div className="h-4 w-2 bg-[#275E91] rounded-t"></div>
                      <div className="h-8 w-2 bg-[#275E91] rounded-t"></div>
                      <div className="h-6 w-2 bg-[#275E91] rounded-t"></div>
                      <div className="h-9 w-2 bg-[#275E91] rounded-t"></div>
                      <div className="h-5 w-2 bg-[#275E91] rounded-t"></div>
                      <div className="h-7 w-2 bg-[#275E91] rounded-t"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-xs text-gray-500">Auto-distribution</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 text-xs">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-xs text-gray-500">Schedule</span>
                    <span className="text-xs font-medium">Quarterly</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-gray-500">Next report</span>
                    <span className="text-xs font-medium">June 30, 2025</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#275E91] text-white text-sm font-medium rounded-md shadow-sm hover:bg-[#1d4b77] transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview Report
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render metrics content for a capability
  const renderMetrics = (capability: typeof capabilities[0]) => (
    <div className="space-y-4">
      {capability.metrics.map((metric, idx) => (
        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{metric.label}</span>
            <Badge 
              className="bg-[#F8F5F0] border-0 text-[#275E91] hover:bg-[#F8F5F0]"
            >
              {metric.value}
            </Badge>
          </div>
          <p className="text-xs text-gray-600">{metric.description}</p>
          
          <div className="mt-3 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            {/* Randomize the progress bar fill based on the metric value */}
            <div 
              className="h-full bg-[#275E91]" 
              style={{ 
                width: `${metric.value.includes('%') ? 
                  parseInt(metric.value) : 
                  (parseInt(metric.value) * 10) || 85}%` 
              }}
            ></div>
          </div>
        </div>
      ))}
      
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Key Features</h4>
        <ul className="space-y-2">
          {capability.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle2 
                className="w-4 h-4 text-[#275E91] mt-0.5 mr-2 flex-shrink-0" 
              />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <section id="capabilities" className="section-container overflow-hidden relative py-20 bg-white">
      <div className="absolute inset-0 bg-[#F8F5F0]/50"></div>
      
      {/* Section Header */}
      <div className="mb-16 text-center relative z-10">
        <div className="inline-block p-2 bg-[#F8F5F0] rounded-md mb-4">
          <Activity className="w-6 h-6 text-[#275E91]" />
        </div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Core Capabilities</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our platform leverages advanced AI to streamline the capital matching process
          with these powerful capabilities tailored to LG Development's specific needs.
        </p>
      </div>
      
      {/* Capabilities Cards - Redesigned with tabbed interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-5xl mx-auto grid-flow-row-dense">
        {capabilities.map((capability, index) => (
          <div key={index} className="flex flex-col group">
            <Card className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden h-full group-hover:shadow-md transition-all duration-300 flex flex-col">
              <CardHeader className="pb-0 relative">
                {/* Preview button that appears on hover */}
                <button 
                  onClick={() => setPreviewModal(index)}
                  className="absolute right-4 top-4 w-8 h-8 rounded-md bg-[#F8F5F0] text-[#275E91] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#275E91] hover:text-white"
                  aria-label={`Preview ${capability.title}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
                
                {/* Card header with icon */}
                <div className="flex items-start mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                    style={{ backgroundColor: "#F8F5F0" }}
                  >
                    {React.cloneElement(capability.icon as React.ReactElement, {
                      className: "w-6 h-6 text-[#275E91]"
                    })}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {capability.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 mt-1">
                      {capability.description}
                    </CardDescription>
                  </div>
                </div>
                
                {/* Tabbed interface */}
                <div className="border-b border-gray-200 -mx-6">
                  <div className="flex">
                    <TabButton
                      isActive={activeTab[index] === 'summary'}
                      onClick={() => setActiveTab({...activeTab, [index]: 'summary'})}
                      color="#275E91"
                      label="Summary"
                    />
                    <TabButton
                      isActive={activeTab[index] === 'metrics'}
                      onClick={() => setActiveTab({...activeTab, [index]: 'metrics'})}
                      color="#275E91"
                      label="Metrics"
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-5 flex flex-col h-full">
                {/* Tab content */}
                {activeTab[index] === 'summary' && (
                  <div className="flex flex-col flex-1">
                    <div className="space-y-5 flex-1">
                    {/* Key Benefits */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Key Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {capability.benefits.map((benefit, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="py-1 px-2 border-[#275E91]/20 bg-[#F8F5F0] text-gray-700"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Color-coded tags for quick understanding */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Key Metrics</h4>
                      <div className="flex flex-wrap gap-2">
                        {capability.tags.map((tag, i) => (
                          <Badge 
                            key={i} 
                            className="bg-[#F8F5F0] border-0 px-2.5 py-1 gap-1.5 flex items-center text-gray-700"
                          >
                            {tag.icon}
                            <span>{tag.label}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    </div>
                    {/* Preview button */}
                    <div className="flex-shrink-0 mt-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setPreviewModal(index)}
                        className="w-full py-2 rounded-md border border-[#275E91] text-[#275E91] text-sm font-medium hover:bg-[#F8F5F0] transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Preview
                      </button>
                    </div>
                  </div>
                )}
                
                {activeTab[index] === 'metrics' && (
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      {renderMetrics(capability)}
                    </div>
                    <div className="flex-shrink-0 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setPreviewModal(index)}
                        className="w-full py-2 rounded-md border border-[#275E91] text-[#275E91] text-sm font-medium hover:bg-[#F8F5F0] transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Preview
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Preview Modal */}
            <Modal
              isOpen={previewModal === index}
              onClose={() => setPreviewModal(null)}
              title={`${capability.title} Preview`}
              themeColor="#275E91"
            >
              <div className="min-h-[300px]">
                {renderVisualization(index)}
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CapabilitiesSection;
