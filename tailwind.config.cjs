/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fffcfc",
        light: "#cdf1f6",
        "text-primary": "#1e1c1e",
        "text-secondary": "#4d166a",
        accent: "#ee3d4f",
        "accent-light": "#f7a8b8",
        "accent-secondary": "#5fe7c5",
        "accent-secondary-light": "#b3f7e6",
        'accent-secondary-dark': '#00b38f',
      },
    },
    plugins: [],
  },
};
