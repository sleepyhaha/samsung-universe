/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{css,js}", "./views/**/*", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
