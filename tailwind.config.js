/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Lavender Field palette — Lilac mist #F4F0FA, Lavender #B8A7DB,
        // Deep lavender #6B5A9E, Plum #3E3563, Leaf #CFE3C4
        plum: {
          50: '#F4F0FA',
          100: '#EAE4F5',
          200: '#D9CFEC',
          300: '#B8A7DB',
          400: '#9D8BCB',
          500: '#8573B8',
          600: '#6B5A9E',
          700: '#564A84',
          800: '#3E3563',
          900: '#332B53',
          950: '#241E3C',
        },
        gold: {
          50: '#F8F5FC',
          100: '#F4F0FA',
          200: '#E4DCF1',
          300: '#CFC3E8',
          400: '#B8A7DB',
          500: '#9281C0',
          600: '#6B5A9E',
          700: '#564A84',
          800: '#3E3563',
          900: '#332B53',
        },
        sage: {
          50: '#F5F9F2',
          100: '#E8F1E2',
          200: '#CFE3C4',
          300: '#B5D2A6',
          400: '#97BB85',
          500: '#7A9E69',
          600: '#5E8050',
          700: '#4A6640',
          800: '#3A5033',
          900: '#2B3A26',
        },
        ivory: {
          50: '#FAF8FD',
          100: '#F4F0FA',
          200: '#EDE7F6',
          300: '#E2DAF0',
          400: '#D3C8E8',
          500: '#C2B4DF',
        },
        ink: '#2E2748',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Mulish"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.2em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-down': 'fadeDown 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'plum-gradient': 'linear-gradient(135deg, #6B5A9E 0%, #3E3563 100%)',
        'gold-gradient': 'linear-gradient(90deg, transparent, #B8A7DB, transparent)',
      },
    },
  },
  plugins: [],
};
