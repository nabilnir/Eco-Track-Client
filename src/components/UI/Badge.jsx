import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '',
  number = null,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold tracking-wide';
  
  const variants = {
    default: 'badge-dark',
    green: 'badge-green',
    number: 'badge-number'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const numberSizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg', 
    lg: 'w-16 h-16 text-xl'
  };

  if (variant === 'number') {
    return (
      <div
        className={`${baseClasses} ${variants[variant]} ${numberSizes[size]} ${className} rounded-full`}
        {...props}
      >
        {number || children}
      </div>
    );
  }

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} rounded-full`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
