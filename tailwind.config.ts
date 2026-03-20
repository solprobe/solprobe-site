import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg:    "var(--bg)",
        bg2:   "var(--bg2)",
        bg3:   "var(--bg3)",
        // Borders
        border:        "var(--border)",
        "border-bright": "var(--border-bright)",
        // Solana purple
        sol:       "var(--sol)",
        "sol-dim": "var(--sol-dim)",
        "sol-glow":"var(--sol-glow)",
        // Solana green
        green:        "var(--green)",
        "green-dim":  "var(--green-dim)",
        "green-glow": "var(--green-glow)",
        // Amber (warning / tier 4)
        amber:        "var(--amber)",
        "amber-dim":  "var(--amber-dim)",
        // Text
        text:          "var(--text)",
        "text-muted":  "var(--text-muted)",
        "text-dim":    "var(--text-dim)",
        // Syntax highlighting (Terminal component)
        "t-str":  "#e06c75",
        "t-num":  "#d19a66",
      },
      fontFamily: {
        // Set via next/font/google CSS variables in app/layout.tsx
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-sans)", "Syne", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],   // 10px
      },
      maxWidth: {
        "8xl": "1200px",
      },
      spacing: {
        // Section and layout constants
        "section-x": "48px",   // horizontal padding on sections
      },
      height: {
        nav: "64px",
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
      boxShadow: {
        "sol-glow": "0 0 60px rgba(153,69,255,0.08), 0 32px 64px rgba(0,0,0,0.4)",
        "green-glow-sm": "0 0 16px var(--green-glow)",
        "green-glow-lg": "0 0 28px var(--green-glow)",
      },
      backgroundImage: {
        // Grid overlay — used in globals.css via body::before
        "grid-overlay":
          "linear-gradient(rgba(153,69,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(153,69,255,0.03) 1px, transparent 1px)",
      },
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        counter: "fadeUp 0.4s ease forwards",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(20,241,149,0.4)" },
          "50%":       { opacity: "0.7", boxShadow: "0 0 0 4px rgba(20,241,149,0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
