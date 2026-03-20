interface StatCell {
  value: string;
  label: string;
  color: string;
}

interface StatsStripProps {
  jobCount?: number;
}

const STATIC_CELLS: StatCell[] = [
  { value: "340ms", label: "Avg deep-scan latency", color: "text-sol" },
  { value: "4",     label: "Service tiers",          color: "text-sol" },
  { value: "99.9%", label: "Uptime",                 color: "text-green" },
];

export default function StatsStrip({ jobCount = 0 }: StatsStripProps) {
  const cells: StatCell[] = [
    {
      value: jobCount > 0 ? jobCount.toLocaleString() : "—",
      label: "Jobs completed",
      color: "text-green",
    },
    ...STATIC_CELLS,
  ];

  return (
    <div className="relative z-10 border-y border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {cells.map(({ value, label, color }) => (
          <div
            key={label}
            className="bg-bg2 flex flex-col items-center justify-center py-8 px-6 gap-1"
          >
            <span className={`font-mono font-bold text-3xl ${color}`}>
              {value}
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
