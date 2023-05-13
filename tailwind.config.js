/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    theme: "winter",
    darkTheme: "night"
  },
  safelist: [
    'alert-info',
    'alert-error',
    'alert-success',
  ]
}

