interface StatsStripProps {
  jobCount?: number;
}

export default function StatsStrip({ jobCount = 0 }: StatsStripProps) {
  const items = [
    { label: "Jobs Completed",        value: jobCount > 0 ? jobCount.toLocaleString() : "—",  color: "var(--violet)" },
    { label: "Avg Deep-Scan Latency", value: "340ms",    color: "var(--cyan)" },
    { label: "Service Tiers",         value: "3",        color: "var(--text)" },
    { label: "Uptime",                value: "99.9%",    color: "var(--emerald)" },
    { label: "Data Sources",          value: "4",        color: "var(--violet)" },
    { label: "ACP Reputation",        value: "5 / 5",    color: "var(--cyan)" },
    { label: "Response Format",       value: "JSON",     color: "var(--emerald)" },
    { label: "Network",               value: "Solana",   color: "var(--text)" },
  ] as const;

  // Double the items for seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <div
      className="ticker-wrap relative z-10 overflow-hidden border-y border-border py-4"
      style={{ background: "var(--bg2)" }}
    >
      <div className="ticker-track flex items-center gap-0">
        {doubled.map(({ label, value, color }, i) => (
          <div
            key={i}
            className="flex items-center gap-10 px-10 shrink-0"
          >
            <div className="flex items-center gap-3">
              <span
                className="font-mono font-bold text-[22px] leading-none tabular-nums"
                style={{ color }}
              >
                {value}
              </span>
              <span className="font-body text-[11px] tracking-[0.12em] uppercase text-text-muted whitespace-nowrap">
                {label}
              </span>
            </div>
            {/* Divider dot */}
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
