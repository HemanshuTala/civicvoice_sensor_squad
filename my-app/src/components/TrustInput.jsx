import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const TrustInput = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  size = 'md',
  variant = 'default',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  inputClassName = '',
  id,
  name,
  ...props
}, ref) => {
  // Generate unique ID if not provided
  const inputId = id || `trust-input-${Math.random().toString(36).substr(2, 9)}`;

  // Base input classes
  const baseInputClasses = `
    w-full border rounded-lg transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
    trust-font-family
  `;

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  // State-based classes
  const getStateClasses = () => {
    if (error) {
      return `
        border-trust-danger text-trust-danger
        focus:border-trust-danger focus:ring-trust-danger/20
        bg-trust-danger/5
      `;
    }
    if (success) {
      return `
        border-trust-success text-trust-success
        focus:border-trust-success focus:ring-trust-success/20
        bg-trust-success/5
      `;
    }
    return `
      border-trust-border-medium text-trust-text-primary
      focus:border-trust-primary focus:ring-trust-primary/20
      bg-white hover:border-trust-border-dark
    `;
  };

  // Icon padding adjustment
  const iconPaddingClasses = Icon ? (
    iconPosition === 'left' ? 'pl-10' : 'pr-10'
  ) : '';

  // Combine input classes
  const inputClasses = `
    ${baseInputClasses}
    ${sizeClasses[size]}
    ${getStateClasses()}
    ${iconPaddingClasses}
    ${inputClassName}
  `.replace(/\s+/g, ' ').trim();

  // Label classes
  const labelClasses = `
    block text-sm font-medium mb-2 trust-font-family
    ${error ? 'text-trust-danger' : success ? 'text-trust-success' : 'text-trust-text-secondary'}
  `;

  // Helper text classes
  const helperTextClasses = `
    mt-2 text-sm trust-font-family flex items-center
    ${error ? 'text-trust-danger' : success ? 'text-trust-success' : 'text-trust-text-tertiary'}
  `;

  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="text-trust-danger ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${
              error ? 'text-trust-danger' : 
              success ? 'text-trust-success' : 
              'text-trust-text-tertiary'
            }`} />
          </div>
        )}

        {/* Input Field */}
        {type === 'textarea' ? (
          <textarea
            ref={ref}
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            className={inputClasses}
            rows={4}
            aria-describedby={
              error || success || helperText ? `${inputId}-helper` : undefined
            }
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            type={type}
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            className={inputClasses}
            aria-describedby={
              error || success || helperText ? `${inputId}-helper` : undefined
            }
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
        )}

        {/* Right Icon */}
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${
              error ? 'text-trust-danger' : 
              success ? 'text-trust-success' : 
              'text-trust-text-tertiary'
            }`} />
          </div>
        )}

        {/* Status Icons */}
        {(error || success) && !Icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {error && <FaExclamationCircle className="h-5 w-5 text-trust-danger" />}
            {success && <FaCheckCircle className="h-5 w-5 text-trust-success" />}
          </div>
        )}
      </div>

      {/* Helper Text / Error Message */}
      {(error || success || helperText) && (
        <div id={`${inputId}-helper`} className={helperTextClasses}>
          {error && <FaExclamationCircle className="h-4 w-4 mr-1 flex-shrink-0" />}
          {success && <FaCheckCircle className="h-4 w-4 mr-1 flex-shrink-0" />}
          <span>{error || success || helperText}</span>
        </div>
      )}
    </motion.div>
  );
});

TrustInput.displayName = 'TrustInput';

export default TrustInput;