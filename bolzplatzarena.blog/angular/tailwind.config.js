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
        'animate-ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes: {
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0'
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
