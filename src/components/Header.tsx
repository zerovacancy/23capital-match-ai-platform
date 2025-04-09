
import React from 'react';
import { Button } from "@/components/ui/button";
import { Building, ChevronRight, Menu, X } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { TabContext } from '../pages/PrototypePage';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isPrototypePage = location.pathname === '/prototype';
  const tabContext = isPrototypePage ? useContext(TabContext) : null;
  
  const [activeSection, setActiveSection] = useState("");
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id') || "";
        }
      });
      
      setActiveSection(current);
    };
    
    if (!isPrototypePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPrototypePage]);

  return (
    <header className={`fixed w-full backdrop-blur-sm shadow-lg border-b border-lg-border/40 ${isPrototypePage ? 'z-10' : 'z-50'} transition-shadow duration-300 ease-in-out top-0`} style={{ backgroundColor: '#F9F9F8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 items-center py-5">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <a href="/" className="flex items-center">
              <img 
                src="/assets/images/global/logos/lg-development/lg-logo.png" 
                alt="LG Development Logo" 
                className="h-24 w-auto object-contain"
              />
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex justify-end col-span-2">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-lg-text hover:text-lg-blue focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Center: Navigation */}
          <nav className="hidden md:flex justify-center space-x-6 col-span-1">
            {isPrototypePage ? (
              <></>
            ) : (
              <>
                <a 
                  href="#division-workflows" 
                  className={cn(
                    "text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium relative px-2 py-1 group whitespace-nowrap text-sm",
                    activeSection === "division-workflows" && "text-lg-blue"
                  )}
                >
                  Workflows
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-lg-blue transform origin-left transition-all duration-300 ease-out",
                    activeSection === "division-workflows" ? "w-full" : "w-0 group-hover:w-full"
                  )}></span>
                </a>
                <a 
                  href="#how-it-works" 
                  className={cn(
                    "text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium relative px-2 py-1 group whitespace-nowrap text-sm",
                    activeSection === "how-it-works" && "text-lg-blue"
                  )}
                >
                  How It Works
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-lg-blue transform origin-left transition-all duration-300 ease-out",
                    activeSection === "how-it-works" ? "w-full" : "w-0 group-hover:w-full"
                  )}></span>
                </a>
                <a 
                  href="#capabilities" 
                  className={cn(
                    "text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium relative px-2 py-1 group whitespace-nowrap text-sm",
                    activeSection === "capabilities" && "text-lg-blue"
                  )}
                >
                  Capabilities
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-lg-blue transform origin-left transition-all duration-300 ease-out",
                    activeSection === "capabilities" ? "w-full" : "w-0 group-hover:w-full"
                  )}></span>
                </a>
                <a 
                  href="#integrations" 
                  className={cn(
                    "text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium relative px-2 py-1 group whitespace-nowrap text-sm",
                    activeSection === "integrations" && "text-lg-blue"
                  )}
                >
                  Integrations
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-lg-blue transform origin-left transition-all duration-300 ease-out",
                    activeSection === "integrations" ? "w-full" : "w-0 group-hover:w-full"
                  )}></span>
                </a>
                <a 
                  href="#architecture" 
                  className={cn(
                    "text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium relative px-2 py-1 group whitespace-nowrap text-sm",
                    activeSection === "architecture" && "text-lg-blue"
                  )}
                >
                  Architecture
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-lg-blue transform origin-left transition-all duration-300 ease-out",
                    activeSection === "architecture" ? "w-full" : "w-0 group-hover:w-full"
                  )}></span>
                </a>
                <a 
                  href="#value" 
                  className={cn(
                    "text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium relative px-2 py-1 group whitespace-nowrap text-sm",
                    activeSection === "value" && "text-lg-blue"
                  )}
                >
                  Value
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-lg-blue transform origin-left transition-all duration-300 ease-out",
                    activeSection === "value" ? "w-full" : "w-0 group-hover:w-full"
                  )}></span>
                </a>
              </>
            )}
          </nav>
          
          {/* Right: CTA Button */}
          <div className="hidden md:flex justify-end">
            {isPrototypePage ? (
              <a href="/" className="transform hover:scale-105 transition-transform duration-300">
                <Button className="btn-primary flex items-center gap-2 px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300">
                  Back to Home <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
            ) : (
              <a href="/prototype" className="transform hover:scale-105 transition-transform duration-300">
                <Button className="btn-primary flex items-center gap-2 px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300">
                  Explore Platform <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div
        className={cn(
          "md:hidden absolute top-[88px] inset-x-0 shadow-lg border-b border-lg-border/40 transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
        style={{ backgroundColor: '#F9F9F8' }}
      >
        <div className="px-4 pt-2 pb-4 space-y-4">
          {isPrototypePage ? (
            <>
              <a href="/" className="block w-full">
                <Button className="w-full btn-primary flex items-center justify-center gap-3 py-4 shadow-md hover:shadow-lg transition-all duration-300">
                  Back to Home <ChevronRight className="h-4 w-4 group-hover:translate-x-1" />
                </Button>
              </a>
            </>
          ) : (
            <>
              <a 
                href="#division-workflows" 
                className={cn(
                  "block py-3 px-4 text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium border-l-2 hover:border-lg-blue hover:bg-lg-blue/5 hover:pl-6",
                  activeSection === "division-workflows" ? "border-lg-blue text-lg-blue bg-lg-blue/5" : "border-transparent"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Workflows
              </a>
              <a 
                href="#how-it-works" 
                className={cn(
                  "block py-3 px-4 text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium border-l-2 hover:border-lg-blue hover:bg-lg-blue/5 hover:pl-6",
                  activeSection === "how-it-works" ? "border-lg-blue text-lg-blue bg-lg-blue/5" : "border-transparent"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#capabilities" 
                className={cn(
                  "block py-3 px-4 text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium border-l-2 hover:border-lg-blue hover:bg-lg-blue/5 hover:pl-6",
                  activeSection === "capabilities" ? "border-lg-blue text-lg-blue bg-lg-blue/5" : "border-transparent"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Capabilities
              </a>
              <a 
                href="#integrations" 
                className={cn(
                  "block py-3 px-4 text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium border-l-2 hover:border-lg-blue hover:bg-lg-blue/5 hover:pl-6",
                  activeSection === "integrations" ? "border-lg-blue text-lg-blue bg-lg-blue/5" : "border-transparent"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Integrations
              </a>
              <a 
                href="#architecture" 
                className={cn(
                  "block py-3 px-4 text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium border-l-2 hover:border-lg-blue hover:bg-lg-blue/5 hover:pl-6",
                  activeSection === "architecture" ? "border-lg-blue text-lg-blue bg-lg-blue/5" : "border-transparent"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Architecture
              </a>
              <a 
                href="#value" 
                className={cn(
                  "block py-3 px-4 text-lg-text hover:text-lg-blue transition-all duration-300 font-display font-medium border-l-2 hover:border-lg-blue hover:bg-lg-blue/5 hover:pl-6",
                  activeSection === "value" ? "border-lg-blue text-lg-blue bg-lg-blue/5" : "border-transparent"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Value
              </a>
              <a href="/prototype" className="block w-full mt-4">
                <Button className="w-full btn-primary flex items-center justify-center gap-3 py-4 shadow-md hover:shadow-lg transition-all duration-300">
                  Explore Platform <ChevronRight className="h-4 w-4 group-hover:translate-x-1" />
                </Button>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
