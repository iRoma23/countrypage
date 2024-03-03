/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#282B30",
          200: "#1B1D1F",
        },
        blue: {
          base: "#4E80EE",
        },
        gray: {
          base: "#6C727F",
        },
        white: {
          base: "#D2D5DA",
        },
      },
    },
  },
  plugins: [],
};
