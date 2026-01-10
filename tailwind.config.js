import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Mona Sans"', 'system-ui', 'sans-serif'],
        body: ['"Mona Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Mona Sans"', 'system-ui', 'sans-serif'],
        mona: ['"Mona Sans"', 'system-ui', 'sans-serif'],
        spacegrotesk: ['"Space Grotesk"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        inter: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      colors: {
        primary: {
          bg: '#9A9A99',
          DEFAULT: '#9A9A99',
          dark: '#059669', // Emerald 600
          light: '#34D399', // Emerald 400
        },
        dark: {
          bg: '#1F2937', // Gray 800
          DEFAULT: '#111827', // Gray 900
          surface: '#374151', // Gray 700
        },
        accent: {
          green: '#10B981', // Emerald 500
          DEFAULT: '#10B981',
          hover: '#059669',
        },
        text: {
          primary: '#1F2937', // Gray 800
          secondary: '#4B5563', // Gray 600
          light: '#F5F5F2',
          muted: '#9CA3AF',
        },
        background: {
          light: '#F9FAFB', // Gray 50
          dark: '#111827',
        },
        border: {
          light: '#E5E7EB', // Gray 200
          dark: '#374151',
          DEFAULT: '#E5E7EB',
        },
        'taupe': '#E8DDD0',
        'eco-green': '#059669',
        'eco-light': '#D1FAE5',
      },
      borderRadius: {
        'xl': '32px',
        'lg': '24px',
        'md': '16px',
        'sm': '8px',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'button': '0 12px 24px rgba(34, 197, 94, 0.3)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'large': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        'slide-in-up': 'slideUp 0.6s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "'Mona Sans', system-ui, sans-serif",
            lineHeight: '1.6',
            color: '#2D3748',
          },
        },
        h1: {
          css: {
            fontFamily: "'Mona Sans', system-ui, sans-serif",
            fontWeight: '800',
            fontSize: '2.5rem',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
          },
        },
        h2: {
          css: {
            fontFamily: "'Mona Sans', system-ui, sans-serif",
            fontWeight: '700',
            fontSize: '2rem',
            lineHeight: '1.3',
            letterSpacing: '-0.01em',
          },
        },
        h3: {
          css: {
            fontFamily: "'Mona Sans', system-ui, sans-serif",
            fontWeight: '600',
            fontSize: '1.5rem',
            lineHeight: '1.4',
          },
        },
        h4: {
          css: {
            fontFamily: "'Mona Sans', system-ui, sans-serif",
            fontWeight: '600',
            fontSize: '1.25rem',
            lineHeight: '1.4',
          },
        },
        h5: {
          css: {
            fontFamily: "'Mona Sans', system-ui, sans-serif",
            fontWeight: '500',
            fontSize: '1.125rem',
            lineHeight: '1.5',
          },
        },
        h6: {
          css: {
            fontFamily: "'Mona Sans', system-ui, sans-serif",
            fontWeight: '500',
            fontSize: '1rem',
            lineHeight: '1.5',
          },
        },
        p: {
          css: {
            fontFamily: "'Mona Sans', system-ui, sans-serif",
            fontSize: '1rem',
            lineHeight: '1.6',
            fontWeight: '400',
          },
        },
        small: {
          css: {
            fontFamily: "'Mona Sans', system-ui, sans-serif",
            fontSize: '0.875rem',
            lineHeight: '1.5',
            fontWeight: '400',
          },
        },
      },
    },
  },
  plugins: [daisyui],
}

export default config
