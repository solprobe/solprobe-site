import { NextResponse } from "next/server";
import { getBackendHealth } from "@/lib/backend";

export const revalidate = 60;

export async function GET() {
  try {
    const health = await getBackendHealth();
    return NextResponse.json({
      status: health.status,
      timestamp: new Date().toISOString(),
      uptime_seconds:        health.uptime_seconds        ?? null,
      total_requests:        health.total_requests        ?? null,
      cache_hits:            health.cache_hits            ?? null,
      degraded_sources:      health.degraded_sources      ?? [],
      circuit_breakers:      health.circuit_breakers      ?? {},
      source_success_rates:  health.source_success_rates  ?? {},
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "down",
        timestamp: new Date().toISOString(),
        error: "backend_unreachable",
        message: String(err),
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
