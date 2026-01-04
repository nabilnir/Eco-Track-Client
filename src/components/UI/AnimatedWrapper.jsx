import React from 'react';
import { motion } from 'framer-motion';

const AnimatedWrapper = ({ 
  children, 
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = '',
  ...props 
}) => {
  const animations = {
    'fade-up': {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration, delay }
    },
    'fade-down': {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration, delay }
    },
    'fade-left': {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration, delay }
    },
    'fade-right': {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration, delay }
    },
    'fade': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration, delay }
    },
    'slide-up': {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration, delay }
    },
    'zoom-in': {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration, delay }
    },
    'rotate-in': {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      transition: { duration, delay }
    }
  };

  const selectedAnimation = animations[animation] || animations['fade-up'];

  return (
    <motion.div
      className={className}
      {...selectedAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
