/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './projects/**/*.{html,ts,css,scss,sass,less,styl}'
  ],
  theme: {
    extend: {
      width: {
        '128': '32rem',
      },
      zIndex: {
        '90': '90',
        '100': '100',
        '110': '110'
      }
    },
  },
  plugins: [],
}
