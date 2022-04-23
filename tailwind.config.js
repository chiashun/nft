const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", './public/index.html'],
  theme: {

    colors: {
      primary: '#66FCF1',
      secondary: '#45A29E',
      third:'#1F2833',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      // ...
    },
    extend: {},
  },
  plugins: [],
};
