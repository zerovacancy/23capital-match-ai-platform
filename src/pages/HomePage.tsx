
import React from 'react';
import Header from '@/components/Header';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import HeroSection from '@/components/HeroSection';
import DivisionUseCasesSection from '@/components/DivisionUseCasesSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import IntegrationsSection from '@/components/IntegrationsSection';
import IntegrationVisualSection from '@/components/IntegrationVisualSection';
import WhatsNextSection from '@/components/WhatsNextSection';
import ValueSection from '@/components/ValueSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNav />
      <main>
        {/* 1. Hero Section */}
        <HeroSection />
        
        {/* 2. AI Workflows Tailored to Each Division */}
        <div className="section-primary">
          <DivisionUseCasesSection />
        </div>
        
        {/* 3. How It Works: Connect Your Data, Unlock New Value */}
        <div className="section-secondary">
          <IntegrationVisualSection />
        </div>
        
        {/* 4. Core Capabilities */}
        <div className="section-primary">
          <CapabilitiesSection />
        </div>
        
        {/* 5. Integration Ecosystem */}
        <div className="section-tertiary">
          <IntegrationsSection />
        </div>
        
        {/* 6. Platform Architecture */}
        <div className="section-secondary">
          <ArchitectureSection />
        </div>
        
        {/* 7. Value Proposition */}
        <div className="section-tertiary">
          <ValueSection />
        </div>
        
        {/* 8. What We're Prioritizing First */}
        <div className="section-alternate">
          <WhatsNextSection />
        </div>
        
        {/* 9. Contact Section (before Footer) */}
        <div className="section-alternate">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
