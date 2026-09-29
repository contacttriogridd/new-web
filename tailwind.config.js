/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Full Lavender palette — everything derives from Lavender #B8A7DB
        // (plum-300 / gold-400 / lavender-400), with lilac tints and deep plum for text
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
        lavender: {
          50: '#F6F3FB',
          100: '#EDE8F6',
          200: '#DDD4EE',
          300: '#CABEE5',
          400: '#B8A7DB',
          500: '#9D8BCB',
          600: '#7A68AE',
          700: '#5F4F92',
          800: '#4A3E75',
          900: '#332B53',
        },
        // Backgrounds — Mint #F5FAF1 (50 = raised cards/inputs);
        // 300–500 are lavender tints for borders & hovers
        ivory: {
          50: '#FDFEFB',
          100: '#F5FAF1',
          200: '#E8F1E0',
          300: '#DDD4EE',
          400: '#CABEE5',
          500: '#B8A7DB',
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
        'fade-up': 'fadeUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-down': 'fadeDown 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
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
