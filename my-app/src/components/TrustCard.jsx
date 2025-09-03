import React from 'react';
import { motion } from 'framer-motion';

const TrustCard = ({
  children,
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  border = false,
  rounded = 'lg',
  hover = true,
  className = '',
  onClick,
  ...props
}) => {
  // Base card classes
  const baseClasses = `
    bg-white transition-all duration-300 ease-in-out
    trust-font-family
  `;

  // Variant classes
  const variantClasses = {
    default: 'border border-trust-border-light',
    success: 'border border-trust-success/20 bg-trust-success/5',
    warning: 'border border-trust-warning/20 bg-trust-warning/5',
    danger: 'border border-trust-danger/20 bg-trust-danger/5',
    primary: 'border border-trust-primary/20 bg-trust-primary/5',
    secondary: 'border border-trust-secondary/20 bg-trust-secondary/5'
  };

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  // Shadow classes
  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  };

  // Hover classes
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';

  // Combine all classes
  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${roundedClasses[rounded]}
    ${hoverClasses}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: hover ? { y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" } : {}
  };

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card Header Component
const TrustCardHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`border-b border-trust-border-light pb-4 mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Body Component
const TrustCardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
const TrustCardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`border-t border-trust-border-light pt-4 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Export all components
TrustCard.Header = TrustCardHeader;
TrustCard.Body = TrustCardBody;
TrustCard.Footer = TrustCardFooter;

export default TrustCard;