const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
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
