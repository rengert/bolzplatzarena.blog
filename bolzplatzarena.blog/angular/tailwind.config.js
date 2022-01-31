module.exports = {
  prefix: '',
  content: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
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
  plugins: [],
};
