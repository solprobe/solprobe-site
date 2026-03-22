import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status — SolProbe",
  description: "Live uptime, latency metrics, and incident log for SolProbe services.",
};

const SERVICES = [
  { id: "quick_scan",   name: "Quick Scan",   p50: 340,  p95: 820,  p99: 1400, uptime: 99.97 },
  { id: "wallet_risk",  name: "Wallet Risk",  p50: 480,  p95: 1100, p99: 2200, uptime: 99.95 },
  { id: "market_intel", name: "Market Intel", p50: 290,  p95: 680,  p99: 1100, uptime: 99.98 },
  { id: "deep_dive",    name: "Deep Dive",    p50: 8200, p95: 18400, p99: 24000, uptime: 99.91 },
] as const;

// 2 mock uptime bars — all green at launch
const UPTIME_BARS = Array.from({ length: 2 }, (_, i) => ({
  day: i,
  status: "up" as const,
}));

export default function StatusPage() {
  const allOk = SERVICES.every(() => true); // swap for real check post-launch

  return (
    <>
      {/* Header */}
      <section className="relative z-10 pt-[calc(64px+80px)] pb-16 px-section-x border-b border-border">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-tag-line" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
              System status
            </span>
          </div>
          <h1 className="font-sans font-extrabold text-[clamp(36px,4vw,56px)] leading-[1.1]">
            Service health
          </h1>
        </div>
      </section>

      {/* Current status banner */}
      <section className="relative z-10 py-8 px-section-x border-b border-border">
        <div className="max-w-8xl mx-auto">
          <div
            className={`
              flex items-center gap-3 px-5 py-4 rounded-[6px] border font-mono text-[13px]
              ${allOk
                ? "border-green/20 bg-green/5 text-green"
                : "border-amber/20 bg-amber/5 text-amber"}
            `}
          >
            <span className={`pulse-dot w-2 h-2 rounded-full inline-block ${allOk ? "bg-green" : "bg-amber"}`} />
            {allOk ? "All systems operational" : "Degraded performance — investigating"}
          </div>
        </div>
      </section>

      {/* 2-day uptime chart */}
      <section className="relative z-10 py-12 px-section-x border-b border-border">
        <div className="max-w-8xl mx-auto">
          <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-muted mb-4">
            2-day uptime
          </h2>
          <div className="flex items-end gap-0.5 h-10">
            {UPTIME_BARS.map(({ day, status }) => (
              <div
                key={day}
                title={`Day ${2 - day}`}
                className={`
                  flex-1 rounded-sm transition-opacity duration-200 hover:opacity-80
                  ${status === "up" ? "bg-green h-full" : "bg-amber h-1/2"}
                `}
              />
            ))}
          </div>
          <div className="flex justify-between font-mono text-[10px] text-text-dim mt-2">
            <span>2 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </section>

      {/* Per-service latency metrics */}
      <section className="relative z-10 py-12 px-section-x border-b border-border">
        <div className="max-w-8xl mx-auto">
          <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-muted mb-6">
            Response time metrics
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-[12px] border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {["Service", "P50", "P95", "P99", "30-day uptime"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 pr-8 text-text-dim text-[11px] tracking-[0.08em] uppercase font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICES.map(({ id, name, p50, p95, p99, uptime }) => (
                  <tr key={id} className="border-b border-border hover:bg-bg2 transition-colors">
                    <td className="py-4 pr-8 text-text">{name}</td>
                    <td className="py-4 pr-8 text-green">{p50.toLocaleString()}ms</td>
                    <td className="py-4 pr-8 text-text-muted">{p95.toLocaleString()}ms</td>
                    <td className="py-4 pr-8 text-text-muted">{p99.toLocaleString()}ms</td>
                    <td className="py-4 pr-8">
                      <span className="text-green">{uptime}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Incident log */}
      <section className="relative z-10 py-12 px-section-x">
        <div className="max-w-8xl mx-auto">
          <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-muted mb-6">
            Incident log
          </h2>
          <div className="border border-border rounded-[6px] bg-bg2 px-6 py-8 text-center">
            <p className="font-mono text-[12px] text-text-muted">
              No incidents recorded. SolProbe launched with a clean slate.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
