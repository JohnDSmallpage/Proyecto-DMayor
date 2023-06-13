/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'hind': ["Hind Siliguri", "sans-serif"],
        'robotoSlab': ["Roboto Slab", "serif"],
        'caveat': ["Caveat", "cursive"],
        'notoSerifJP': ["Noto Serif JP", "serif"],
        'shadows': ["Shadows Into Light", "cursive"],
        'ysabeau': ["Ysabeau", "sans-serif"]
      },
    },
  },
  plugins: [],
}

