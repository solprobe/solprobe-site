import { NextResponse } from "next/server";
import {
  getOpenApi,
  PATH_TO_SERVICE_ID,
  type ServiceId,
} from "@/lib/backend";

export const revalidate = 3600;

interface ServiceSchema {
  price_virtual: number;
  input: unknown;
  output: unknown;
}

export async function GET() {
  try {
    const doc = await getOpenApi();
    const services: Partial<Record<ServiceId, ServiceSchema>> = {};

    for (const [path, id] of Object.entries(PATH_TO_SERVICE_ID)) {
      const op = doc.paths[path]?.post;
      if (!op) continue;
      const amount = op["x-payment-info"]?.price?.amount;
      services[id as ServiceId] = {
        price_virtual: amount === undefined ? 0 : Number(amount),
        input:  op.requestBody?.content?.["application/json"]?.schema ?? null,
        output: op.responses?.["200"]?.content?.["application/json"]?.schema ?? null,
      };
    }

    return NextResponse.json({
      version: doc.info.version,
      services,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "backend_unreachable", message: String(err) },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
