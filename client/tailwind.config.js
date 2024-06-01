import {themeColors} from "./src/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': themeColors.colorPrimary,
        'color-primary-2': themeColors.colorPrimary2,
      }
    },
  },
  plugins: [],
}

