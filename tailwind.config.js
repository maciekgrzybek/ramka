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
          100: '#FEF7F1',
          200: '#ffe7d2',
          600: '#DCBB9D',
          800: '#BA815E',
          900: '#956143',
        },
        'black-brand': {
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
