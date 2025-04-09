
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, ChevronDown } from "lucide-react";
import PlatformVisualization from '@/components/visualization/PlatformVisualization';

const HeroSection = () => {
  const scrollToCapabilities = () => {
    const element = document.getElementById('capabilities');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Enhanced background gradient elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#275E91]/30 to-[#C9D4DC]/15 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#7A8D79]/20 to-[#C9D4DC]/10 blur-3xl animate-pulse-slow animation-delay-2000" />
      
      {/* Enhanced animated background particles with Primary Blue highlights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i} 
            className={`absolute rounded-full animate-particle-move ${i % 4 === 0 ? 'bg-[#275E91]/30' : 'bg-[#275E91]/15'}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              animationDuration: `${Math.random() * 40 + 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: Math.random() * 0.6,
              filter: i % 5 === 0 ? 'blur(2px)' : 'none',
              boxShadow: i % 4 === 0 ? '0 0 10px rgba(39, 94, 145, 0.3)' : 'none',
            }}
          />
        ))}
      </div>
      
      {/* Enhanced grid pattern overlay for depth with subtle C9D4DC background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOUQ0REMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjhoMnY0em0wIDMwaC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptLTYgMTJoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#C9D4DC]/5 to-transparent opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Enhanced Overline with improved Secondary Green */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#7A8D79]/10 text-[#7A8D79] mb-8 border border-[#7A8D79]/20 shadow-sm">
          <Building2 className="w-4 h-4 mr-2" />
          <span className="text-sm font-semibold">Intelligent Capital Matching</span>
        </div>
        
        {/* Enhanced headline with improved visual hierarchy and Primary Blue */}
        <h1 className="mb-6 max-w-4xl animate-fade-in">
          <span className="text-[#275E91] font-bold">AI-Powered Intelligence</span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#275E91] to-[#7A8D79] animate-text-gradient font-bold">for Real Estate</span>
          <span className="text-[#275E91] font-bold"> Capital, Development & Design</span>
        </h1>
        
        {/* Enhanced subtitle with improved text color and Secondary Green accents */}
        <div className="large-text md:text-2xl mb-8 max-w-3xl relative">
          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-[#7A8D79] to-transparent opacity-60 rounded-full"></div>
          <p className="text-[#1C1C1C] leading-relaxed">
            Automate deal sourcing, LP outreach, proposal generation, and more—built for development, construction, and architecture teams.
          </p>
        </div>
        
        {/* Interactive Platform Visualization */}
        <div className="flex justify-center w-full mt-4 mb-6">
          <PlatformVisualization />
        </div>
        
        {/* Enhanced CTA buttons with Primary Blue to 5B7B9C gradient */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in animation-delay-500">
          <a href="/platform" className="transition-transform hover:scale-105 focus:scale-105 group">
            <Button className="bg-gradient-to-r from-[#275E91] to-[#5B7B9C] hover:from-[#275E91] hover:to-[#7A8D79] transition-all duration-300 px-8 py-6 text-lg rounded-md font-semibold text-white shadow-lg hover:shadow-xl flex items-center gap-2 group-hover:gap-3 relative overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#275E91]/80 to-[#5B7B9C]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 flex items-center gap-2 group-hover:gap-3">
                Explore Platform <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </a>
          <Button 
            variant="outline" 
            className="border-[#275E91] text-[#275E91] px-8 py-6 text-lg hover:bg-[#275E91]/10 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group" 
            onClick={scrollToCapabilities}
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#275E91]/10 to-[#5B7B9C]/10 group-hover:w-full transition-all duration-500"></span>
            <span className="relative z-10">View Features</span>
          </Button>
        </div>
        
        {/* Enhanced scroll indicator with Primary Blue and Section Highlight */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <button 
            onClick={scrollToCapabilities} 
            className="flex flex-col items-center text-[#4F5D75]/60 hover:text-[#275E91] transition-all duration-300 transform hover:scale-110 group"
          >
            <span className="text-sm mb-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#C9D4DC]/20 px-3 py-1 rounded-full">Scroll to explore</span>
            <div className="relative">
              <ChevronDown className="w-6 h-6 drop-shadow-sm" />
              <div className="absolute inset-0 animate-ping opacity-50 rounded-full bg-[#275E91]/30 duration-700"></div>
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-[#C9D4DC]/30 to-transparent w-10 h-10 -m-2 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
