import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: ["var(--font-heebo)", "sans-serif"],
      },
      colors: {
        cream: "#F7F5F1",
        "cream-dark": "#EDE9E3",
        ink: "#111010",
        blue: {
          DEFAULT: "#1E3A8A",
          light: "#2d52c5",
          faint: "#EEF2FF",
        },
        border: "#D6D0C8",
      },
    },
  },
  plugins: [],
};

export default config;
