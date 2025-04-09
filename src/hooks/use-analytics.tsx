import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Analytics from '@/lib/analytics';

/**
 * Custom hook for convenient access to analytics tracking functions
 * This makes it easier to implement tracking in any component
 */
export const useAnalytics = () => {
  const location = useLocation();
  
  // Track user clicking on elements
  const trackClick = useCallback((
    elementName: string, 
    elementType: string = 'button',
    properties: Record<string, any> = {}
  ) => {
    Analytics.trackInteraction(elementType, 'click', elementName, undefined);
    
    // Add extra details to the event
    Analytics.trackEvent('element_click', {
      element_name: elementName,
      element_type: elementType,
      page_path: location.pathname,
      ...properties
    });
  }, [location.pathname]);
  
  // Track form submissions
  const trackFormSubmit = useCallback((
    formName: string,
    formData: Record<string, any> = {}
  ) => {
    Analytics.trackFormSubmission(formName, formData);
  }, []);
  
  // Track viewing specific content
  const trackContentView = useCallback((
    contentId: string,
    contentType: string,
    contentTitle?: string
  ) => {
    Analytics.trackContentView(contentId, contentType);
    
    // Track with additional metadata
    Analytics.trackEvent('content_view', {
      content_id: contentId, 
      content_type: contentType,
      content_title: contentTitle,
      page_path: location.pathname
    });
  }, [location.pathname]);
  
  // Track user starting a specific flow
  const trackFlowStart = useCallback((
    flowName: string,
    properties: Record<string, any> = {}
  ) => {
    Analytics.trackEvent('flow_start', {
      flow_name: flowName,
      page_path: location.pathname,
      ...properties
    });
  }, [location.pathname]);
  
  // Track user completing a flow
  const trackFlowComplete = useCallback((
    flowName: string,
    timeSpentSeconds?: number,
    properties: Record<string, any> = {}
  ) => {
    Analytics.trackEvent('flow_complete', {
      flow_name: flowName,
      time_spent_seconds: timeSpentSeconds,
      page_path: location.pathname,
      ...properties
    });
  }, [location.pathname]);
  
  // Track custom events with a simpler interface
  const track = useCallback((
    eventName: string,
    properties: Record<string, any> = {}
  ) => {
    Analytics.trackEvent(eventName, {
      page_path: location.pathname,
      ...properties
    });
  }, [location.pathname]);
  
  return {
    trackClick,
    trackFormSubmit,
    trackContentView,
    trackFlowStart,
    trackFlowComplete,
    track
  };
};

export default useAnalytics;