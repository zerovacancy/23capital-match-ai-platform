// Analytics utility functions for tracking user behavior
// This file provides enhanced Google Analytics tracking to capture detailed user metrics

// Types for the global gtag function that comes from the Google Analytics script
interface Window {
  gtag?: (command: string, action: string, params?: any) => void;
  dataLayer?: any[];
}

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
    dataLayer?: any[];
  }
}

/**
 * Tracks a page view in Google Analytics
 * @param url The url of the page being viewed
 * @param title The title of the page being viewed
 */
export const trackPageView = (url: string, title: string) => {
  if (!window.gtag) {
    console.warn('Google Analytics not loaded');
    return;
  }
  
  window.gtag('config', 'G-2LHGMHHGJR', {
    page_path: url,
    page_title: title,
    page_location: window.location.href
  });

  console.debug(`[Analytics] Tracked page view: ${title} (${url})`);
};

/**
 * Tracks a custom event in Google Analytics
 * @param eventName The name of the event
 * @param eventParams Additional parameters to track with the event
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (!window.gtag) {
    console.warn('Google Analytics not loaded');
    return;
  }

  // Add timestamp and URL to event data
  const enhancedParams = {
    ...eventParams,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    referrer: document.referrer || 'direct',
  };
  
  window.gtag('event', eventName, enhancedParams);
  
  console.debug(`[Analytics] Tracked event: ${eventName}`, enhancedParams);
};

/**
 * Tracks a user interaction with a specific element
 * @param category The category of the interaction (e.g., 'Button', 'Link', 'Form')
 * @param action The action taken (e.g., 'Click', 'Submit', 'Hover')
 * @param label Optional label for the interaction
 * @param value Optional numeric value associated with the interaction
 */
export const trackInteraction = (category: string, action: string, label?: string, value?: number) => {
  trackEvent('user_interaction', {
    event_category: category,
    event_action: action,
    event_label: label,
    event_value: value,
  });
};

/**
 * Tracks a form submission
 * @param formName The name of the form
 * @param formData Optional data from the form (should be anonymized/sanitized if sensitive)
 */
export const trackFormSubmission = (formName: string, formData: Record<string, any> = {}) => {
  trackEvent('form_submission', {
    form_name: formName,
    // Only include safe form data fields
    form_data: JSON.stringify(sanitizeFormData(formData)),
  });
};

/**
 * Tracks user engagement metrics
 * @param timeSpentSeconds How long the user has spent on the page
 * @param scrollDepthPercent How far down the page the user has scrolled
 */
export const trackEngagement = (timeSpentSeconds: number, scrollDepthPercent: number) => {
  trackEvent('user_engagement', {
    time_spent_seconds: timeSpentSeconds,
    scroll_depth_percent: scrollDepthPercent,
  });
};

/**
 * Track when a user accesses specific content
 * @param contentId ID or name of the content
 * @param contentType Type of content (e.g., 'pdf', 'video', 'article')
 */
export const trackContentView = (contentId: string, contentType: string) => {
  trackEvent('content_view', {
    content_id: contentId,
    content_type: contentType,
  });
};

/**
 * Removes potentially sensitive information from form data
 * @param formData The form data to sanitize
 * @returns Sanitized form data
 */
const sanitizeFormData = (formData: Record<string, any>): Record<string, any> => {
  const sensitiveFields = ['password', 'credit_card', 'ssn', 'social', 'card', 'cvv', 'cvc', 'secret'];
  const sanitized: Record<string, any> = {};
  
  Object.keys(formData).forEach(key => {
    if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
      sanitized[key] = '[REDACTED]';
    } else {
      sanitized[key] = formData[key];
    }
  });
  
  return sanitized;
};

/**
 * Initialize enhanced tracking features
 */
export const initializeAnalytics = () => {
  // Track initial page view
  trackPageView(window.location.pathname, document.title);
  
  // Set up tracking for user demographics and interests
  if (window.gtag) {
    window.gtag('set', 'user_properties', {
      app_version: '1.0.0',
      platform: 'web',
    });
  }
  
  // Set up visibility tracking
  setupVisibilityTracking();
  
  // Set up session timing
  setupSessionTracking();
  
  // Track referrer information
  if (document.referrer) {
    trackEvent('referral', {
      referrer_url: document.referrer,
      landing_page: window.location.pathname,
    });
  }
  
  console.debug('[Analytics] Initialization complete');
};

/**
 * Set up tracking for page visibility changes
 */
const setupVisibilityTracking = () => {
  let startHiddenTime: number | null = null;
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      startHiddenTime = Date.now();
      trackEvent('page_hidden');
    } else if (startHiddenTime) {
      const hiddenDuration = (Date.now() - startHiddenTime) / 1000;
      trackEvent('page_visible', {
        hidden_duration_seconds: hiddenDuration,
      });
      startHiddenTime = null;
    }
  });
};

/**
 * Set up tracking for user session
 */
const setupSessionTracking = () => {
  const sessionStartTime = Date.now();
  let scrollDepth = 0;
  
  // Track maximum scroll depth
  window.addEventListener('scroll', () => {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackLength = documentHeight - windowHeight;
    const currentScrollDepth = Math.floor((scrollTop / trackLength) * 100);
    
    if (currentScrollDepth > scrollDepth) {
      scrollDepth = currentScrollDepth;
      
      // Report scroll depth at thresholds
      if (scrollDepth === 25 || scrollDepth === 50 || scrollDepth === 75 || scrollDepth === 90) {
        trackEvent('scroll_depth', {
          scroll_depth_percent: scrollDepth,
        });
      }
    }
  });
  
  // Report session data when user leaves
  window.addEventListener('beforeunload', () => {
    const sessionDuration = (Date.now() - sessionStartTime) / 1000;
    
    trackEngagement(sessionDuration, scrollDepth);
    
    // Also track bounce rate (if session < 30 seconds and only 1 page viewed)
    if (sessionDuration < 30 && window.performance) {
      const navigationEntries = window.performance.getEntriesByType('navigation');
      if (navigationEntries.length === 1) {
        trackEvent('bounce', {
          session_duration_seconds: sessionDuration,
        });
      }
    }
  });
};

export default {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackInteraction,
  trackFormSubmission,
  trackEngagement,
  trackContentView,
};