const STEPS = [
  {
    num: "01",
    icon: "⬡",
    title: "Your agent calls one ACP service",
    body: "A Solana mint address goes in. Validation runs first — malformed inputs are rejected before any external work happens, so you never pay for a bad request.",
    accentColor: "var(--violet)",
    accentBg: "rgba(139,92,246,0.10)",
  },
  {
    num: "02",
    icon: "⇄",
    title: "SolProbe fans out to up to six sources in parallel",
    body: "Helius RPC for live on-chain authority and holder distribution. DexScreener and Birdeye for market state. RugCheck for historical patterns. Jupiter for the verified-asset list. Every source has its own timeout and circuit breaker — one slow upstream never blocks your response.",
    accentColor: "var(--cyan)",
    accentBg: "rgba(6,182,212,0.08)",
  },
  {
    num: "03",
    icon: "◈",
    title: "A deterministic scoring engine grades the result",
    body: "Penalties are explicit, reproducible, and exposed in the response. No language model decides whether a token is a rug. The LLM only writes the human-readable summary on top of structured fields it cannot override.",
    accentColor: "#F59E0B",
    accentBg: "rgba(245,158,11,0.08)",
  },
  {
    num: "04",
    icon: "✓",
    title: "Your agent receives a fully typed response",
    body: "Risk grade, scoring factors, historical flags, structured confidence, data quality status. Every response declares what it covered — and what it didn't.",
    accentColor: "var(--emerald)",
    accentBg: "rgba(16,185,129,0.08)",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how" className="relative z-10 py-24 px-section-x border-t border-border">
      <div className="max-w-8xl mx-auto">
        {/* Section tag */}
        <div className="flex items-center gap-3 mb-4">
          <div className="section-tag-line" />
          <span className="font-body text-[11px] tracking-[0.12em] uppercase text-violet">
            How it works
          </span>
        </div>
        <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12">
          Four steps to token intelligence
        </h2>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ num, icon, title, body, accentColor, accentBg }) => (
            <div
              key={num}
              className="feature-card p-8 flex flex-col gap-4"
            >
              {/* Icon */}
              <div
                className="feature-icon w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: accentBg, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span style={{ color: accentColor }}>{icon}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] tracking-[0.12em] shrink-0"
                  style={{ color: "var(--text-muted)" }}
                >
                  {num}
                </span>
                <h3
                  className="font-sans font-bold text-[16px] leading-snug"
                  style={{ color: "var(--text)" }}
                >
                  {title}
                </h3>
              </div>

              <p className="font-body text-[13px] leading-relaxed text-text-sub">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
