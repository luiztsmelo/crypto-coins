/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Outfit', 'sans-serif']
    }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
