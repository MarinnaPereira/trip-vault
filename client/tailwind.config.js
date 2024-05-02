/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#F24F13",
        green: "#00B0A3",
        lightGreen: "#04D9B2",
        darkGreen: "#036884",
        yellow: "#FDA541",
        gray: "#BBBBBB",
        lightGray: "#DDDDDD"
      },
    },
  },
  plugins: [],
};
