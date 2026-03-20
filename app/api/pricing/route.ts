import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    currency: "USDC",
    updated_at: new Date().toISOString(),
    tiers: [
      { id: "quick_scan",   price: 0.01, sla_ms: 5000  },
      { id: "wallet_risk",  price: 0.02, sla_ms: 10000 },
      { id: "market_intel", price: 0.05, sla_ms: 10000 },
      { id: "deep_dive",    price: 0.50, sla_ms: 30000 },
    ],
  });
}
