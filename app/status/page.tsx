import type { Metadata } from "next";
import {
  getLatestCheck,
  getHealthChecks,
  getIncidents,
  type HealthCheck,
  type ServiceStatus,
} from "@/lib/kv";
import UptimeChart from "./UptimeChart";

export const metadata: Metadata = {
  title: "Status — SolProbe",
  description:
    "Live uptime, latency metrics, and incident log for SolProbe services.",
};

// ── Types ──────────────────────────────────────────────────────────────────────
type ServiceKey = keyof HealthCheck["services"];
type OverallStatus = "operational" | "degraded" | "down";

// ── Helpers ────────────────────────────────────────────────────────────────────
function deriveOverall(check: HealthCheck | null): OverallStatus {
  if (!check) return "operational";
  const statuses = Object.values(check.services).map((s) => s.status);
  if (statuses.some((s) => s === "down")) return "down";
  if (statuses.some((s) => s === "degraded")) return "degraded";
  return "operational";
}

function calcUptime(history: HealthCheck[], key: ServiceKey): string {
  if (history.length === 0) return "—";
  const ok = history.filter((c) => c.services[key].status === "ok").length;
  return ((ok / history.length) * 100).toFixed(2) + "%";
}

// ── SLA reference (ms) ────────────────────────────────────────────────────────
const SLA: Record<ServiceKey, number> = {
  quick_scan:     100,
  token_analysis: 500,
  full_report:    1000,
  deep_dive:      2000,
};

const SERVICE_META: Record<
  ServiceKey,
  { name: string; price: string }
> = {
  quick_scan:     { name: "Quick Scan",     price: "$0.01" },
  token_analysis: { name: "Token Analysis", price: "$0.10" },
  full_report:    { name: "Full Report",    price: "$0.25" },
  deep_dive:      { name: "Deep Dive",      price: "$0.50" },
};

const SERVICE_KEYS: ServiceKey[] = [
  "quick_scan",
  "token_analysis",
  "full_report",
  "deep_dive",
];

// ── Status dot colours ────────────────────────────────────────────────────────
function statusColor(s: ServiceStatus["status"] | OverallStatus): string {
  if (s === "ok" || s === "operational") return "var(--green)";
  if (s === "degraded") return "var(--amber)";
  return "var(--red)";
}

function statusLabel(s: ServiceStatus["status"]): string {
  if (s === "ok") return "Operational";
  if (s === "degraded") return "Degraded";
  return "Down";
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function StatusPage() {
  const [latest, history, incidents] = await Promise.all([
    getLatestCheck(),
    getHealthChecks(7),
    getIncidents(7),
  ]);

  const overall = deriveOverall(latest);

  const overallCopy: Record<OverallStatus, string> = {
    operational: "All systems operational",
    degraded:    "Degraded performance — investigating",
    down:        "Service disruption — incident in progress",
  };

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
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

      {/* ── Overall banner ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-8 px-section-x border-b border-border">
        <div className="max-w-8xl mx-auto">
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-[6px] border font-mono text-[13px]"
            style={{
              borderColor: `color-mix(in srgb, ${statusColor(overall)} 20%, transparent)`,
              background:  `color-mix(in srgb, ${statusColor(overall)} 8%, transparent)`,
              color:       statusColor(overall),
            }}
          >
            <span
              className="pulse-dot w-2 h-2 rounded-full inline-block flex-shrink-0"
              style={{ background: statusColor(overall) }}
            />
            {overallCopy[overall]}
          </div>
        </div>
      </section>

      {/* ── Per-service grid ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-12 px-section-x border-b border-border">
        <div className="max-w-8xl mx-auto">
          <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-muted mb-6">
            Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_KEYS.map((key) => {
              const svc     = latest?.services[key];
              const sStatus = svc?.status ?? "ok";
              const latency = svc?.latency_ms ?? null;
              const { name, price } = SERVICE_META[key];
              const uptime  = calcUptime(history, key);
              const sla     = SLA[key];

              return (
                <div
                  key={key}
                  className="bg-bg2 border border-border rounded-[6px] p-5"
                  style={{
                    borderTopWidth: "2px",
                    borderTopColor: statusColor(sStatus),
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: statusColor(sStatus) }}
                    />
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.1em]"
                      style={{ color: statusColor(sStatus) }}
                    >
                      {statusLabel(sStatus)}
                    </span>
                  </div>

                  <div className="font-sans font-bold text-[16px] text-text mb-0.5">
                    {name}
                  </div>
                  <div className="font-mono text-[11px] text-text-muted mb-4">
                    {price} · SLA {sla}ms
                  </div>

                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-text-muted">Uptime</span>
                    <span className="text-text">{uptime}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px] mt-1">
                    <span className="text-text-muted">Last p50</span>
                    <span className="text-text">
                      {latency !== null ? `${latency}ms` : "—"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7-day uptime chart ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-12 px-section-x border-b border-border">
        <div className="max-w-8xl mx-auto">
          <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-muted mb-6">
            7-day uptime
          </h2>
          <UptimeChart history={history} />
        </div>
      </section>

      {/* ── Incident log ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-12 px-section-x">
        <div className="max-w-8xl mx-auto">
          <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-muted mb-6">
            Incident log
          </h2>

          {incidents.length === 0 ? (
            <div className="border border-border rounded-[6px] bg-bg2 px-6 py-8 text-center">
              <p className="font-mono text-[12px] text-text-muted">
                No incidents in the last 7 days.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-[12px] border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    {["Service", "Status", "Started", "Resolved", "Duration"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left py-3 pr-8 text-text-dim text-[11px] tracking-[0.08em] uppercase font-normal"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((inc, i) => {
                    const started  = new Date(inc.started_at);
                    const resolved = inc.resolved_at
                      ? new Date(inc.resolved_at)
                      : null;
                    const durationMs = resolved
                      ? resolved.getTime() - started.getTime()
                      : null;
                    const durationStr = durationMs
                      ? durationMs < 60_000
                        ? `${Math.round(durationMs / 1000)}s`
                        : `${Math.round(durationMs / 60_000)}m`
                      : "Ongoing";

                    return (
                      <tr
                        key={i}
                        className="border-b border-border hover:bg-bg2 transition-colors"
                      >
                        <td className="py-4 pr-8 text-text">{inc.service}</td>
                        <td className="py-4 pr-8">
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.08em]"
                            style={{ color: statusColor(inc.status) }}
                          >
                            {inc.status}
                          </span>
                        </td>
                        <td className="py-4 pr-8 text-text-muted">
                          {started.toLocaleString()}
                        </td>
                        <td className="py-4 pr-8 text-text-muted">
                          {resolved ? resolved.toLocaleString() : "—"}
                        </td>
                        <td className="py-4 pr-8 text-text-muted">
                          {durationStr}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
