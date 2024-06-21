module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('tailwind-scrollbar-hide'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
