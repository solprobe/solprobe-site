export async function getJobCount(): Promise<number> {
  try {
    const res = await fetch("https://app.virtuals.io/acp/agents/solprobe/jobs", {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.total_completed ?? 0;
  } catch {
    return 0;
  }
}
