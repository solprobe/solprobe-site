const STEPS = [
  {
    num: "01",
    icon: "⬡",
    title: "Your agent calls one ACP service",
    body: "The agent submits a token address and tier selection. ACP validates the request and escrows the fee on-chain before the job starts — no prepayment, no trust required.",
    accentColor: "var(--violet)",
    accentBg: "rgba(139,92,246,0.10)",
  },
  {
    num: "02",
    icon: "⇄",
    title: "SolProbe fans out to up to six sources in parallel",
    body: "Six concurrent queries — Helius, DexScreener, Birdeye, RugCheck, Jupiter, and on-chain state. Each source has an independent circuit breaker; partial failures degrade gracefully without blocking the response.",
    accentColor: "var(--cyan)",
    accentBg: "rgba(6,182,212,0.08)",
  },
  {
    num: "03",
    icon: "◈",
    title: "A deterministic scoring engine grades the result",
    body: "A rule-based engine combines signals into a structural risk grade. No LLM in the scoring path — same inputs always produce the same output, making responses auditable and reproducible.",
    accentColor: "var(--amber, #F59E0B)",
    accentBg: "rgba(245,158,11,0.08)",
  },
  {
    num: "04",
    icon: "✓",
    title: "Your agent receives a fully typed response",
    body: "Structured JSON with a schema version, typed fields for every metric, and a coverage declaration listing which sources responded. Your agent knows exactly what data it got and where it came from.",
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
        <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12 reveal">
          Three steps to token intelligence
        </h2>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ num, icon, title, body, accentColor, accentBg }) => (
            <div
              key={num}
              className="feature-card p-8 flex flex-col gap-4 reveal"
            >
              {/* Icon */}
              <div
                className="feature-icon w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: accentBg, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span style={{ color: accentColor }}>{icon}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] tracking-[0.12em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {num}
                </span>
                <h3
                  className="font-sans font-bold text-[18px]"
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
