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
      display: ["group-hover"],
      fontSize: {
        xxs: "10px",
      },
      height: {
        "image-select-card": "30rem",
        "place-page": "85vh",
      },
      keyframes: {
        sideways: {
          "0%, 100%": { left: "0", top: "0" },
          "50%": { left: "100px", top: "0" },
        },
        slidein: {
          "0%": { transform: "translateX(100%)" },
          "60%": { transform: " translateX(-15%)" },
          "80%": { transform: "translateX(5%)" },
          "100%": { transform: " translateX(0%)" },
        },
        "slide-down": {
          from: {
            opacity: "0",
            transform: "translateY(-3rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        sideways: "sideways 3s linear ",
        "slide-down": "slide-down 300ms ease-out forwards",
      },
      boxShadow: {
        default: "0 10px 30px 5px rgba(0, 0, 0, 0.2)",
      },
      transitionDuration: {
        card: "0.3s",
        4: "0.4s",
      },
      borderRadius: {
        card: "2rem",
        "4xl": "3rem",
      },
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
