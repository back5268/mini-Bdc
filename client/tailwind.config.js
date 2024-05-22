/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  darkMode: ['class'],
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      height: {
        'body-sidebar': 'calc(100vh - 18rem)',
        'body-product': 'calc(100vh - 4rem)',
        'body-payment': 'calc(100vh - 24rem)',
      },
      minWidth: {
        '[200px]': '0px'
      },
      colors: {
        background: 'rgba(248, 247, 250, 1)',
        color: 'rgba(47, 43, 61, 0.9)',
        sidebar: 'rgba(47, 51, 73, 1)',
        'on-sidebar': 'rgba(225, 222, 245, 0.9)',
        'hover-sidebar': 'rgba(225, 222, 245, 0.15)',
        form: 'rgba(69, 90, 100, 1)',
        border: 'rgba(176, 190, 197, 1)',
        primary: 'rgba(0, 188, 212, 1)'
      },
      borderRadius: {
        xl: '0.3rem',
        lg: '0.2rem',
        md: '0.2rem',
        sm: '0.2rem',
        '[7px]': '0.2rem'
      },
      origin: {
        instable: 'var(--origin-x) var(--origin-y)'
      },
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(-20%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        progress: 'progress 0.6s ease-in-out forwards'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
});
