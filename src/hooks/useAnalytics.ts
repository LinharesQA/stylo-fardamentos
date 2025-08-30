import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/lib/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    const trackPageView = () => {
      // Add small delay to ensure DOM is updated
      setTimeout(() => {
        analytics.trackPageView(
          document.title,
          window.location.href
        );
      }, 100);
    };

    trackPageView();
  }, [location]);

  // Conversion tracking helpers
  const trackFormSubmission = useCallback((formName: string, formData?: Record<string, any>) => {
    analytics.trackFormSubmission(formName, formData);
  }, []);

  const trackCTAClick = useCallback((ctaName: string, ctaLocation: string) => {
    analytics.trackCTAClick(ctaName, ctaLocation);
  }, []);

  const trackWhatsAppClick = useCallback((source: string) => {
    analytics.trackWhatsAppClick(source);
  }, []);

  const trackPhoneClick = useCallback((source: string) => {
    analytics.trackPhoneClick(source);
  }, []);

  const trackEmailClick = useCallback((source: string) => {
    analytics.trackEmailClick(source);
  }, []);

  const trackCustomEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    analytics.trackEvent(eventName, parameters);
  }, []);

  return {
    trackFormSubmission,
    trackCTAClick,
    trackWhatsAppClick,
    trackPhoneClick,
    trackEmailClick,
    trackCustomEvent
  };
};