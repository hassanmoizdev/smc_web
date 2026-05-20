/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      keyframes: {
        floatLight: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(120px, 80px) rotate(180deg)" },
          "100%": { transform: "translate(0, 0) rotate(360deg)" },
        },
        fadeUp: {
          to: { opacity: "1", transform: "translateY(0)" },
        },
        growLine: {
          from: { width: "0", opacity: "0" },
          to: { width: "40px", opacity: "1" },
        },
        fadeInZoom: {
          from: { opacity: "0", transform: "scale(1.15)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        zoomIn: {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        underlineAnim: {
          "0%": { width: "0", opacity: "0" },
          "100%": { width: "90px", opacity: "1" },
        },
        scrollLogos: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        floatLight: "floatLight 12s infinite linear",
        fadeUp: "fadeUp 1s ease forwards",
        growLine: "growLine 1s ease forwards",
        fadeInZoom: "fadeInZoom 1.2s ease",
        fadeInUp: "fadeInUp 1s ease",
        fadeInLeft: "fadeInLeft 1s ease",
        fadeInRight: "fadeInRight 1s ease",
        zoomIn: "zoomIn 1s ease",
        slideDown: "slideDown 1s ease",
        fadeInDown: "fadeInDown 1s ease",
        underlineAnim: "underlineAnim 1.2s ease forwards",
        scrollLogos: "scrollLogos 28s linear infinite",
        slideInLeft: "slideInLeft 1s ease",
        slideInRight: "slideInRight 1s ease",
      },
    },
  },
  plugins: [],
};
