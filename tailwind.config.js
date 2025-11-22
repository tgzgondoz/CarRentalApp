/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '4.5': '1.125rem',
        '11': '2.75rem',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          'system-ui',
          'sans-serif'
        ],
      },
      colors: {
        gray: {
          200: '#E5E7EB',
          100: '#F3F4F6',
        },
        blue: {
          50: '#EFF6FF',
          600: '#2563EB',
          700: '#1D4ED8',
        },
      },
      backdropBlur: {
        'xl': '20px',
      },
      backdropSaturate: {
        '180': '1.8',
      },
      boxShadow: {
        'blue-sm': '0 1px 3px rgba(37, 99, 235, 0.3)',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}