import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A", // Jet Black
        foreground: "#FFFFFF", // Acid White
        "deep-crimson": "#851725", // SPL@T Deep Crimson
        "crimson-primary": "#D80D27", // Alternate Crimson (hero, CTA)
        "crimson-hover": "#a00b1f", // Hover state
      },
      fontFamily: {
        sans: [
          "Oswald",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: ["Courier New", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
