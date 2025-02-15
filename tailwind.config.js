/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
    },
    screens: {
      'xsm': '320px',
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '750px',
      // => @media (min-width: 960px) { ... }

      'lg': '1200px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
}
