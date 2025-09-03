import React from 'react';
import { motion } from 'framer-motion';

const TrustButton = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  // Base button classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    trust-font-family
  `;

  // Variant classes
  const variantClasses = {
    primary: `
      bg-trust-primary text-white
      hover:bg-trust-primary/90 
      focus:ring-trust-primary/50
      shadow-md hover:shadow-lg
    `,
    secondary: `
      bg-trust-secondary text-white
      hover:bg-trust-secondary/90
      focus:ring-trust-secondary/50
      shadow-md hover:shadow-lg
    `,
    success: `
      bg-trust-success text-white
      hover:bg-trust-success/90
      focus:ring-trust-success/50
      shadow-md hover:shadow-lg
    `,
    warning: `
      bg-trust-warning text-white
      hover:bg-trust-warning/90
      focus:ring-trust-warning/50
      shadow-md hover:shadow-lg
    `,
    danger: `
      bg-trust-danger text-white
      hover:bg-trust-danger/90
      focus:ring-trust-danger/50
      shadow-md hover:shadow-lg
    `,
    outline: `
      border-2 border-trust-primary text-trust-primary bg-transparent
      hover:bg-trust-primary hover:text-white
      focus:ring-trust-primary/50
    `,
    ghost: `
      text-trust-primary bg-transparent
      hover:bg-trust-primary/10
      focus:ring-trust-primary/50
    `
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className="mr-2 h-4 w-4" />
      )}
      {children}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="ml-2 h-4 w-4" />
      )}
    </motion.button>
  );
};

export default TrustButton;