/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "marine-blue": "hsl(213, 96%, 18%)",
        "purplish-blue": "hsl(243, 100%, 62%)",
        "Pastel-blue": "hsl(228, 100%, 84%)",
        "Light-blue": "hsl(206, 94%, 87%)",
        "Strawberry-red": "hsl(354, 84%, 57%)",
        "Cool-gray": "hsl(231, 11%, 63%)",
        dimgray: "dimgray",
        "Light-gray": "hsl(229, 24%, 87%)",
        Magnolia: "hsl(217, 100%, 97%)",
        Alabaster: "hsl(231, 100%, 99%)",
      },
    },
    fontFamily: {
      sans: ["Ubuntu", "sans-serif"],
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
