
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import PrototypePage from "./pages/PrototypePage";
import PlatformPage from "./pages/PlatformPage";
import TestPage from "./pages/TestPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ApiDocs from "./pages/ApiDocs";
import SwaggerDocs from "./pages/SwaggerDocs";
import AlertsPage from "./pages/AlertsPage";
import Analytics from "@/lib/analytics";

const queryClient = new QueryClient();

// Analytics tracker component
const AnalyticsTracker = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Initialize analytics once on first render
  useEffect(() => {
    Analytics.initializeAnalytics();
  }, []);

  // Track page views when location changes
  useEffect(() => {
    const currentPath = location.pathname + location.search;
    const pageTitle = document.title || `Page: ${location.pathname}`;
    
    // Track page view with navigation type
    Analytics.trackPageView(currentPath, pageTitle);
    Analytics.trackEvent('navigation', {
      navigation_type: navigationType,
      from_path: document.referrer,
      to_path: currentPath,
    });
  }, [location, navigationType]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Analytics tracker */}
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/prototype" element={<PrototypePage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/docs" element={<SwaggerDocs />} />
          <Route path="/alerts" element={<AlertsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
