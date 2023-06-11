/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'hind': ["Hind Siliguri", "sans-serif"],
        'robotoSlab': ["Roboto Slab", "serif"]
      },
    },
  },
  plugins: [],
}

