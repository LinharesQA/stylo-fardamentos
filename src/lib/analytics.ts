declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
}

export interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  items?: unknown[];
  [key: string]: unknown;
}

class Analytics {
  private gaId: string | null = null;
  private fbPixelId: string | null = null;
  private gadsConversionId: string | null = null;
  private isEnabled: boolean = false;
  private utmParams: UTMParams = {};
  private readonly UTM_STORAGE_KEY = 'stylo_utm_params';
  private readonly UTM_PERSISTENT_KEY = 'stylo_utm_persistent';
  private readonly CONSENT_KEY = 'stylo_analytics_consent';

  constructor() {
    this.gaId = import.meta.env.VITE_GA4_ID || null;
    this.fbPixelId = import.meta.env.VITE_FB_PIXEL_ID || null;
    this.gadsConversionId = import.meta.env.VITE_GADS_CONVERSION_ID || null;
    this.initializeUTMTracking();
  }

  private initializeUTMTracking(): void {
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentUTM: UTMParams = {
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
      referrer: document.referrer || undefined,
      landing_page: window.location.href,
    };

    // Remove undefined values
    Object.keys(currentUTM).forEach(key => {
      if (currentUTM[key as keyof UTMParams] === undefined) {
        delete currentUTM[key as keyof UTMParams];
      }
    });

    // Store UTM params if any exist (both session and persistent)
    if (Object.keys(currentUTM).length > 0) {
      this.utmParams = currentUTM;
      sessionStorage.setItem(this.UTM_STORAGE_KEY, JSON.stringify(currentUTM));
      localStorage.setItem(this.UTM_PERSISTENT_KEY, JSON.stringify(currentUTM));
    } else {
      // Try to get existing UTM params from sessionStorage first, then localStorage
      const sessionStored = sessionStorage.getItem(this.UTM_STORAGE_KEY);
      const persistentStored = localStorage.getItem(this.UTM_PERSISTENT_KEY);
      
      if (sessionStored) {
        this.utmParams = JSON.parse(sessionStored);
      } else if (persistentStored) {
        this.utmParams = JSON.parse(persistentStored);
        // Copy to session storage for this session
        sessionStorage.setItem(this.UTM_STORAGE_KEY, persistentStored);
      }
    }
  }

  private loadGTag(): Promise<void> {
    if (!this.gaId) {
      return Promise.reject('GA4 ID not configured');
    }

    return new Promise((resolve, reject) => {
      if (window.gtag) {
        // Configure Google Ads conversion if ID exists
        if (this.gadsConversionId) {
          window.gtag('config', this.gadsConversionId);
        }
        resolve();
        return;
      }

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(Array.from(arguments));
      };

      // Load gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
      script.onload = () => {
        window.gtag('js', new Date());
        window.gtag('config', this.gaId!, {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        });
        
        // Configure Google Ads conversion if ID exists
        if (this.gadsConversionId) {
          window.gtag('config', this.gadsConversionId);
        }
        
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  private loadFacebookPixel(): Promise<void> {
    if (!this.fbPixelId) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      if (window.fbq) {
        resolve();
        return;
      }

      // Facebook Pixel Code
      const fbq = window.fbq = window.fbq || function() {
        (window.fbq.q = window.fbq.q || []).push(Array.from(arguments));
      };
      
      if (!window._fbq) window._fbq = fbq;
      
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.onload = () => {
        window.fbq('init', this.fbPixelId!);
        window.fbq('track', 'PageView');
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  async initialize(): Promise<void> {
    const consent = this.getConsent();
    if (consent === null) {
      // Consent not given yet, don't initialize
      return;
    }

    if (consent === true) {
      const promises = [];
      
      if (this.gaId) {
        promises.push(this.loadGTag());
      }
      
      if (this.fbPixelId) {
        promises.push(this.loadFacebookPixel());
      }
      
      await Promise.all(promises);
      this.isEnabled = true;
      this.trackPageView();
    }
  }

  setConsent(granted: boolean): void {
    localStorage.setItem(this.CONSENT_KEY, granted.toString());
    
    if (granted && !this.isEnabled) {
      this.initialize();
    } else if (!granted && this.isEnabled) {
      this.disable();
    }
  }

  getConsent(): boolean | null {
    const consent = localStorage.getItem(this.CONSENT_KEY);
    if (consent === null) return null;
    return consent === 'true';
  }

  private disable(): void {
    this.isEnabled = false;
    // Disable Google Analytics
    if (window.gtag && this.gaId) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  }

  trackPageView(page_title?: string, page_location?: string): void {
    if (!this.isEnabled) return;

    const eventData = {
      page_title: page_title || document.title,
      page_location: page_location || window.location.href,
      ...this.utmParams
    };

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'page_view', eventData);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView', this.utmParams);
    }
  }

  trackEvent(eventName: string, parameters: Record<string, unknown> = {}): void {
    if (!this.isEnabled) return;

    const eventData = {
      ...parameters,
      ...this.utmParams
    };

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }
  }

  trackConversion(event: ConversionEvent): void {
    if (!this.isEnabled) return;

    const conversionData = {
      ...event,
      ...this.utmParams
    };

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', event.event_name, conversionData);
      
      // Google Ads conversion tracking for specific events
      if (this.gadsConversionId && event.event_name === 'generate_lead') {
        window.gtag('event', 'conversion', {
          send_to: `${this.gadsConversionId}/lead_conversion`,
          value: event.value || 100,
          currency: event.currency || 'BRL',
          ...this.utmParams
        });
      }
    }

    // Facebook Pixel conversion tracking
    if (window.fbq) {
      const fbEventName = event.event_name === 'generate_lead' ? 'Lead' :
                         event.event_name === 'contact_whatsapp' ? 'Contact' :
                         event.event_name === 'contact_phone' ? 'Contact' :
                         event.event_name === 'contact_email' ? 'Contact' :
                         'CustomEvent';
      
      window.fbq('track', fbEventName, {
        value: event.value || 100,
        currency: event.currency || 'BRL',
        content_name: event.form_name || event.contact_method || 'conversion',
        ...this.utmParams
      });
    }
  }

  // Predefined conversion events
  trackFormSubmission(formName: string, formData?: Record<string, unknown>): void {
    this.trackConversion({
      event_name: 'generate_lead',
      currency: 'BRL',
      value: 100, // Estimated lead value
      form_name: formName,
      ...formData
    });
  }

  trackCTAClick(ctaName: string, ctaLocation: string): void {
    this.trackEvent('cta_click', {
      cta_name: ctaName,
      cta_location: ctaLocation
    });

    // Facebook Pixel for CTA clicks
    if (window.fbq && this.isEnabled) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: ctaName,
        content_category: 'CTA',
        ...this.utmParams
      });
    }
  }

  trackWhatsAppClick(source: string): void {
    this.trackConversion({
      event_name: 'contact_whatsapp',
      contact_method: 'whatsapp',
      contact_source: source
    });
  }

  trackPhoneClick(source: string): void {
    this.trackConversion({
      event_name: 'contact_phone',
      contact_method: 'phone',
      contact_source: source
    });
  }

  trackEmailClick(source: string): void {
    this.trackConversion({
      event_name: 'contact_email',
      contact_method: 'email',
      contact_source: source
    });
  }

  // Get UTM params for external use
  getUTMParams(): UTMParams {
    return { ...this.utmParams };
  }
}

export const analytics = new Analytics();

// Auto-initialize on import if consent is already given
analytics.initialize();