"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import type { HealthCheck, ServiceStatus } from "@/lib/kv";

type ServiceKey = keyof HealthCheck["services"];

interface ChartPoint {
  timestamp: string;
  latency:   number;
  status:    ServiceStatus["status"];
}

const STATUS_COLOR: Record<ServiceStatus["status"], string> = {
  ok:       "#14F195",
  degraded: "#FFB800",
  down:     "#E24B4A",
};

function buildSeries(history: HealthCheck[], key: ServiceKey): ChartPoint[] {
  return [...history]
    .reverse()
    .map((check) => ({
      timestamp: check.timestamp,
      latency:   check.services[key].latency_ms,
      status:    check.services[key].status,
    }));
}

function ChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as ChartPoint;
  return (
    <div className="bg-bg3 border border-border-bright rounded px-3 py-2 font-mono text-[11px]">
      <div className="text-text-muted">
        {new Date(d.timestamp).toLocaleString()}
      </div>
      <div style={{ color: STATUS_COLOR[d.status] }}>{d.status}</div>
      <div className="text-text">{d.latency}ms</div>
    </div>
  );
}

interface Props {
  history: HealthCheck[];
}

const SERVICE_LABELS: Record<ServiceKey, { name: string; price: string }> = {
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

export default function UptimeChart({ history }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICE_KEYS.map((k) => (
          <div key={k} className="h-28 bg-bg2 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="border border-border rounded-[6px] bg-bg2 px-6 py-8 text-center">
        <p className="font-mono text-[12px] text-text-muted">
          No data yet — first health check pending.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {SERVICE_KEYS.map((key) => {
        const series = buildSeries(history, key);
        const { name, price } = SERVICE_LABELS[key];
        return (
          <div key={key} className="bg-bg2 border border-border rounded-[6px] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] text-text">
                {name}
              </span>
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.08em]">
                {price}
              </span>
            </div>
            <ResponsiveContainer width="100%" height={72}>
              <BarChart data={series} barCategoryGap={2}>
                <Bar dataKey="latency" radius={[2, 2, 0, 0]}>
                  {series.map((point, i) => (
                    <Cell
                      key={i}
                      fill={STATUS_COLOR[point.status]}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-between font-mono text-[10px] text-text-dim mt-1">
              <span>7 days ago</span>
              <span>Now</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
