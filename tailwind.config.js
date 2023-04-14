/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#59b5ba',
        secondary: '#07162d',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
