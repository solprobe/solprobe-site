import { type NextRequest } from "next/server";
import {
  saveHealthCheck,
  type HealthCheck,
  type ServiceStatus,
} from "@/lib/kv";

export async function POST(request: NextRequest): Promise<Response> {
  console.log('INGEST_SECRET set:', !!process.env.INGEST_SECRET);
  console.log('Secret prefix:', process.env.INGEST_SECRET?.slice(0, 6));
  console.log('Header received:', request.headers.get('authorization')?.slice(0, 13));
  console.log('All headers:', Object.fromEntries(request.headers.entries()));

  // ── Auth ────────────────────────────────────────────────────────────────────
  const authHeader = request.headers.get("authorization");
  const secret     = process.env.INGEST_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse ───────────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isHealthCheck(body)) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  // ── Persist ──────────────────────────────────────────────────────────────────
  await saveHealthCheck(body);
  return Response.json({ ok: true });
}

// ── Validation ─────────────────────────────────────────────────────────────────
function isServiceStatus(data: unknown): data is ServiceStatus {
  if (!data || typeof data !== "object") return false;
  const s = data as Record<string, unknown>;
  return (
    (s.status === "ok" || s.status === "degraded" || s.status === "down") &&
    typeof s.latency_ms === "number"
  );
}

function isHealthCheck(data: unknown): data is HealthCheck {
  if (!data || typeof data !== "object") return false;
  const check = data as Record<string, unknown>;

  if (typeof check.timestamp !== "string") return false;
  if (!check.services || typeof check.services !== "object") return false;

  const svc = check.services as Record<string, unknown>;
  return (
    isServiceStatus(svc.quick_scan) &&
    isServiceStatus(svc.token_analysis) &&
    isServiceStatus(svc.full_report) &&
    isServiceStatus(svc.deep_dive)
  );
}
