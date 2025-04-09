
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
        
        {/* Integration Architecture Visualization - Using the new LG-DATA diagram */}
        <div className="relative mb-0">
          <div className="relative w-full mx-auto max-w-3xl flex justify-center">
            <img 
              src="/assets/images/home/integrations/LG-DATA.webp" 
              alt="LG Data Network Integration Diagram" 
              className="max-w-full h-auto shadow-sm rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
