import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', 
  hover = true, 
  className = '', 
  padding = 'lg',
  ...props 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-card',
    dark: 'bg-white/10 backdrop-blur-sm text-text-light border border-white/10',
    elevated: 'bg-white shadow-lg'
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-10',
    xl: 'p-12'
  };

  const hoverClasses = hover ? 'hover:-translate-y-2 hover:shadow-card-hover' : '';

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
