/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'tab': '768px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("tailwind-scrollbar-hide")
  ],
}
