interface StatCell {
  value: string;
  label: string;
  colorClass: string;
}

interface StatsStripProps {
  jobCount?: number;
}

export default function StatsStrip({ jobCount = 0 }: StatsStripProps) {
  const cells: StatCell[] = [
    {
      value: jobCount > 0 ? jobCount.toLocaleString() : "—",
      label: "Jobs completed",
      colorClass: "gradient-text-brand",
    },
    {
      value: "340ms",
      label: "Avg deep-scan latency",
      colorClass: "text-text",
    },
    {
      value: "3",
      label: "Service tiers",
      colorClass: "text-sol",
    },
    {
      value: "99.9%",
      label: "Uptime",
      colorClass: "text-green",
    },
  ];

  return (
    <div className="relative z-10 border-y border-border bg-bg2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {cells.map(({ value, label, colorClass }) => (
          <div
            key={label}
            className="bg-bg2 flex flex-col items-center justify-center py-8 px-6 gap-1"
          >
            <span
              className={`font-mono font-bold text-[36px] leading-none ${colorClass}`}
            >
              {value}
            </span>
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
