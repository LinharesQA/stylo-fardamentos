export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
  timestamp?: string;
}

export class UTMManager {
  private static readonly SESSION_KEY = 'stylo_utm_session';
  private static readonly PERSISTENT_KEY = 'stylo_utm_persistent';
  private static readonly EXPIRE_DAYS = 30;

  static captureUTMParameters(): UTMParameters {
    const urlParams = new URLSearchParams(window.location.search);
    const params: UTMParameters = {};

    // Standard UTM parameters
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) params[key as keyof UTMParameters] = value;
    });

    // Google Ads click ID
    const gclid = urlParams.get('gclid');
    if (gclid) params.gclid = gclid;

    // Facebook click ID
    const fbclid = urlParams.get('fbclid');
    if (fbclid) params.fbclid = fbclid;

    // Additional context
    params.referrer = document.referrer || '';
    params.landing_page = window.location.href;
    params.timestamp = new Date().toISOString();

    return params;
  }

  static storeUTMParameters(params: UTMParameters): void {
    const hasUTMData = Object.keys(params).some(key => 
      key.startsWith('utm_') || key === 'gclid' || key === 'fbclid'
    );

    if (hasUTMData) {
      // Store in session storage (for current session)
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(params));
      
      // Store in local storage with expiration (for attribution window)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + this.EXPIRE_DAYS);
      
      const persistentData = {
        params,
        expires: expirationDate.toISOString()
      };
      
      localStorage.setItem(this.PERSISTENT_KEY, JSON.stringify(persistentData));
    }
  }

  static getUTMParameters(): UTMParameters {
    // Try session storage first
    const sessionData = sessionStorage.getItem(this.SESSION_KEY);
    if (sessionData) {
      try {
        return JSON.parse(sessionData);
      } catch (e) {
        console.warn('Error parsing session UTM data:', e);
      }
    }

    // Fall back to persistent storage
    const persistentData = localStorage.getItem(this.PERSISTENT_KEY);
    if (persistentData) {
      try {
        const { params, expires } = JSON.parse(persistentData);
        
        // Check if data has expired
        if (new Date() < new Date(expires)) {
          // Copy to session storage for this session
          sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(params));
          return params;
        } else {
          // Remove expired data
          localStorage.removeItem(this.PERSISTENT_KEY);
        }
      } catch (e) {
        console.warn('Error parsing persistent UTM data:', e);
      }
    }

    return {};
  }

  static clearUTMParameters(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.PERSISTENT_KEY);
  }

  static attachUTMToEvent(eventData: Record<string, any>): Record<string, any> {
    const utmParams = this.getUTMParameters();
    return {
      ...eventData,
      ...utmParams
    };
  }

  static getAttributionString(): string {
    const params = this.getUTMParameters();
    
    if (params.utm_source) {
      return `${params.utm_source}/${params.utm_medium || 'unknown'}/${params.utm_campaign || 'unknown'}`;
    }
    
    if (params.gclid) {
      return 'google/cpc/google_ads';
    }
    
    if (params.fbclid) {
      return 'facebook/cpc/facebook_ads';
    }
    
    if (params.referrer) {
      try {
        const referrerDomain = new URL(params.referrer).hostname;
        return `${referrerDomain}/referral/organic`;
      } catch (e) {
        return 'direct/none/direct';
      }
    }
    
    return 'direct/none/direct';
  }

  static isFromPaidTraffic(): boolean {
    const params = this.getUTMParameters();
    return !!(params.gclid || params.fbclid || 
      params.utm_medium === 'cpc' || 
      params.utm_medium === 'ppc' ||
      params.utm_medium === 'paid' ||
      params.utm_source === 'google' && params.utm_medium === 'cpc');
  }
}

// Auto-initialize on module load
if (typeof window !== 'undefined') {
  const urlParams = UTMManager.captureUTMParameters();
  UTMManager.storeUTMParameters(urlParams);
}