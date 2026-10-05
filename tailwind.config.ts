import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F8F6F0",
          50: "#FCFBF8",
          100: "#F8F6F0",
          200: "#F1ECE1",
          300: "#ECE9E3",
        },
        paper: {
          DEFAULT: "#ECE9E3",
          light: "#F4F2EC",
          dark: "#E0DDD5",
        },
        charcoal: {
          DEFAULT: "#201F1E",
          brand: "#55534F",
          muted: "#6B6964",
          light: "#9A9791",
          border: "#E4E1DA",
          dark: "#141413",
        },
        terracotta: {
          DEFAULT: "#B56339",
          hover: "#9E542E",
          active: "#854422",
          light: "#D48B65",
          subtle: "#FAF0EB",
        },
        olive: {
          DEFAULT: "#5D6041",
          dark: "#474B2F",
          light: "#82865F",
          subtle: "#F4F5ED",
        },
        gold: {
          light: "#CEAC6F",
          DEFAULT: "#B89C68",
          deep: "#A38B63",
          subtle: "#FBF7EF",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        script: ["var(--font-alex-brush)", "cursive"],
        times: ["'Times New Roman'", "Times", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #CEAC6F 0%, #B89C68 50%, #A38B63 100%)",
        "gold-shimmer": "linear-gradient(90deg, #CEAC6F 0%, #F5E6C8 50%, #CEAC6F 100%)",
        "paper-texture": "url('/textures/speckled-paper.jpg')",
      },
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(32, 31, 30, 0.05), 0 1px 4px -1px rgba(32, 31, 30, 0.03)",
        "soft-md": "0 8px 24px -4px rgba(32, 31, 30, 0.08), 0 4px 12px -2px rgba(32, 31, 30, 0.04)",
        "soft-lg": "0 16px 40px -6px rgba(32, 31, 30, 0.12), 0 8px 20px -4px rgba(32, 31, 30, 0.06)",
        "gold-glow": "0 0 25px rgba(206, 172, 111, 0.25)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
