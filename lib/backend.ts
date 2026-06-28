// Thin client for the SolProbe backend's well-known JSON manifests.
// The backend at api.solprobe.xyz is the source of truth for pricing,
// schemas, and runtime health. Site routes derive from these manifests
// rather than maintaining a parallel hardcoded copy.

const BACKEND_BASE =
  process.env.BACKEND_URL?.replace(/\/+$/, "") ?? "https://api.solprobe.xyz";

// Map backend OpenAPI paths to the stable site-side service ids.
// Site routes and marketing copy reference these ids; backend paths can
// move (e.g. versioning) without breaking the site contract.
export const PATH_TO_SERVICE_ID = {
  "/scan/quick":    "quick_scan",
  "/market/intel":  "market_intel",
  "/scan/deep":     "deep_dive",
  "/trade/execute": "sol_trade",
  "/scan/trending":        "trending",
  "/scan/smart-money":     "smart_money",
  "/signal/radar":         "signal_radar",
  "/launch/radar":         "launch_radar",
  "/graduation/radar":     "graduation_radar",
  "/graduation/momentum":  "graduation_momentum",
  "/exit/check":           "exit_check",
  "/exit/cross-check":     "cross_exit_check",
  "/wallet/intel":         "wallet_intel",
} as const;

export type ServiceId = (typeof PATH_TO_SERVICE_ID)[keyof typeof PATH_TO_SERVICE_ID];

// SLA targets are part of the marketing/service spec, not runtime — keep
// them site-side. If we ever expose measured p50/p95 from the backend
// (e.g. on a future /stats endpoint), swap this for a derived value.
export const SLA_MS_BY_SERVICE: Record<ServiceId, number> = {
  quick_scan:   5000,
  market_intel: 10000,
  deep_dive:    30000,
  sol_trade:    15000,
  trending:            28000,
  smart_money:         28000,
  signal_radar:        25000,
  launch_radar:        25000,
  graduation_radar:    25000,
  graduation_momentum: 50000,
  exit_check:          7000,
  cross_exit_check:    12000,
  wallet_intel:        9000,
};

export interface OpenApiPathOp {
  summary?: string;
  description?: string;
  requestBody?: {
    content?: Record<string, { schema?: unknown }>;
  };
  responses?: {
    "200"?: {
      content?: Record<string, { schema?: unknown }>;
    };
  };
  "x-payment-info"?: {
    price?: { mode?: string; currency?: string; amount?: string };
  };
}

export interface OpenApiDoc {
  openapi: string;
  info: { title: string; version: string; summary?: string };
  paths: Record<string, { post?: OpenApiPathOp; get?: OpenApiPathOp }>;
}

export interface BackendHealth {
  status: "ok" | "degraded" | "down";
  uptime_seconds?: number;
  cache_hits?: number;
  total_requests?: number;
  degraded_sources?: string[];
  circuit_breakers?: Record<string, "CLOSED" | "HALF_OPEN" | "OPEN">;
  source_success_rates?: Record<string, number>;
}

// OpenAPI rarely changes (pricing, route list, schemas). 1h revalidate is
// plenty; on backend deploy the site rebuilds within the window or a
// deploy hook can force-revalidate sooner.
export async function getOpenApi(): Promise<OpenApiDoc> {
  const res = await fetch(`${BACKEND_BASE}/openapi.json`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`backend /openapi.json: ${res.status}`);
  return res.json();
}

// Health changes minute-to-minute (circuit breakers, success rates).
// Short revalidate so the public status page reflects real degradations
// without hammering the backend on every page view.
export async function getBackendHealth(): Promise<BackendHealth> {
  const res = await fetch(`${BACKEND_BASE}/health`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`backend /health: ${res.status}`);
  return res.json();
}

export function backendBaseUrl(): string {
  return BACKEND_BASE;
}
