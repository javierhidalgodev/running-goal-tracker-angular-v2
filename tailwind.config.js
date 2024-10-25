/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '380px'
      },
      gridTemplateColumns: {
        '150': 'repeat(auto-fit, minmax(150px, 1fr))'
      }
    }
  },
  plugins: [],
}

