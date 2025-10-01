#!/bin/bash
set -e

echo "🔥 Updating SPL@T brand colors in tailwind.config.js..."
cat > tailwind.config.js <<'CONFIG'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "jet-black": "#0A0A0A",
        "acid-white": "#FFFFFF",
        "deep-crimson": "#851025",
      },
    },
  },
  plugins: [],
};
CONFIG

echo "🔥 Updating global styles in styles/globals.css..."
cat > styles/globals.css <<'STYLES'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html, body {
    @apply bg-jet-black text-acid-white min-h-screen;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply text-deep-crimson tracking-wide uppercase;
  }
}
STYLES

echo "✅ SPL@T brand colors applied. Clearing Next.js cache..."
rm -rf .next

echo "🚀 Restart your dev server with: pnpm run dev"
