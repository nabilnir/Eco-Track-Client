import React from 'react';

const Section = ({ 
  children, 
  variant = 'light', 
  title, 
  subtitle,
  className = '',
  containerSize = 'lg',
  ...props 
}) => {
  const variants = {
    light: 'section-light',
    dark: 'section-dark', 
    gradient: 'section-gradient'
  };

  const containerSizes = {
    sm: 'max-w-4xl',
    md: 'max-w-6xl',
    lg: 'max-w-7xl',
    xl: 'max-w-full'
  };

  return (
    <section className={`section ${variants[variant]} ${className}`} {...props}>
      <div className={`${containerSizes[containerSize]} mx-auto`}>
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="heading-2 mb-4">
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p className="text-large max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Section Content */}
        {children}
      </div>
    </section>
  );
};

export default Section;
