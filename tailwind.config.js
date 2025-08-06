/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: "#851725",  // SPL@T Crimson for text
        jet: "#A0A0A0",      // SPL@T Jet for backgrounds
        acid: "#FFFFFF",     // SPL@T Acid White for contrast text
      },
    },
  },
  plugins: [],
};
