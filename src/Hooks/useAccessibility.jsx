import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return containerRef;
};

export const useAriaLive = () => {
  const announce = (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return { announce };
};

export const useKeyboardNavigation = (callbacks = {}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          callbacks.onEscape?.();
          break;
        case 'Enter':
          callbacks.onEnter?.();
          break;
        case ' ':
          callbacks.onSpace?.();
          break;
        case 'ArrowLeft':
          callbacks.onArrowLeft?.();
          break;
        case 'ArrowRight':
          callbacks.onArrowRight?.();
          break;
        case 'ArrowUp':
          callbacks.onArrowUp?.();
          break;
        case 'ArrowDown':
          callbacks.onArrowDown?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [callbacks]);
};

export const useFocusManagement = () => {
  const previousFocusRef = useRef(null);

  const saveFocus = () => {
    previousFocusRef.current = document.activeElement;
  };

  const restoreFocus = () => {
    if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
      previousFocusRef.current.focus();
    }
  };

  const setFocus = (element) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  };

  return { saveFocus, restoreFocus, setFocus };
};

export default {
  useFocusTrap,
  useAriaLive,
  useKeyboardNavigation,
  useFocusManagement,
};
