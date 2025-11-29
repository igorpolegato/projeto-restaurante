/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#F5C84C",
          black: "#111111",
          gray: "#F3F4F6",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        lobster: ['"Lobster"', "cursive"],
      },
    },
  },
  plugins: [],
};
