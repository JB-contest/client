import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jb: {
          navy: "#0B2F6E",
          "navy-hover": "#0A2659",
          "navy-700": "#0F3A86",
          blue: "#1F6FEB",
          "blue-soft": "#E8F1FE",
        },
        page: "#F7F8FA",
        card: "#FFFFFF",
        subtle: "#F2F4F7",
        border: {
          DEFAULT: "#E5E7EB",
          strong: "#D1D5DB",
        },
        text: {
          1: "#111827",
          2: "#6B7280",
          3: "#9CA3AF",
        },
        risk: {
          high: "#DC2626",
          "high-bg": "#FEECEC",
          medium: "#F59E0B",
          "medium-bg": "#FEF4E6",
          low: "#16A34A",
          "low-bg": "#E7F6EC",
        },
        info: {
          DEFAULT: "#0EA5E9",
          bg: "#E4F5FD",
        },
        neutral: {
          pill: "#6B7280",
          "pill-bg": "#F2F4F7",
        },
      },
      fontFamily: {
        ui: [
          "Pretendard",
          "Inter",
          "-apple-system",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
        latin: ["Inter", "Pretendard", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
      borderRadius: {
        input: "4px",
        button: "6px",
        card: "8px",
        modal: "12px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(16, 24, 40, 0.04)",
        card: "0 1px 3px rgba(16, 24, 40, 0.06)",
        pop: "0 6px 20px rgba(16, 24, 40, 0.10), 0 1px 3px rgba(16,24,40,0.06)",
        modal: "0 16px 48px rgba(11, 47, 110, 0.18)",
        focus: "0 0 0 3px rgba(31, 111, 235, 0.32)",
      },
    },
  },
  plugins: [],
};

export default config;
