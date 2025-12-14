import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff6f7",
          100: "#ffe8ec",
          200: "#ffd0d9",
          300: "#ffacbd",
          400: "#f9869f",
          500: "#e66080",
          600: "#c14066",
          700: "#a12f54",
          800: "#7b2441",
          900: "#5f1f35",
        },
        midnight: {
          900: "#040211",
          800: "#090422",
          700: "#120a34",
        },
        sand: "#f6efe7",
        emeraldFog: "#7bdcb5",
      },
      backgroundImage: {
        "star-field":
          "radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at bottom, rgba(249,134,159,0.25), transparent 55%)",
      },
      boxShadow: {
        "glow-soft": "0 25px 80px rgba(233, 143, 169, 0.35)",
        "glow-gold": "0 20px 50px rgba(248, 218, 173, 0.45)",
      },
      keyframes: {
        "float-slow": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: 0.65 },
          "70%": { transform: "scale(1.4)", opacity: 0 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-ring": "pulse-ring 4s linear infinite",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "sans-serif"],
        script: ["var(--font-script)", "Cookie", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;

