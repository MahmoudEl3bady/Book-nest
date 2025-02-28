import type { Config } from "tailwindcss";
export default {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#265073",
        secondary: "#ededed",
        third: "#FFA146",
        moodygreen: "2F4F4F",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
