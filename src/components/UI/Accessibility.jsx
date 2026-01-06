import React from 'react';

// Screen reader only utility
export const ScreenReaderOnly = ({ children }) => (
  <span className="sr-only">{children}</span>
);

// Skip to main content link
export const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    Skip to main content
  </a>
);

// Focus indicator utility
export const FocusIndicator = ({ children }) => (
  <div className="focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 rounded-lg">
    {children}
  </div>
);

// Accessible button with proper ARIA
export const AccessibleButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  ariaLabel, 
  ariaDescribedBy,
  ...props 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    {...props}
  >
    {children}
  </button>
);

// Accessible link with proper ARIA
export const AccessibleLink = ({ 
  children, 
  href, 
  external = false, 
  ariaLabel, 
  ...props 
}) => (
  <a
    href={href}
    aria-label={ariaLabel}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded transition-colors"
    {...props}
  >
    {children}
    {external && (
      <ScreenReaderOnly> (opens in new window)</ScreenReaderOnly>
    )}
  </a>
);

// Accessible image with alt text
export const AccessibleImage = ({ 
  src, 
  alt, 
  decorative = false, 
  className = '', 
  ...props 
}) => (
  <img
    src={src}
    alt={decorative ? '' : alt}
    role={decorative ? 'presentation' : undefined}
    className={`max-w-full h-auto ${className}`}
    {...props}
  />
);

// Accessible form input with proper labeling
export const AccessibleInput = ({ 
  label, 
  id, 
  error, 
  required = false, 
  ...props 
}) => (
  <div className="space-y-2">
    <label 
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      id={id}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${id}-error` : undefined}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Accessible textarea
export const AccessibleTextarea = ({ 
  label, 
  id, 
  error, 
  required = false, 
  ...props 
}) => (
  <div className="space-y-2">
    <label 
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <textarea
      id={id}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${id}-error` : undefined}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Accessible select
export const AccessibleSelect = ({ 
  label, 
  id, 
  error, 
  required = false, 
  options = [], 
  ...props 
}) => (
  <div className="space-y-2">
    <label 
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      id={id}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${id}-error` : undefined}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Accessible checkbox
export const AccessibleCheckbox = ({ 
  label, 
  id, 
  error, 
  checked, 
  onChange, 
  ...props 
}) => (
  <div className="space-y-2">
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
        {...props}
      />
      <label 
        htmlFor={id}
        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Accessible radio group
export const AccessibleRadioGroup = ({ 
  label, 
  options = [], 
  error, 
  selectedValue, 
  onChange, 
  name 
}) => (
  <div className="space-y-2" role="radiogroup" aria-labelledby={`${name}-label`}>
    <label id={`${name}-label`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${name}-error` : undefined}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 dark:bg-gray-800 dark:border-gray-600"
          />
          <label 
            htmlFor={`${name}-${option.value}`}
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
    {error && (
      <p id={`${name}-error`} className="text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Loading spinner with proper ARIA
export const AccessibleSpinner = ({ size = 'md', label = 'Loading' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  return (
    <div 
      className="inline-flex items-center justify-center"
      role="status"
      aria-label={label}
    >
      <div 
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-green-600 ${sizeClasses[size]}`}
        aria-hidden="true"
      />
      <ScreenReaderOnly>{label}</ScreenReaderOnly>
    </div>
  );
};

// Progress bar with proper ARIA
export const AccessibleProgressBar = ({ 
  value = 0, 
  max = 100, 
  label = 'Progress', 
  showLabel = true 
}) => (
  <div className="w-full" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
    {showLabel && (
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((value / max) * 100)}%</span>
      </div>
    )}
    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
      <div 
        className="bg-green-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

// Toast notification with proper ARIA
export const AccessibleToast = ({ 
  type = 'info', 
  title, 
  message, 
  onClose 
}) => {
  const typeStyles = {
    success: 'bg-green-100 border-green-400 text-green-700 dark:bg-green-800 dark:text-green-200',
    error: 'bg-red-100 border-red-400 text-red-700 dark:bg-red-800 dark:text-red-200',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200',
    info: 'bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-800 dark:text-blue-200'
  };

  return (
    <div 
      className={`border rounded-lg p-4 ${typeStyles[type]}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex">
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm mt-1">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current hover:opacity-75"
            aria-label="Close notification"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default {
  ScreenReaderOnly,
  SkipLink,
  FocusIndicator,
  AccessibleButton,
  AccessibleLink,
  AccessibleImage,
  AccessibleInput,
  AccessibleTextarea,
  AccessibleSelect,
  AccessibleCheckbox,
  AccessibleRadioGroup,
  AccessibleSpinner,
  AccessibleProgressBar,
  AccessibleToast,
};
