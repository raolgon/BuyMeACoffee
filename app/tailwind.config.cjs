/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // @ts-ignore
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["forest"]
  }
}
