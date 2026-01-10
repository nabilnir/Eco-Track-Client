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
    light: 'bg-white dark:bg-gray-900',
    dark: 'bg-gray-50 dark:bg-gray-800',
    gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
  };

  const containerSizes = {
    sm: 'max-w-4xl',
    md: 'max-w-6xl',
    lg: 'max-w-7xl',
    xl: 'max-w-full'
  };

  return (
    <section className={`py-16 md:py-24 px-6 ${variants[variant]} ${className}`} {...props}>
      <div className={`mx-auto ${containerSizes[containerSize]}`}>
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-lg leading-relaxed max-w-3xl mx-auto">
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
