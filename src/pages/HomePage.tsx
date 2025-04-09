
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
        <HeroSection />
        <div className="section-primary">
          <DivisionUseCasesSection />
        </div>
        <div className="section-secondary">
          <CapabilitiesSection />
        </div>
        <div className="section-primary">
          <IntegrationVisualSection />
        </div>
        <div className="section-tertiary">
          <ArchitectureSection />
        </div>
        <div className="section-alternate">
          <WhatsNextSection />
        </div>
        <div className="section-secondary">
          <IntegrationsSection />
        </div>
        <div className="section-tertiary">
          <ValueSection />
        </div>
        <div className="section-alternate">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
