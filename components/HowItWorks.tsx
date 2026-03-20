const STEPS = [
  {
    num: "01",
    icon: "⬡",
    title: "Discover",
    body: "Agent queries the ACP registry, finds SolProbe with capabilities, pricing, and reputation score attached.",
  },
  {
    num: "02",
    icon: "⇄",
    title: "Request",
    body: "Agent submits token address + tier selection. ACP escrows the fee on-chain before the job starts.",
  },
  {
    num: "03",
    icon: "✓",
    title: "Deliver",
    body: "SolProbe returns structured JSON. ACP releases escrow. Job is logged on-chain as a completed reputation event.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how" className="relative z-10 py-24 px-section-x">
      <div className="max-w-8xl mx-auto">
        {/* Section tag */}
        <div className="flex items-center gap-3 mb-4">
          <div className="section-tag-line" />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
            How it works
          </span>
        </div>
        <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12">
          Three steps to token intelligence
        </h2>

        {/* Cards — no gap, border-as-divider */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-border gap-px rounded-[6px] overflow-hidden border border-border">
          {STEPS.map(({ num, icon, title, body }) => (
            <div
              key={num}
              className="bg-bg2 p-8 flex flex-col gap-4 hover:bg-bg3 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.1em] text-text-dim">
                  {num}
                </span>
                <span className="text-sol text-xl">{icon}</span>
              </div>
              <h3 className="font-sans font-bold text-[18px]">{title}</h3>
              <p className="font-mono text-[12px] leading-relaxed text-text-muted">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
