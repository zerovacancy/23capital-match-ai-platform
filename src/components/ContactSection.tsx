
import React, { useState } from 'react';
import { Building2, Mail, Phone, Github, Send, Check, Info } from "lucide-react";
import useAnalytics from '@/hooks/use-analytics';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    source: '', // How they heard about us
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const analytics = useAnalytics();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Track when user selects a referral source
    if (name === 'source' && value) {
      analytics.track('source_selection', { selected_source: value });
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // In a real app, you'd submit to a server here
    // This is simulated for demonstration
    setTimeout(() => {
      setFormStatus('success');
      
      // Track successful form submission with analytics
      analytics.trackFormSubmit('contact_form', {
        has_company: !!formData.company,
        source: formData.source,
        message_length: formData.message.length,
      });
      
      // Track the lead source
      analytics.track('lead_captured', {
        referral_source: formData.source || 'Not specified',
        form_location: 'homepage_contact_section'
      });
      
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-[#1c4b7e]">
      {/* Solid background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#1c4b7e]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-white/0"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-display tracking-tight">
            LG Development AI Platform
          </h2>
          <p className="text-xl mb-12 text-white/90">
            Custom-built for LG Development's strategic objectives
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Contact info */}
            <div className="text-left text-white">
              <h3 className="text-xl font-semibold mb-6 text-white/90">Get in touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Corporate Office</div>
                    <div className="text-lg">LG Development Group, Chicago</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Platform Support</div>
                    <div className="text-lg">Internal Tech Team</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Email</div>
                    <div className="text-lg">team@lgdevelopment.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Repository</div>
                    <div className="text-lg">Internal GitLab</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Request Information</h3>
              
              {formStatus === 'success' ? (
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-medium text-gray-800 mb-2">Thank you!</h4>
                  <p className="text-gray-600">
                    Your message has been received. We'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#275E91]"
                      onClick={() => analytics.trackClick('name_field', 'input')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#275E91]"
                      onClick={() => analytics.trackClick('email_field', 'input')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#275E91]"
                      onClick={() => analytics.trackClick('company_field', 'input')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                      How did you hear about us?
                    </label>
                    <select
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#275E91]"
                      onClick={() => analytics.trackClick('source_field', 'select')}
                    >
                      <option value="">Select an option</option>
                      <option value="search">Search Engine</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Referral</option>
                      <option value="event">Event or Conference</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#275E91]"
                      onClick={() => analytics.trackClick('message_field', 'textarea')}
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Info className="w-4 h-4" />
                    <span>All information is kept confidential and secure.</span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-2.5 px-4 rounded-md flex items-center justify-center space-x-2 text-white font-medium transition ${
                      formStatus === 'submitting'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#275E91] hover:bg-[#1c4b7e]'
                    }`}
                    onClick={() => analytics.trackClick('submit_contact_form', 'button')}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
