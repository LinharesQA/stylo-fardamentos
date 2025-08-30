import React from 'react';
import { useSecurity } from '@/hooks/useSecurity';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface SecureFormProps {
  children: React.ReactNode;
  onSubmit: (data: Record<string, any>) => void;
  endpoint?: string;
  className?: string;
}

export const SecureForm: React.FC<SecureFormProps> = ({
  children,
  onSubmit,
  endpoint = '/api/contact',
  className = ''
}) => {
  const { sanitizeAndValidate, reportSecurityIssue } = useSecurity();
  const [errors, setErrors] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      // Extract form data
      const formData = new FormData(e.currentTarget);
      const data: Record<string, any> = {};
      
      for (const [key, value] of formData.entries()) {
        data[key] = value.toString();
      }

      // Sanitize and validate
      const { isValid, sanitized, errors: validationErrors } = sanitizeAndValidate(data);

      if (!isValid) {
        setErrors(validationErrors);
        reportSecurityIssue('Form validation failed', { errors: validationErrors });
        return;
      }

      // Call parent handler with sanitized data
      await onSubmit(sanitized);
      
    } catch (error) {
      setErrors(['An unexpected error occurred. Please try again.']);
      reportSecurityIssue('Form submission error', { error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {errors.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <fieldset disabled={isSubmitting}>
        {children}
      </fieldset>
    </form>
  );
};

export default SecureForm;
