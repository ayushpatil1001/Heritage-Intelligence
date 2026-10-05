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
          DEFAULT: "#0B2A6F",
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#9FB3C8",
          400: "#829AB1",
          500: "#627D98",
          600: "#486581",
          700: "#334E68",
          800: "#1B2A4A",
          900: "#0B2A6F", // Deep Ambedkarite Navy
          950: "#061537",
          surface: "#1C2541",
        },
        gold: {
          DEFAULT: "#C8A24A",
          50: "#FDF8ED",
          100: "#FAF0D4",
          200: "#F4DF9E",
          300: "#ECCE68",
          400: "#DDB846",
          500: "#C8A24A",
          600: "#A88334",
          700: "#886524",
          800: "#684B19",
          900: "#4E3610",
        },
        parchment: {
          DEFAULT: "#FAF7F0",
          50: "#FFFFFF",
          100: "#FAF7F0",
          200: "#F0EBE0",
          300: "#E6DFCE",
          400: "#D8CEB8",
          500: "#C8BBA0",
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
