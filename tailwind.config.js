/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // SPL@T Brand Colors
        background: "#000000", // Jet Black base
        foreground: "#FFFFFF", // Acid White base
        "deep-crimson": "#A20021", // Primary SPL@T crimson
        "crimson-primary": "#D80D27", // Supporting crimson (hero, CTA)
        "crimson-hover": "#a00b1f", // Hover state

        // Extended palette for better design system
        "acid-white": "#FFFFFF",
        "jet-black": "#000000",
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A",
        },
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
      fontSize: {
        // SPL@T Typography Scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
        '8xl': ['6rem', { lineHeight: '1' }],           // 96px
        '9xl': ['8rem', { lineHeight: '1' }],           // 128px
        
        // SPL@T Semantic Typography
        'hero': ['4.5rem', { lineHeight: '1.1', fontWeight: '800' }],     // 72px, extra bold
        'display': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }], // 60px, bold
        'headline': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],   // 48px, bold
        'title': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],   // 36px, semibold
        'subtitle': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px, semibold
        'body-lg': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }], // 20px, normal
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],       // 16px, normal
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px, normal
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }], // 12px, normal
      },
      spacing: {
        // SPL@T Spacing Scale
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
      },
      borderRadius: {
        'xl': '1rem',     // 16px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.75rem', // 28px
      },
      boxShadow: {
        'crimson': '0 0 35px rgba(133, 23, 37, 0.35)',
        'crimson-lg': '0 0 45px rgba(133, 23, 37, 0.6)',
        'glow': '0 25px 45px rgba(133, 23, 37, 0.25)',
      },
    },
  },
  plugins: [],
};
