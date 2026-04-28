interface ServiceCardProps {
  tier: 1 | 2 | 3 | 4;
  price: string;
  name: string;
  features: readonly string[];
  sla: string;
  featured?: boolean;
  icon?: string;
}

export default function ServiceCard({
  tier,
  price,
  name,
  features,
  sla,
  featured = false,
  icon = "◈",
}: ServiceCardProps) {
  return (
    <div
      className={`
        feature-card
        relative flex flex-col p-10
        overflow-hidden
        ${featured ? "shadow-lift-violet" : ""}
      `}
    >
      {/* Featured gradient top accent */}
      {featured && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, var(--violet), var(--cyan))",
          }}
        />
      )}

      {/* Featured inner glow */}
      {featured && (
        <div
          className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />
      )}

      {featured && (
        <div
          className="absolute top-4 right-4 font-body text-[10px] tracking-[0.12em] uppercase px-3 py-1 rounded-full z-10"
          style={{
            color: "var(--violet)",
            border: "1px solid rgba(139,92,246,0.30)",
            background: "rgba(139,92,246,0.10)",
          }}
        >
          Popular
        </div>
      )}

      {/* Icon */}
      <div
        className="feature-icon w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6"
        style={{
          background: featured
            ? "rgba(139,92,246,0.12)"
            : "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {icon}
      </div>

      <div className="font-body text-[10px] tracking-[0.12em] uppercase text-text-muted mb-2">
        Tier {tier}
      </div>

      <div
        className="font-sans font-bold text-[44px] leading-none mb-1"
        style={{
          color: featured ? undefined : "var(--text)",
          background: featured
            ? "linear-gradient(135deg, var(--violet), var(--cyan))"
            : undefined,
          WebkitBackgroundClip: featured ? "text" : undefined,
          WebkitTextFillColor: featured ? "transparent" : undefined,
          backgroundClip: featured ? "text" : undefined,
        }}
      >
        {price}
      </div>

      <div className="font-sans font-bold text-[18px] text-text mb-5">{name}</div>

      <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.05)" }} />

      <ul className="flex flex-col gap-2 mb-7 flex-1">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 font-mono text-[12px] text-text-sub leading-[1.8]"
          >
            <span className="shrink-0 mt-0.5" style={{ color: "var(--emerald)" }}>→</span>
            {f}
          </li>
        ))}
      </ul>

      <div
        className="inline-flex items-center gap-2 self-start font-body text-[11px] px-3 py-1 rounded-full"
        style={{
          color: "var(--emerald)",
          border: "1px solid rgba(16,185,129,0.30)",
          background: "rgba(16,185,129,0.08)",
        }}
      >
        <span
          className="pulse-dot w-1.5 h-1.5 rounded-full shrink-0 inline-block"
          style={{ background: "var(--emerald)" }}
        />
        SLA {sla}
      </div>
    </div>
  );
}
