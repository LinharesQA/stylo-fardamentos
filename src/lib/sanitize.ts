import DOMPurify from 'dompurify';

export interface SanitizeOptions {
  ALLOWED_TAGS?: string[];
  ALLOWED_ATTR?: string[];
  FORBID_TAGS?: string[];
  FORBID_ATTR?: string[];
}

class Sanitizer {
  private static readonly DEFAULT_CONFIG: SanitizeOptions = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p'],
    ALLOWED_ATTR: [],
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur', 'onchange']
  };

  static sanitizeHTML(dirty: string, options?: SanitizeOptions): string {
    if (!dirty || typeof dirty !== 'string') {
      return '';
    }

    const config = { ...this.DEFAULT_CONFIG, ...options };
    
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: config.ALLOWED_TAGS,
      ALLOWED_ATTR: config.ALLOWED_ATTR,
      FORBID_TAGS: config.FORBID_TAGS,
      FORBID_ATTR: config.FORBID_ATTR,
      USE_PROFILES: { html: true }
    });
  }

  static sanitizeText(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return DOMPurify.sanitize(text, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true
    });
  }

  static sanitizeFormData(data: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeText(value).trim();
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map(item => 
          typeof item === 'string' ? this.sanitizeText(item).trim() : item
        );
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }

  static isValidEmail(email: string): boolean {
    const sanitized = this.sanitizeText(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitized);
  }

  static isValidPhone(phone: string): boolean {
    const sanitized = this.sanitizeText(phone);
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(sanitized);
  }

  static sanitizeURL(url: string): string {
    if (!url || typeof url !== 'string') {
      return '';
    }

    try {
      const parsedUrl = new URL(url);
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return '';
      }
      return parsedUrl.toString();
    } catch {
      return '';
    }
  }
}

// React hook for sanitizing content
export const useSanitize = () => {
  const sanitizeHTML = (content: string, options?: SanitizeOptions) => {
    return Sanitizer.sanitizeHTML(content, options);
  };

  const sanitizeText = (content: string) => {
    return Sanitizer.sanitizeText(content);
  };

  const sanitizeFormData = (data: Record<string, any>) => {
    return Sanitizer.sanitizeFormData(data);
  };

  return {
    sanitizeHTML,
    sanitizeText,
    sanitizeFormData,
    isValidEmail: Sanitizer.isValidEmail,
    isValidPhone: Sanitizer.isValidPhone,
    sanitizeURL: Sanitizer.sanitizeURL
  };
};

export default Sanitizer;