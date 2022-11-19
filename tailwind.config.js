const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary-brand': {
          100: '#FFF7F0',
          200: '#FDE9D9',
          500: '#f6d4b9',
          800: '#D6AC90',
          900: '#BB815B',
        },
        'black-brand': {
          100: '#D0D0D0',
          300: '#636363',
          500: '#404040',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('color-swatch', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`color-swatch${separator}${className}`)}:color-swatch`;
        });
      });
    }),
  ],
};
