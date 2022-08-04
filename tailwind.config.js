/** @type {import('tailwindcss').Config} */
let postcss = require('postcss')
 
//const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content:[
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'th-body-background': 'var(--body-background)',
        'th-body-background-secondary': 'var(--body-background-secondary)',
        'th-primary-dark': 'var(--primary-dark)',
        'th-primary-medium': 'var(--primary-medium)',
        'th-primary-light': 'var(--primary-light)',
        'th-secondary-dark': 'var(--secondary-dark)',
        'th-secondary-medium': 'var(--secondary-medium)',
        'th-secondary-light': 'var(--secondary-light)',
        'th-accent-dark': 'var(--accent-dark)',
        'th-accent-medium': 'var(--accent-medium)',
        'th-accent-light': 'var(--accent-light)',
        'th-card-color-1': 'var(--card-color-1)',
        'th-card-color-2': 'var(--card-color-2)',
        'th-bg-color-1': 'var(--bg-color-1)',
        'th-bg-color-2': 'var(--bg-color-2)',
      },
    },
  },
  plugins: [
    {
      postcssPlugin: 'grouped',
      Once(root, { result }) {
        return postcss([
          require('postcss-import'),
          require('postcss-mixins'),
          require('postcss-simple-vars'),
        ]).process(root, result.opts)
      },
    },
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
  ],
};
