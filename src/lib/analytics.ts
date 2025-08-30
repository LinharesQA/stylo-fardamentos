declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
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
  items?: any[];
  [key: string]: any;
}

class Analytics {
  private gaId: string | null = null;
  private isEnabled: boolean = false;
  private utmParams: UTMParams = {};
  private readonly UTM_STORAGE_KEY = 'stylo_utm_params';
  private readonly CONSENT_KEY = 'stylo_analytics_consent';

  constructor() {
    this.gaId = import.meta.env.VITE_GA4_ID || null;
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

    // Store UTM params if any exist
    if (Object.keys(currentUTM).length > 0) {
      this.utmParams = currentUTM;
      sessionStorage.setItem(this.UTM_STORAGE_KEY, JSON.stringify(currentUTM));
    } else {
      // Try to get existing UTM params from sessionStorage
      const stored = sessionStorage.getItem(this.UTM_STORAGE_KEY);
      if (stored) {
        this.utmParams = JSON.parse(stored);
      }
    }
  }

  private loadGTag(): Promise<void> {
    if (!this.gaId) {
      return Promise.reject('GA4 ID not configured');
    }

    return new Promise((resolve, reject) => {
      if (window.gtag) {
        resolve();
        return;
      }

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
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
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async initialize(): Promise<void> {
    if (!this.gaId) {
      console.warn('Analytics: GA4 ID not configured');
      return;
    }

    const consent = this.getConsent();
    if (consent === null) {
      // Consent not given yet, don't initialize
      return;
    }

    if (consent === true) {
      await this.loadGTag();
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
        analytics_storage: 'denied'
      });
    }
  }

  trackPageView(page_title?: string, page_location?: string): void {
    if (!this.isEnabled || !window.gtag) return;

    const eventData = {
      page_title: page_title || document.title,
      page_location: page_location || window.location.href,
      ...this.utmParams
    };

    window.gtag('event', 'page_view', eventData);
  }

  trackEvent(eventName: string, parameters: Record<string, any> = {}): void {
    if (!this.isEnabled || !window.gtag) return;

    const eventData = {
      ...parameters,
      ...this.utmParams
    };

    window.gtag('event', eventName, eventData);
  }

  trackConversion(event: ConversionEvent): void {
    if (!this.isEnabled || !window.gtag) return;

    const conversionData = {
      ...event,
      ...this.utmParams
    };

    window.gtag('event', event.event_name, conversionData);
  }

  // Predefined conversion events
  trackFormSubmission(formName: string, formData?: Record<string, any>): void {
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