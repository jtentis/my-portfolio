import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [
    require('tailwind-scrollbar')
  ],
};

export default config;