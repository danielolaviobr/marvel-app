module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        40: "40%",
        50: "50%",
        70: "70%",
      },
      maxWidth: {
        50: "50%",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["hover"],
    },
  },
  plugins: [],
};
