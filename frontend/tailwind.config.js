/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#5f9ea0",
      "primary-dark": "#587679",
      "primary-hover": "#7a9697",
      "primary-light": "#9ABDBE",
      "background-text": "#9abdbe",
      white: "#FFFFFF",
      black: "#000000",
      "black-light": "#1E1E1E",
      orange: "#ff7849",
      green: "#13ce66",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#E5E5E5",
      "gray-fav": "#A8A7A6",
      "red-heart": "#E44848",
      "edit-button-bg": "#f5f5f5",
      "blue-dark": " #252f3b",
      "user-item-border": "#d7dce4",
    },
    extend: {
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
