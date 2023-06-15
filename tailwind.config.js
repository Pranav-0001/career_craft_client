/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          '100':'rgba(0, 167, 172,0.1)',
          '200':'rgba(0, 167, 172,0.2)',
          '300':'rgba(0, 167, 172,0.3)',
          '400':'rgba(0, 167, 172,0.4)',
          '500':'rgba(0, 167, 172,0.5)',
          '600':'rgba(0, 167, 172,0.6)',
          '700':'rgba(0, 167, 172,0.7)',
          '800':'rgba(0, 167, 172,0.8)',
          '900':'rgba(0, 167, 172,0.9)',
          '1000':'rgba(0, 167, 172,1)',
        }
      },
      fontFamily:{
        exo: ['"Exo 2"', 'sans-serif'],
        work:['"Work Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

