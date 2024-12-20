/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        gold: {
          500: "#c39b32",
        },
        gray: {
          200: "#E8E8ED",
          400: "#848fac",
        },
        black: {
          300: "#2A2A2A",
        },
        zinc: {
          400: "#B1B1B1",
          800: "#2A2A2A",
        },
      },
      backgroundImage: {
        "login-background": "url('/images/login-background.svg')",
      },
    },
  },
  plugins: [],
};
