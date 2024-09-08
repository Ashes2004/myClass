/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "slate-bg": "var(--slate-bg)",
        "green-custom": "var(--green-custom)",
        cream: "#F8F9FA",
        "fade-skin-color": "#F5EDED",
        "sidebar-dark": "#070F2B",
        "sidebar-neon": "#9BEC00",
        "card-white": "#F7F7F8",
        "custom-skin": "#EECAD5",
        "teacher-notice-board": "#3795BD",
        "calender-colour": "#777",
        "attendacebar-blue": "#C4E4FF",
        "card-yellow": "#F3FF90",
        "card-mint": "#CFFDE1",
        "card-orange": "#FF7F3E",
        "card-gold": "#FFDE4D",
        "card-dark-blue": "#00A9FF",
        "dark-bg": "#1A1A2E",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
