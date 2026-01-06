import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg shadow-sm border transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700',
        elevated: 'bg-white border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700',
        outlined: 'bg-white border-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600',
        ghost: 'bg-transparent border-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hover: {
        true: 'hover:shadow-md hover:-translate-y-1 cursor-pointer',
        false: '',
      },
      interactive: {
        true: 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-green-400',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: false,
      interactive: false,
    },
  }
);

const ResponsiveCard = forwardRef(({
  children,
  className,
  variant,
  padding,
  hover,
  interactive,
  onClick,
  as: Component = 'div',
  ariaLabel,
  role,
  tabIndex,
  ...props
}, ref) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      ref={ref}
      className={twMerge(cardVariants({ variant, padding, hover, interactive }), className)}
      onClick={handleClick}
      role={role || (onClick ? 'button' : undefined)}
      aria-label={ariaLabel}
      tabIndex={tabIndex || (onClick ? 0 : undefined)}
      {...props}
    >
      {children}
    </Component>
  );
});

ResponsiveCard.displayName = 'ResponsiveCard';

// Card sub-components for better organization
const CardHeader = forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge('flex flex-col space-y-1.5 pb-6', className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef(({ children, className, ...props }, ref) => (
  <h3
    ref={ref}
    className={twMerge('text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100', className)}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef(({ children, className, ...props }, ref) => (
  <p
    ref={ref}
    className={twMerge('text-sm text-gray-600 dark:text-gray-400', className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge('pt-0', className)}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge('flex items-center pt-6', className)}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

export {
  ResponsiveCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

export default ResponsiveCard;
