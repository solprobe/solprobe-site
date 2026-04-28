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
        bg:          "var(--bg)",
        bg2:         "var(--bg2)",
        bg3:         "var(--bg3)",
        "bg-glass":  "var(--bg-glass)",
        "bg-card":   "var(--bg-card)",
        "bg-code":   "var(--bg-code)",
        // Accent — Violet
        violet:          "var(--violet)",
        "violet-dim":    "var(--violet-dim)",
        "violet-glow":   "var(--violet-glow)",
        "violet-mid":    "var(--violet-mid)",
        // Accent — Cyan
        cyan:            "var(--cyan)",
        "cyan-dim":      "var(--cyan-dim)",
        "cyan-glow":     "var(--cyan-glow)",
        // Accent — Emerald
        emerald:         "var(--emerald)",
        "emerald-dim":   "var(--emerald-dim)",
        "emerald-glow":  "var(--emerald-glow)",
        // Legacy compat
        sol:             "var(--sol)",
        "sol-dim":       "var(--sol-dim)",
        "sol-glow":      "var(--sol-glow)",
        "sol-mid":       "var(--sol-mid)",
        green:           "var(--green)",
        "green-dim":     "var(--green-dim)",
        "green-glow":    "var(--green-glow)",
        amber:           "var(--amber)",
        "amber-dim":     "var(--amber-dim)",
        red:             "var(--red)",
        "red-dim":       "var(--red-dim)",
        // Mesh blobs
        "mesh-violet":   "var(--mesh-violet)",
        "mesh-cyan":     "var(--mesh-cyan)",
        "mesh-emerald":  "var(--mesh-emerald)",
        "mesh-purple":   "var(--mesh-purple)",
        "mesh-green":    "var(--mesh-green)",
        "mesh-blue":     "var(--mesh-blue)",
        // Borders
        border:           "var(--border)",
        "border-mid":     "var(--border-mid)",
        "border-bright":  "var(--border-bright)",
        "border-glow":    "var(--border-glow)",
        "border-cyan":    "var(--border-cyan)",
        "border-green":   "var(--border-green)",
        // Text
        text:          "var(--text)",
        "text-sub":    "var(--text-sub)",
        "text-muted":  "var(--text-muted)",
        "text-dim":    "var(--text-dim)",
        // Terminal syntax
        "t-key":     "var(--t-key)",
        "t-val":     "var(--t-val)",
        "t-str":     "var(--t-str)",
        "t-num":     "var(--t-num)",
        "t-prompt":  "var(--t-prompt)",
        "t-violet":  "var(--t-violet)",
        "t-cyan":    "var(--t-cyan)",
        "t-emerald": "var(--t-emerald)",
        "t-comment": "var(--t-comment)",
      },
      fontFamily: {
        mono:    ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans:    ["var(--font-sans)", "Bricolage Grotesque", "sans-serif"],
        body:    ["var(--font-body)", "Inter", "sans-serif"],
        display: ["var(--font-sans)", "Bricolage Grotesque", "sans-serif"],
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
        "glow-violet": "0 0 40px rgba(139,92,246,0.25)",
        "glow-cyan":   "0 0 40px rgba(6,182,212,0.20)",
        "glow-emerald":"0 0 40px rgba(16,185,129,0.20)",
        "glow-card":   "0 8px 32px rgba(0,0,0,0.6)",
        "lift-violet": "0 24px 64px rgba(139,92,246,0.40)",
        // legacy
        "glow-sol":    "0 0 40px rgba(139,92,246,0.25)",
        "glow-green":  "0 0 40px rgba(16,185,129,0.20)",
      },
      backdropBlur: {
        "2xl": "40px",
      },
      transitionTimingFunction: {
        snappy: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      animation: {
        "pulse-dot":      "pulse-dot 2s ease-in-out infinite",
        blink:            "blink 1.1s step-end infinite",
        "float-up":       "float-up 0.6s cubic-bezier(0.23,1,0.32,1) forwards",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "shimmer-sweep":  "shimmer-sweep 3s linear infinite",
        "conic-spin":     "conic-spin 4s linear infinite",
        "float-orb":      "float-orb 8s ease-in-out infinite",
        ticker:           "ticker 40s linear infinite",
        "stagger-in":     "stagger-in 0.7s cubic-bezier(0.23,1,0.32,1) forwards",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--emerald-glow)", opacity: "1" },
          "50%":       { boxShadow: "0 0 0 5px transparent",       opacity: "0.75" },
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
        "shimmer-sweep": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        "conic-spin": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "float-orb": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%":       { transform: "translateY(-20px) scale(1.05)" },
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "stagger-in": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
