/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-crimson': '#851725', // Updated site red
        'jet-black': '#0A0A0A',
        'acid-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
