import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18181b",
        muted: "#71717a",
        paper: "#fafafa",
        line: "#e4e4e7",
        brand: { DEFAULT: "#4f46e5", dark: "#4338ca", light: "#eef2ff" },
      },
      fontFamily: {
        sans: ["Inter", "Geist", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', '"PingFang SC"', '"Microsoft YaHei"', "sans-serif"],
        mono: ['"SFMono-Regular"', "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
