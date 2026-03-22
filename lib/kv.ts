import { Redis } from "@upstash/redis";

// ── Client ────────────────────────────────────────────────────────────────────
// Lazy singleton so missing env vars don't crash at import time
let _redis: Redis | null = null;

function getRedis(): Redis {
  if (_redis) return _redis;
  const url   = process.env.UPSTASH_REDIS_REST_URL_KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_URL_KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error(
      "Missing UPSTASH_REDIS_REST_URL_KV_REST_API_URL or UPSTASH_REDIS_REST_URL_KV_REST_API_TOKEN",
    );
  }
  _redis = new Redis({ url, token });
  return _redis;
}

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
  started_at:  string;        // ISO 8601
  resolved_at: string | null; // null = ongoing
  status:      "degraded" | "down";
}

// ── KV keys ───────────────────────────────────────────────────────────────────
const CHECKS_KEY    = "health:checks";
const INCIDENTS_KEY = "health:incidents";

// 4 checks/day × 7 days
const MAX_CHECKS = 28;

// ── Health checks ─────────────────────────────────────────────────────────────
export async function saveHealthCheck(check: HealthCheck): Promise<void> {
  const redis    = getRedis();
  const existing = await getHealthChecks();
  const updated  = [check, ...existing].slice(0, MAX_CHECKS);
  await redis.set(CHECKS_KEY, JSON.stringify(updated));
}

export async function getHealthChecks(days = 7): Promise<HealthCheck[]> {
  try {
    const redis = getRedis();
    const raw   = await redis.get<string>(CHECKS_KEY);
    if (!raw) return [];

    const checks: HealthCheck[] =
      typeof raw === "string" ? (JSON.parse(raw) as HealthCheck[]) : (raw as unknown as HealthCheck[]);

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
  const redis    = getRedis();
  const existing = await getIncidents();
  const updated  = [incident, ...existing];
  await redis.set(INCIDENTS_KEY, JSON.stringify(updated));
}

export async function getIncidents(days = 7): Promise<Incident[]> {
  try {
    const redis = getRedis();
    const raw   = await redis.get<string>(INCIDENTS_KEY);
    if (!raw) return [];

    const incidents: Incident[] =
      typeof raw === "string" ? (JSON.parse(raw) as Incident[]) : (raw as unknown as Incident[]);

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return incidents.filter((i) => new Date(i.started_at) >= cutoff);
  } catch {
    return [];
  }
}
