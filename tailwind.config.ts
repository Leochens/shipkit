import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#202923",
        muted: "#747b74",
        paper: "#f8f9f6",
        line: "#e5e8e0",
        brand: { DEFAULT: "#386847", dark: "#294f35", light: "#edf3e8" },
      },
      fontFamily: {
        sans: ["Arial", '"PingFang SC"', '"Microsoft YaHei"', "sans-serif"],
        mono: ['"SFMono-Regular"', "Consolas", "monospace"],
      },
      boxShadow: { card: "0 5px 24px -14px rgba(32,41,35,.2)" },
    },
  },
  plugins: [],
} satisfies Config;
