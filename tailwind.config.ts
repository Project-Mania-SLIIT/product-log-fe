import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        textPrimary: "#162427",
        textSecondary: "#6B7C93",
        bgPrimary: "#FFFFFF",
        bgSecondary: "#F7F7F7",
        brand: "#001EB9",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
