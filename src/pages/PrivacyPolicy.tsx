import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const PrivacyPolicy = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-4xl py-12">
          <h1 className="text-3xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">Effective Date: April 15, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="mb-4">
                This privacy policy outlines how we collect, use, and protect information through our 
                AI-powered real estate tools and GPT integrations, including API-powered features such as 
                zoning lookups, investor matching, capital tracking, and market analytics ("Actions").
              </p>
              <p>
                By using these tools or interacting with our Custom GPT assistant, you agree to the 
                practices described in this Privacy Policy.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We do not collect personal or sensitive information unless explicitly provided by you for 
                business purposes. Any data submitted through API actions is used solely to process your request.
              </p>
              <p className="mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Property addresses or parcel numbers (for zoning or land use lookups)</li>
                <li>Limited Partner (LP) preferences (for deal matching)</li>
                <li>Market filters (e.g., cities, asset types, financial criteria)</li>
                <li>Email addresses or notes (only if explicitly provided in your prompts)</li>
              </ul>
              <p>
                No financial account numbers, passwords, or personally identifiable information (PII) 
                are required or stored.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
              <p className="mb-4">The information you provide is used only for:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Performing the requested action (e.g., looking up zoning, running a site fit analysis, generating reports)</li>
                <li>Matching project details with LP investment criteria</li>
                <li>Providing summaries and reports based on structured inputs</li>
                <li>Helping you manage your real estate pipeline or investor outreach</li>
              </ul>
              <p>
                We do not use your data for advertising, and we never sell or share it with third parties.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Retention</h2>
              <p className="mb-4">
                We do not store any input data long-term.
              </p>
              <p className="mb-4">
                If temporary caching or session storage is used to process a request, that data is 
                deleted after the operation is complete.
              </p>
              <p>
                You are responsible for storing or saving the responses you receive if you wish to retain them.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party APIs</h2>
              <p className="mb-4">
                Some actions use third-party APIs (e.g., ArcGIS, public zoning databases, or real estate data sources). 
                We do not control their data handling practices.
              </p>
              <p>
                We only connect to trusted APIs that are designed for public or business use, and we do not 
                send any unnecessary personal data to these services.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Security</h2>
              <p className="mb-4">
                All data transmission is encrypted via HTTPS.
              </p>
              <p>
                We apply industry best practices to ensure the security of any data temporarily handled during processing.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">You may contact us at any time to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Request deletion of specific data you've shared (if retained temporarily)</li>
                <li>Ask questions about how a particular action processes data</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy as we add new features or integrate new services. 
                The updated version will be posted at the same URL with a revised effective date.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or how your data is handled, please contact us at:
              </p>
              <p className="mb-2">
                <strong>Email:</strong> <a href="mailto:m@learsi.co" className="text-primary hover:underline">m@learsi.co</a>
              </p>
              <p>
                <strong>Website:</strong> <a href="https://capital-match-ai-platform.vercel.app/privacy" className="text-primary hover:underline">https://capital-match-ai-platform.vercel.app/privacy</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;