module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        40: "40%",
        70: "70%",
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
