
import React from 'react';
import { CircleCheckBig, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const ValueSection = () => {
  const metrics = [
    {
      title: "Time Savings",
      description: "Reduction in time spent matching investors to opportunities",
      value: "85%",
      icon: <Clock className="w-5 h-5 text-[#275E91]" />,
      progress: 85,
      color: "#275E91"
    },
    {
      title: "Capital Allocation",
      description: "Improved efficiency in capital allocation process",
      value: "3.5x",
      icon: <DollarSign className="w-5 h-5 text-[#275E91]" />,
      progress: 70,
      color: "#275E91"
    },
    {
      title: "LP Satisfaction",
      description: "Increase in limited partner satisfaction scores",
      value: "95%",
      icon: <Users className="w-5 h-5 text-[#275E91]" />,
      progress: 95,
      color: "#275E91"
    },
    {
      title: "Deal Match Rate",
      description: "Successful matches between LPs and development projects",
      value: "98%",
      icon: <TrendingUp className="w-5 h-5 text-[#275E91]" />,
      progress: 98,
      color: "#275E91"
    }
  ];

  const benefits = [
    "Faster capital deployment cycle",
    "Reduced administrative overhead",
    "Data-driven investment decisions",
    "Higher quality investor relationships",
    "Enhanced regulatory compliance",
    "Scalable investment operations"
  ];

  return (
    <section id="value" className="section-container bg-transparent py-16 md:py-20">
      <div className="relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-block p-2 bg-[#F8F5F0] rounded-md mb-4">
            <TrendingUp className="w-6 h-6 text-[#275E91]" />
          </div>
          <h2 className="section-title">Value Proposition</h2>
          <p className="section-subtitle mx-auto">
            The tangible benefits and ROI our AI platform delivers to LG Development and its investment partners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#F8F5F0] rounded-md mr-3 flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#275E91]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Performance Metrics</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden bg-white">
                    {/* Card header with consistent height */}
                    <div className="flex items-center p-4 border-b border-gray-100 bg-gray-50">
                      <div className="p-1.5 bg-[#F8F5F0] rounded-md mr-3 flex-shrink-0">
                        {metric.icon}
                      </div>
                      <h4 className="font-medium text-gray-900 line-clamp-1">{metric.title}</h4>
                    </div>
                    
                    {/* Card body with fixed height description */}
                    <div className="p-4 flex-grow flex flex-col">
                      <p className="text-sm text-gray-500 mb-4 h-10">{metric.description}</p>
                      
                      {/* Metric value display with consistent alignment */}
                      <div className="mt-auto">
                        <div className="flex items-baseline mb-3">
                          <span className="text-3xl font-bold text-[#275E91] mr-2">{metric.value}</span>
                          <span className="text-sm text-gray-500">improvement</span>
                        </div>
                        
                        {/* Progress bar with consistent styling */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1.5">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ width: `${metric.progress}%`, backgroundColor: metric.color }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#F8F5F0] rounded-md mr-3 flex-shrink-0">
                  <CircleCheckBig className="w-5 h-5 text-[#275E91]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Key Benefits</h3>
              </div>
              
              <ul className="space-y-4 mb-6">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <CircleCheckBig className="w-5 h-5 text-[#275E91] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-5 rounded-xl bg-[#F8F5F0] border border-[#275E91]/10">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-[#275E91] mr-2" />
                  <h4 className="font-medium text-gray-900">ROI Projection</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Based on current metrics, projected ROI within the first year of implementation:
                </p>
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#275E91]">320%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
