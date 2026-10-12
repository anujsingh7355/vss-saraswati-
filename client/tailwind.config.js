/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        navy: {
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#c7dcff',
          300: '#9dc2ff',
          400: '#699fff',
          500: '#3c79f8',
          600: '#1d55eb',
          700: '#153fd6',
          800: '#1734ad',
          900: '#0f172a',
          950: '#0a0f1d'
        },
        vedic: {
          gold: '#eab308',
          maroon: '#881337',
          amber: '#d97706',
          sand: '#fefae0',
          dark: '#1c1917'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif']
      }
    },
  },
  plugins: [],
}
