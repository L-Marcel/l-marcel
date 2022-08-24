/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "2lg": "1170px"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        gray: {
          default: "#787878",
          400: "#3B3937",
          500: "#2b2826",
          600: "#252322",
          700: "#1B1816",
        },
        primary: {
          500: "#EB513B",
          "500-30": "#EB513B30",
          600: "#C1412E"
        },
        white: {
          default: "#FFF",
          400: "#F5F5F5",
          500: "#F1F1F1",
          600: "#E3E3E3",
          700: "#d1d1d1",
          800: "#818181"
        }
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
  variants: {
    extends: {
      scrollbar: ["dark"]
    }
  }
};
