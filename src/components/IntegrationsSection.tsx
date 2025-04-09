
import React from 'react';
import { 
  Building2, 
  MessageSquareText, 
  FileSpreadsheet, 
  ListChecks,
  Mail, 
  HardDriveDownload,
  FileCheck,
  Home 
} from "lucide-react";

const IntegrationsSection = () => {
  const integrations = [
    {
      name: "Procore",
      category: "Construction",
      description: "Construction project management and tracking",
      icon: <Building2 className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/procore_logo.webp"
    },
    {
      name: "Sage",
      category: "Finance",
      description: "Financial and accounting management",
      icon: <FileSpreadsheet className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/sage_logo.webp"
    },
    {
      name: "HubSpot",
      category: "CRM & Marketing",
      description: "CRM and marketing automation",
      icon: <Home className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/hubspot_logo.webp"
    },
    {
      name: "Microsoft Teams",
      category: "Communication",
      description: "Internal team communication and collaboration",
      icon: <MessageSquareText className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/teams_logo.webp"
    },
    {
      name: "Office 365",
      category: "Productivity",
      description: "Email, documents, Excel, and productivity tools",
      icon: <Mail className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/office365_logo.webp"
    },
    {
      name: "Microsoft Lists",
      category: "Project Tracking",
      description: "Task and project tracking management",
      icon: <ListChecks className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/lists_logo.webp"
    },
    {
      name: "OneDrive",
      category: "File Storage",
      description: "Internal file storage and organization",
      icon: <HardDriveDownload className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/onedrive_logo.webp"
    },
    {
      name: "ShareFile",
      category: "Document Sharing",
      description: "Secure document sharing with external parties",
      icon: <FileCheck className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/sharefile_logo.webp"
    }
  ];

  return (
    <section id="integrations" className="section-container bg-background">
      <div className="mb-16 text-center">
        <h2 className="section-title">Integration Ecosystem</h2>
        <p className="section-subtitle mx-auto">
          Seamlessly connect with your existing business tools and platforms.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Main section content */}
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <p className="text-lg text-lg-text">
            Our platform seamlessly integrates with your existing technology stack to provide a unified experience across all your tools and systems.
          </p>
        </div>
        
        {/* Integration Architecture Visualization - Simplified design without redundancy */}
        <div className="relative mb-0">
          <div className="relative w-full mx-auto max-w-3xl" style={{ height: "450px" }}>
            {/* Center platform */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-lg flex items-center justify-center z-30 shadow-md" 
                 style={{ backgroundColor: '#275E91' }}>
              <div className="text-white text-center px-2">
                <p className="font-bold text-base">Capital Match</p>
                <p className="text-sm">AI Platform</p>
                <div className="w-full h-0.5 bg-white/20 my-1.5"></div>
                <p className="text-xs">Integration Hub</p>
              </div>
            </div>
            
            {/* Integration nodes - positioned in a circle around the center */}
            {integrations.map((integration, index) => {
              // Calculate position in a circle
              const totalItems = integrations.length;
              const angle = (Math.PI * 2 * index) / totalItems;
              const radius = 180; // Radius for circle placement
              const x = Math.cos(angle) * radius; 
              const y = Math.sin(angle) * radius;
              
              return (
                <div 
                  key={index} 
                  className="absolute w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  style={{ 
                    left: `calc(50% + ${x}px - 40px)`, 
                    top: `calc(50% + ${y}px - 40px)`,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <img 
                      src={integration.logo} 
                      alt={`${integration.name} logo`} 
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity text-lg-blue mt-1">
                      {integration.name}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {integrations.map((_, index) => {
                const totalItems = integrations.length;
                const angle = (Math.PI * 2 * index) / totalItems;
                const innerRadius = 8; // Central platform radius in %
                const outerRadius = 36; // Outer circle radius in %
                
                // Calculate start and end points
                const innerX = Math.cos(angle) * innerRadius + 50;
                const innerY = Math.sin(angle) * innerRadius + 50;
                const outerX = Math.cos(angle) * outerRadius + 50;
                const outerY = Math.sin(angle) * outerRadius + 50;
                
                return (
                  <path 
                    key={index}
                    d={`M${innerX} ${innerY} L${outerX} ${outerY}`} 
                    stroke="#275E91" 
                    strokeWidth="0.75" 
                    strokeDasharray="3 2"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
