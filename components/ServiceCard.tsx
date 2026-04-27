interface ServiceCardProps {
  tier: 1 | 2 | 3 | 4;
  price: string;
  name: string;
  features: readonly string[];
  sla: string;
  featured?: boolean;
  accentColor?: string;
}

export default function ServiceCard({
  tier,
  price,
  name,
  features,
  sla,
  featured = false,
}: ServiceCardProps) {
  return (
    <div
      className={`
        relative flex flex-col rounded-2xl p-7
        glass-bright glow-border
        overflow-hidden
        transition-all duration-200
        ${featured ? "shadow-glow-card" : ""}
      `}
    >
      {/* Top gradient accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{
          background: featured
            ? "linear-gradient(90deg, var(--sol), var(--green))"
            : "linear-gradient(90deg, var(--sol-dim), transparent)",
        }}
      />

      {/* Featured radial glow inside card */}
      {featured && (
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(120,40,255,0.08) 0%, transparent 70%)",
          }}
        />
      )}

      {featured && (
        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.1em] uppercase text-sol border border-sol/30 bg-sol-dim px-2 py-0.5 rounded-full z-10">
          Popular
        </div>
      )}

      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-muted mb-2 mt-2">
        Tier {tier}
      </div>

      <div
        className={`font-mono font-bold text-[40px] leading-none mb-1 ${
          featured ? "gradient-text-brand" : "text-text"
        }`}
      >
        {price}
      </div>

      <div className="font-sans font-bold text-[17px] text-text mb-4">{name}</div>

      <div className="h-px bg-border mb-4" />

      <ul className="flex flex-col gap-[6px] mb-6 flex-1">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 font-mono text-[12px] text-text-sub leading-[1.8]"
          >
            <span className="text-green mt-0.5 shrink-0">→</span>
            {f}
          </li>
        ))}
      </ul>

      <div
        className="
          inline-flex items-center gap-2 self-start
          font-mono text-[11px] text-green
          border border-border-green bg-green-dim
          px-3 py-1 rounded-full
        "
      >
        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-green inline-block shrink-0" />
        SLA {sla}
      </div>
    </div>
  );
}
