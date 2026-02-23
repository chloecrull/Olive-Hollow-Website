/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        olivePrimary: '#2F3A2F',
        oliveSecondary: '#3E4B3C',
        goldAccent: '#C6A96B',
        creamBackground: '#F7F5EF',
        darkText: '#1C1C1C',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};