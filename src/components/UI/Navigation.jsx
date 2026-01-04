import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navigation = ({ 
  logo = "EcoTrack", 
  navItems = [], 
  user = null,
  onLogout = null,
  className = '',
  ...props 
}) => {
  return (
    <nav className={`nav-fixed ${className}`} {...props}>
      {/* Logo */}
      <a href="/" className="text-2xl font-bold text-text-light no-underline hover:opacity-70 transition-opacity">
        {logo}
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="text-text-light font-medium no-underline hover:opacity-70 transition-opacity"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <DarkModeToggle />
        
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-text-light font-medium">{user.name}</span>
            {onLogout && (
              <button
                onClick={onLogout}
                className="btn-ghost text-sm px-4 py-2"
              >
                Logout
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <a href="/login" className="btn-ghost text-sm px-4 py-2">
              Login
            </a>
            <a href="/register" className="btn-primary text-sm px-4 py-2">
              Sign Up
            </a>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-text-light">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
