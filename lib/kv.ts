// ── Status types ──────────────────────────────────────────────────────────────
export interface ServiceStatus {
  status: "ok" | "degraded" | "down";
  latency_ms: number;
}

export interface HealthCheck {
  timestamp: string; // ISO 8601
  services: {
    quick_scan:     ServiceStatus;
    token_analysis: ServiceStatus;
    full_report:    ServiceStatus;
    deep_dive:      ServiceStatus;
  };
}

export interface Incident {
  service:     string;
  started_at:  string;       // ISO 8601
  resolved_at: string | null; // null = ongoing
  status:      "degraded" | "down";
}

// ── KV keys ───────────────────────────────────────────────────────────────────
const CHECKS_KEY    = "health:checks";
const INCIDENTS_KEY = "health:incidents";

// 4 checks/day × 7 days
const MAX_CHECKS = 28;

// Lazy-load kv so missing env vars don't crash at import time
async function getKv() {
  const { kv } = await import("@vercel/kv");
  return kv;
}

// ── Health checks ─────────────────────────────────────────────────────────────
export async function saveHealthCheck(check: HealthCheck): Promise<void> {
  const kv      = await getKv();
  const existing = await getHealthChecks();
  const updated  = [check, ...existing].slice(0, MAX_CHECKS);
  await kv.set(CHECKS_KEY, updated);
}

export async function getHealthChecks(days = 7): Promise<HealthCheck[]> {
  try {
    const kv     = await getKv();
    const checks = await kv.get<HealthCheck[]>(CHECKS_KEY);
    if (!checks) return [];

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return checks.filter((c) => new Date(c.timestamp) >= cutoff);
  } catch {
    return [];
  }
}

export async function getLatestCheck(): Promise<HealthCheck | null> {
  const checks = await getHealthChecks();
  return checks[0] ?? null;
}

// ── Incidents ─────────────────────────────────────────────────────────────────
export async function saveIncident(incident: Incident): Promise<void> {
  const kv       = await getKv();
  const existing = await getIncidents();
  const updated  = [incident, ...existing];
  await kv.set(INCIDENTS_KEY, updated);
}

export async function getIncidents(days = 7): Promise<Incident[]> {
  try {
    const kv       = await getKv();
    const incidents = await kv.get<Incident[]>(INCIDENTS_KEY);
    if (!incidents) return [];

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return incidents.filter((i) => new Date(i.started_at) >= cutoff);
  } catch {
    return [];
  }
}
