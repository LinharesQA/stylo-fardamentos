import { useState, useCallback } from 'react';
import { useSanitize } from '@/lib/sanitize';

interface SecurityHookReturn {
  isSecureInput: (input: string) => boolean;
  sanitizeAndValidate: (data: Record<string, any>) => { isValid: boolean; sanitized: Record<string, any>; errors: string[] };
  reportSecurityIssue: (issue: string, context?: any) => void;
}

export const useSecurity = (): SecurityHookReturn => {
  const { sanitizeFormData, isValidEmail, isValidPhone } = useSanitize();
  const [securityLog] = useState<Array<{ timestamp: number; issue: string; context?: any }>>([]);

  const isSecureInput = useCallback((input: string): boolean => {
    if (!input || typeof input !== 'string') return false;
    
    // Check for common XSS patterns
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /data:text\/html/gi,
      /vbscript:/gi
    ];
    
    return !xssPatterns.some(pattern => pattern.test(input));
  }, []);

  const sanitizeAndValidate = useCallback((data: Record<string, any>) => {
    const errors: string[] = [];
    const sanitized = sanitizeFormData(data);
    
    // Validate each field
    for (const [key, value] of Object.entries(sanitized)) {
      if (typeof value === 'string') {
        if (!isSecureInput(value)) {
          errors.push(`Invalid characters detected in ${key}`);
        }
        
        // Field-specific validation
        if (key === 'email' && value && !isValidEmail(value)) {
          errors.push('Invalid email format');
        }
        
        if (key === 'telefone' && value && !isValidPhone(value)) {
          errors.push('Invalid phone format');
        }
        
        // Length validation
        if (value.length > 1000) {
          errors.push(`${key} is too long (maximum 1000 characters)`);
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      sanitized,
      errors
    };
  }, [sanitizeFormData, isSecureInput, isValidEmail, isValidPhone]);

  const reportSecurityIssue = useCallback((issue: string, context?: any) => {
    const report = {
      timestamp: Date.now(),
      issue,
      context: context ? JSON.stringify(context) : undefined,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    securityLog.push(report);
    
    // In production, you would send this to your security monitoring service
    console.warn('Security Issue Reported:', report);
    
    // Store locally for debugging (limit to last 100 entries)
    const stored = localStorage.getItem('security_log') || '[]';
    try {
      const log = JSON.parse(stored);
      log.push(report);
      
      // Keep only last 100 entries
      if (log.length > 100) {
        log.splice(0, log.length - 100);
      }
      
      localStorage.setItem('security_log', JSON.stringify(log));
    } catch (e) {
      // If parsing fails, start fresh
      localStorage.setItem('security_log', JSON.stringify([report]));
    }
  }, [securityLog]);

  return {
    isSecureInput,
    sanitizeAndValidate,
    reportSecurityIssue
  };
};