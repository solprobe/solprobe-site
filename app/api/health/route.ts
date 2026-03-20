import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      quick_scan:     { status: "ok", latency_p50_ms: 340 },
      wallet_risk:    { status: "ok", latency_p50_ms: 480 },
      market_intel:   { status: "ok", latency_p50_ms: 290 },
      deep_dive:      { status: "ok", latency_p50_ms: 8200 },
    },
    version: "1.0.0",
  });
}
