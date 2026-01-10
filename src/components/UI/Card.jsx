import React from 'react';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  padding = 'lg',
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300';

  const variants = {
    default: '',
    elevated: 'shadow-sm hover:shadow-lg',
    interactive: 'hover:scale-[1.02] hover:-translate-y-1 cursor-pointer shadow-sm hover:shadow-lg'
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const hoverClasses = hover && variant !== 'interactive' ? 'hover:-translate-y-1 hover:shadow-lg' : '';

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
