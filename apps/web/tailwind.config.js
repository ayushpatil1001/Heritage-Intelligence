/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B2A6F", // Deep Ambedkarite blue
          hover: "#081E50",
          light: "#E8EEF8",
        },
        accent: {
          DEFAULT: "#C8A24A", // Restrained gold
          hover: "#B08D38",
          light: "#FDF8ED",
        },
        ivory: {
          DEFAULT: "#FAF7F0", // Warm ivory background
          dark: "#F0EBE0",
        },
        navy: {
          DEFAULT: "#0B132B", // Deep navy dark mode
          surface: "#1C2541",
        },
        charcoal: {
          DEFAULT: "#1F2937",
          muted: "#4B5563",
          light: "#9CA3AF",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Noto Serif Devanagari'", "Georgia", "serif"],
        sans: ["'Inter'", "'Noto Sans Devanagari'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        'kiosk': '0 8px 30px rgba(11, 42, 111, 0.08)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.04)',
      },
      minHeight: {
        'touch': '64px',
      },
      minWidth: {
        'touch': '64px',
      }
    },
  },
  plugins: [],
};
