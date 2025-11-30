import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "page-white": "#f4f6f8",
        "ame-brown": "#80534E",
        "ame-gold": "#F6CA77"
      },
      keyframes: {
        shimmer: {
          '0%': { 'background-position-x': '0%'},
          '100%': { 'background-position-x': '400%'}
        }
      }
    },
  },
  plugins: [],
};
export default config;
