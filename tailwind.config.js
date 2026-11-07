/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./services.html",
    "./work.html",
    "./about.html",
    "./contact.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0A',
          surface: '#111111',
          card: '#141414',
          hover: '#191919'
        },
        coral: {
          DEFAULT: '#E87348',
          hover: '#F28054',
          dark: '#C95326',
          muted: 'rgba(232, 115, 72, 0.12)'
        },
        subtle: '#7A7A7A'
      },
      fontFamily: {
        serif: ['Newsreader', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      }
    },
  },
  plugins: [],
}

