import React from 'react';

const HeroSection = ({ 
  title, 
  subtitle, 
  description, 
  primaryCTA, 
  secondaryCTA,
  image = null,
  className = '',
  ...props 
}) => {
  return (
    <section className={`hero-gradient min-h-screen flex items-center justify-center relative py-24 px-5 overflow-hidden ${className}`} {...props}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent-green rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-left">
            <h1 className="hero-title mb-6 animate-fade-in">
              {title}
            </h1>
            
            {subtitle && (
              <h2 className="text-2xl md:text-3xl font-heading text-text-light/90 mb-4 animate-slide-up">
                {subtitle}
              </h2>
            )}
            
            {description && (
              <p className="text-large text-text-light/80 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
                {description}
              </p>
            )}
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
              {primaryCTA && (
                <a href={primaryCTA.href} className="btn-primary text-lg px-8 py-4">
                  {primaryCTA.label}
                </a>
              )}
              
              {secondaryCTA && (
                <a href={secondaryCTA.href} className="btn-ghost text-lg px-8 py-4">
                  {secondaryCTA.label}
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 animate-slide-up" style={{animationDelay: '0.6s'}}>
              <div className="text-center">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="text-center">
                <div className="stat-number">500+</div>
                <div className="stat-label">Eco Activities</div>
              </div>
              <div className="text-center">
                <div className="stat-number">50K</div>
                <div className="stat-label">CO₂ Saved</div>
              </div>
            </div>
          </div>

          {/* Image */}
          {image && (
            <div className="flex justify-center lg:justify-end animate-fade-in">
              <img 
                src={image} 
                alt={title}
                className="hero-image"
              />
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <svg className="w-6 h-6 text-text-light/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
