/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#070A0B',
          800: '#0C1112',
          700: '#111819',
        },
        olive: {
          900: '#0B1A12',
          800: '#0F2418',
          700: '#153022',
          600: '#1C3D2B',
          200: '#C9D7C8',
        },
        champagne: {
          200: '#F3E7C9',
          300: '#E9D6A6',
          400: '#D9BE7D',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        luxe: '0 18px 50px rgba(0,0,0,0.28)',
      },
    },
  },
  plugins: [],
};
