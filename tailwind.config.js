/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#080C14",
        card: "#0F1420",
        "card-raised": "#151C2C",
        border: "#1C2333",
        "border-lit": "#2A3550",
        text: "#F0F2F8",
        "text-dim": "#7A8BA8",
        "text-mute": "#3E4D62",
        idle: "#2A3040",
      },
      fontFamily: {
        cond: ['"Barlow Condensed"', "system-ui", "sans-serif"],
        body: ["Barlow", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
