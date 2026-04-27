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
        bg:         "var(--bg)",
        bg2:        "var(--bg2)",
        bg3:        "var(--bg3)",
        "bg-glass": "var(--bg-glass)",
        "bg-card":  "var(--bg-card)",
        // Mesh gradient blobs
        "mesh-purple": "var(--mesh-purple)",
        "mesh-green":  "var(--mesh-green)",
        "mesh-blue":   "var(--mesh-blue)",
        // Borders
        border:           "var(--border)",
        "border-mid":     "var(--border-mid)",
        "border-bright":  "var(--border-bright)",
        "border-glow":    "var(--border-glow)",
        "border-green":   "var(--border-green)",
        // Solana purple
        sol:       "var(--sol)",
        "sol-dim": "var(--sol-dim)",
        "sol-glow":"var(--sol-glow)",
        "sol-mid": "var(--sol-mid)",
        // Solana green
        green:        "var(--green)",
        "green-dim":  "var(--green-dim)",
        "green-glow": "var(--green-glow)",
        // Amber
        amber:        "var(--amber)",
        "amber-dim":  "var(--amber-dim)",
        // Red
        red:          "var(--red)",
        "red-dim":    "var(--red-dim)",
        // Text
        text:          "var(--text)",
        "text-sub":    "var(--text-sub)",
        "text-muted":  "var(--text-muted)",
        "text-dim":    "var(--text-dim)",
        // Terminal syntax tokens
        "t-key":    "var(--t-key)",
        "t-val":    "var(--t-val)",
        "t-str":    "var(--t-str)",
        "t-num":    "var(--t-num)",
        "t-prompt": "var(--t-prompt)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-sans)", "Syne", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }], // 10px
      },
      maxWidth: {
        "8xl": "1200px",
      },
      spacing: {
        "section-x": "48px",
      },
      height: {
        nav: "64px",
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
      boxShadow: {
        "glow-sol":   "0 0 40px rgba(120,40,255,0.25)",
        "glow-green": "0 0 40px rgba(20,241,149,0.2)",
        "glow-card":  "0 8px 32px rgba(0,0,0,0.4)",
      },
      backdropBlur: {
        "2xl": "40px",
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(ellipse 80% 50% at 10% 0%, var(--mesh-purple) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 100%, var(--mesh-green) 0%, transparent 55%)",
      },
      animation: {
        "pulse-dot":       "pulse-dot 2s ease-in-out infinite",
        blink:             "blink 1.1s step-end infinite",
        "float-up":        "float-up 0.6s ease forwards",
        "gradient-shift":  "gradient-shift 4s ease infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--green-glow)", opacity: "1" },
          "50%":       { boxShadow: "0 0 0 5px transparent",    opacity: "0.75" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        "float-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
