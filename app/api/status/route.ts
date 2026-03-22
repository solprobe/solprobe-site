import { getLatestCheck, getHealthChecks, getIncidents } from "@/lib/kv";

export async function GET(): Promise<Response> {
  const [latest, history, incidents] = await Promise.all([
    getLatestCheck(),
    getHealthChecks(7),
    getIncidents(7),
  ]);

  return Response.json(
    { latest, history, incidents },
    { headers: { "Cache-Control": "no-store" } },
  );
}
