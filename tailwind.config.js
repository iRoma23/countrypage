/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#1B1D1F",
      secondary: "#282B30",
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
    fontFamily: {
      vietnam: ["be-vietnam", "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      xl: "2rem",
    },
  },
  plugins: [],
};
