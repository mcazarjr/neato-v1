/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3EB489",
          secondary: "#FFC350",
          accent: "#13A5EE",
          neutral: "#263C44",
          "base-100": "#ffffff",
          info: "#14b5eb",
          success: "#1d968c",
          warning: "#cf9307",
          error: "#f5475b",
          startBtn: "#31B58D",
          cardtint: "#EEFFFA",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
