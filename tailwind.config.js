module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      body: ["Georgia"],
      display: ["Playfair"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
