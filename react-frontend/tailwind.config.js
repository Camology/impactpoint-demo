/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-green': '#4bc0c0',
        'my-red': '#ff6b6b',
        'my-blue': '#54a2eb'
      }
    },
  },
  plugins: [],
} 