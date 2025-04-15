import React from 'react';
import { Building, ChevronRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-[#F8F5F0] rounded-md mr-4">
                <Building className="w-6 h-6 text-[#275E91]" />
              </div>
              <img 
                src="/assets/images/global/logos/lg-development/lg-logo.png" 
                alt="LG Development Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              LG Development is a leading multifamily real estate development company, focused on creating exceptional spaces while maximizing returns for our investors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-[#F8F5F0] rounded-md text-[#275E91] hover:bg-[#275E91]/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="p-2 bg-[#F8F5F0] rounded-md text-[#275E91] hover:bg-[#275E91]/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="p-2 bg-[#F8F5F0] rounded-md text-[#275E91] hover:bg-[#275E91]/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-4">Platform</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#capabilities" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Capabilities
                    </a>
                  </li>
                  <li>
                    <a href="#architecture" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Architecture
                    </a>
                  </li>
                  <li>
                    <a href="#timeline" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Timeline
                    </a>
                  </li>
                  <li>
                    <a href="#integrations" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Integrations
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="/privacy" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-[#275E91] transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#275E91] mr-2 transition-colors"></span>
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} LG Development. All rights reserved.
          </div>
          
          <div className="text-sm text-gray-500">
            <span>Designed and developed with </span>
            <span className="text-[#275E91]">❤</span>
            <span> for LG Development</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;