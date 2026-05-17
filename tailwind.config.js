/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        brand: {
          emerald: "#10b981",
          teal: "#14b8a6",
          glow: "#34d399",
        },
      },
    },
  },
  plugins: [],
};
