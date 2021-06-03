const {guessProductionMode} = require("@ngneat/tailwind");

module.exports = {
  prefix: '',
  purge: {
    enabled: guessProductionMode(),
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'loader': 'loader 1s linear infinite'
      },
      keyframes: {
        loader: {
          '0%': {
            transform: 'rotate(0)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
