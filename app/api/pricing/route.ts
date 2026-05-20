import { NextResponse } from "next/server";
import {
  getOpenApi,
  PATH_TO_SERVICE_ID,
  SLA_MS_BY_SERVICE,
  type ServiceId,
} from "@/lib/backend";

export const revalidate = 3600;

export async function GET() {
  try {
    const doc = await getOpenApi();
    const tiers: Array<{ id: ServiceId; price: number; sla_ms: number }> = [];

    for (const [path, id] of Object.entries(PATH_TO_SERVICE_ID)) {
      const amount = doc.paths[path]?.post?.["x-payment-info"]?.price?.amount;
      if (amount === undefined) continue;
      tiers.push({
        id: id as ServiceId,
        price: Number(amount),
        sla_ms: SLA_MS_BY_SERVICE[id as ServiceId],
      });
    }

    return NextResponse.json({
      currency: "USDC",
      updated_at: new Date().toISOString(),
      tiers,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "backend_unreachable", message: String(err) },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
