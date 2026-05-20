import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#050505",
          light: "#f0ede8",
        },
        text: {
          dark: "#f5f5f5",
          light: "#050505",
        },
        accent: {
          DEFAULT: "#7ef9ff",
          glow: "rgba(126,249,255,0.4)",
          dim: "rgba(126,249,255,0.15)",
        },
        secondary: "#6f6f6f",
        terminal: {
          green: "#39ff14",
          amber: "#ffb300",
          red: "#ff3c3c",
        },
        surface: {
          dark: "#0d0d0d",
          card: "#111111",
          border: "#1e1e1e",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "JetBrains Mono", "monospace"],
        display: ["Space Grotesk", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1" }],
        "10xl": ["10rem", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "11xl": ["12rem", { lineHeight: "0.88", letterSpacing: "-0.05em" }],
        "12xl": ["14rem", { lineHeight: "0.85", letterSpacing: "-0.06em" }],
      },
      letterSpacing: {
        "widest-2": "0.3em",
        "widest-3": "0.5em",
        "negative": "-0.05em",
        "negative-lg": "-0.08em",
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "flicker": "flicker 4s linear infinite",
        "scanlines": "scanlines 8s linear infinite",
        "grain": "grain 0.5s steps(1) infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "marquee": "marquee 30s linear infinite",
        "scramble-in": "scrambleIn 0.4s ease-out forwards",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-in": "slideIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.8" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.9" },
          "97%": { opacity: "1" },
        },
        scanlines: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 2%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(4%, -1%)" },
          "50%": { transform: "translate(-3%, 3%)" },
          "60%": { transform: "translate(2%, -4%)" },
          "70%": { transform: "translate(-4%, 1%)" },
          "80%": { transform: "translate(1%, -2%)" },
          "90%": { transform: "translate(3%, -3%)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(126,249,255,0.2), 0 0 60px rgba(126,249,255,0.05)" },
          "50%": { boxShadow: "0 0 40px rgba(126,249,255,0.4), 0 0 100px rgba(126,249,255,0.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrambleIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "noise": "url('/noise.svg')",
        "grid": "linear-gradient(rgba(126,249,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(126,249,255,0.03) 1px, transparent 1px)",
        "radial-dark": "radial-gradient(ellipse at center, #0d0d0d 0%, #050505 70%)",
        "radial-accent": "radial-gradient(ellipse at center, rgba(126,249,255,0.08) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      boxShadow: {
        "accent": "0 0 30px rgba(126,249,255,0.3)",
        "accent-lg": "0 0 60px rgba(126,249,255,0.4)",
        "inner-dark": "inset 0 0 100px rgba(0,0,0,0.8)",
        "glow": "0 0 20px rgba(126,249,255,0.2), 0 0 60px rgba(126,249,255,0.05)",
      },
      transitionTimingFunction: {
        "expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
    },
  },
  plugins: [],
};

export default config;
