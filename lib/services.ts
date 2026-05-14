export type ServiceAccent = "violet" | "cyan" | "emerald" | "amber";

export type ApiService = {
  slug: "quick_scan" | "market_intel" | "deep_dive" | "trade_execute";
  name: string;
  endpoint: string;
  acpSlug: string;
  priceUsd: string;
  priceAtomic: string;
  slaLabel: string;
  description: string;
  accent: ServiceAccent;
};

export const API_SERVICES: readonly ApiService[] = [
  {
    slug: "quick_scan",
    name: "Quick Scan",
    endpoint: "/scan/quick",
    acpSlug: "sol_quick_scan",
    priceUsd: "$0.02",
    priceAtomic: "20000",
    slaLabel: "SLA <5s",
    description:
      "Structural safety check — honeypot detection, authority status, holder concentration, liquidity snapshot, and risk grade in under 5 seconds.",
    accent: "violet",
  },
  {
    slug: "market_intel",
    name: "Market Intel",
    endpoint: "/market/intel",
    acpSlug: "sol_market_intel",
    priceUsd: "$0.20",
    priceAtomic: "200000",
    slaLabel: "SLA <10s",
    description:
      "Live market state — price, 1h/24h change, volume, buy/sell pressure, large-tx detection, and a BULLISH / BEARISH / NEUTRAL signal.",
    accent: "cyan",
  },
  {
    slug: "deep_dive",
    name: "Deep Dive",
    endpoint: "/scan/deep",
    acpSlug: "sol_deep_dive",
    priceUsd: "$0.50",
    priceAtomic: "500000",
    slaLabel: "SLA <30s",
    description:
      "Full risk report — wash trading score, momentum score, bundled-launch detection, pump.fun origin, recommendation (BUY / AVOID / WATCH / DYOR).",
    accent: "emerald",
  },
  {
    slug: "trade_execute",
    name: "Trade",
    endpoint: "/trade/execute",
    acpSlug: "sol_trade",
    priceUsd: "$0.15",
    priceAtomic: "150000",
    slaLabel: "SLA <15s",
    description:
      "Jupiter-routed swap execution with built-in risk gating. /trade/quote is free; charged once on commit when you POST your signed Solana tx for broadcast.",
    accent: "amber",
  },
] as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.solprobe.xyz";
