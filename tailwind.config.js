/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}",
  ],
  safelist: [
    "bg-jet-black",
    "text-acid-white",
    "text-deep-crimson",
  ],
  theme: {
    extend: {
      colors: {
        "jet-black": "#0A0A0A",
        "acid-white": "#F5F5F5",
        "deep-crimson": "#8A0E1D",
      },
    },
  },
  plugins: [],
}
