/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(248, 247, 250, 1)",
        color: "rgba(47, 43, 61, 0.9)",
        sidebar: "rgba(47, 51, 73, 1)",
        "on-sidebar": "rgba(225, 222, 245, 0.9)",
        "hover-sidebar": "rgba(225, 222, 245, 0.15)",
        form: "rgba(69, 90, 100, 1)",
        border: "rgba(176, 190, 197, 1)",
        primary: "rgba(0, 188, 212, 1)",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
