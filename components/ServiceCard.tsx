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
  accentColor = "var(--green)",
}: ServiceCardProps) {
  return (
    <div
      className={`
        relative flex flex-col rounded-[6px] border p-7
        transition-all duration-200
        ${
          featured
            ? "border-[rgba(153,69,255,0.25)] bg-gradient-to-b from-[rgba(153,69,255,0.05)] to-transparent"
            : "border-border bg-bg2 hover:bg-bg3"
        }
      `}
      style={{ borderTopColor: accentColor, borderTopWidth: "2px" }}
    >
      {featured && (
        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.1em] uppercase text-sol border border-sol/30 bg-sol-dim px-2 py-0.5 rounded-full">
          Popular
        </div>
      )}

      <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-dim mb-2">
        Tier {tier}
      </div>
      <div className="font-mono font-bold text-[32px] leading-none mb-1">
        {price}
      </div>
      <div className="font-sans font-bold text-[16px] mb-4">{name}</div>

      <div className="h-px bg-border mb-4" />

      <ul className="flex flex-col gap-2 mb-6 flex-1">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 font-mono text-[11px] text-text-muted"
          >
            <span className="text-green mt-0.5">→</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-green inline-block" />
        SLA {sla}
      </div>
    </div>
  );
}
