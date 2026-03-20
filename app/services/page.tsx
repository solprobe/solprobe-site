import type { Metadata } from "next";
import Terminal from "@/components/Terminal";

export const metadata: Metadata = {
  title: "Services — SolProbe",
  description:
    "Four Solana token intelligence tiers for AI agents. From $0.01 quick scans to $0.50 deep dives via Virtuals Protocol ACP.",
};

// ── Service definitions ─────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "quick_scan",
    tier: 1,
    price: "$0.01",
    name: "Quick Scan",
    tagline: "Instant safety check before any trade",
    sla: "< 5 seconds",
    accentColor: "var(--green)",
    useCases: [
      "Pre-trade safety gate for trading agents",
      "Bulk screening of token watchlists",
      "Fast honeypot detection in sniper bots",
    ],
    checks: [
      "Risk grade A–F (deterministic scoring)",
      "Mint authority revoked check",
      "Freeze authority revoked check",
      "Top-10 holder concentration %",
      "Liquidity snapshot (USD)",
      "Data confidence rating",
    ],
    terminalResponse: {
      risk_grade: "B",
      is_honeypot: false,
      mint_authority_revoked: true,
      freeze_authority_revoked: true,
      top_10_holder_pct: 42.1,
      liquidity_usd: 284000,
      summary: "No major flags. Moderate holder concentration.",
      data_confidence: "HIGH",
    },
  },
  {
    id: "wallet_risk",
    tier: 2,
    price: "$0.02",
    name: "Wallet Risk",
    tagline: "Counterparty risk profile before interaction",
    sla: "< 10 seconds",
    accentColor: "var(--sol)",
    useCases: [
      "Evaluating counterparty wallets before OTC trades",
      "Filtering out bot wallets from airdrop lists",
      "Due diligence on new LP providers",
    ],
    checks: [
      "Wallet age in days",
      "Total transaction count",
      "Bot behaviour detection",
      "Rug pull involvement history",
      "Whale status flag",
      "Risk score 0–100",
      "Trading style classification",
    ],
    terminalResponse: {
      wallet_age_days: 312,
      total_transactions: 4821,
      is_bot: false,
      rug_involvement_count: 0,
      whale_status: false,
      risk_score: 18,
      trading_style: "flipper",
      data_confidence: "HIGH",
    },
  },
  {
    id: "market_intel",
    tier: 3,
    price: "$0.05",
    name: "Market Intel",
    tagline: "Real-time signals for pre-trade decisions",
    sla: "< 10 seconds",
    accentColor: "var(--sol)",
    featured: true,
    useCases: [
      "Momentum-based entry/exit timing for trading agents",
      "Detecting unusual volume spikes before news breaks",
      "Cross-token signal comparison for portfolio agents",
    ],
    checks: [
      "Current price (USD)",
      "Price change 1h and 24h %",
      "Volume 1h and 24h (USD)",
      "Liquidity depth (USD)",
      "Buy and sell pressure classification",
      "Large transactions last hour (> $10k)",
      "BULLISH / BEARISH / NEUTRAL signal",
    ],
    terminalResponse: {
      current_price_usd: 0.00412,
      price_change_1h_pct: 3.2,
      price_change_24h_pct: 18.7,
      volume_1h_usd: 84200,
      volume_24h_usd: 1240000,
      liquidity_usd: 284000,
      buy_pressure: "HIGH",
      sell_pressure: "LOW",
      large_txs_last_hour: 3,
      signal: "BULLISH",
      data_confidence: "HIGH",
    },
  },
  {
    id: "deep_dive",
    tier: 4,
    price: "$0.50",
    name: "Deep Dive",
    tagline: "Comprehensive analysis for high-stakes decisions",
    sla: "< 30 seconds",
    accentColor: "var(--amber)",
    useCases: [
      "Full due diligence before large position entry",
      "Automated rug detection for portfolio protection agents",
      "Pre-investment screening for fund management agents",
    ],
    checks: [
      "Everything in Quick Scan",
      "Dev wallet analysis (balance, prior rugs, token history)",
      "LP lock status and duration",
      "Wash trading score (0–100)",
      "Pump.fun launch detection",
      "Bundled launch detection",
      "Volume and price momentum score",
      "Full 3–5 sentence risk report",
      "BUY / AVOID / WATCH / DYOR recommendation",
    ],
    terminalResponse: {
      risk_grade: "A",
      verdict: "SAFE",
      pump_fun_launched: false,
      bundled_launch_detected: false,
      wash_trading_score: 4,
      momentum_score: 72,
      recommendation: "BUY",
      data_confidence: "HIGH",
    },
  },
] as const;

// ── Page ────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative z-10 pt-[calc(64px+80px)] pb-16 px-section-x border-b border-border">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-tag-line" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
              Services
            </span>
          </div>
          <h1 className="font-sans font-extrabold text-[clamp(36px,4vw,56px)] leading-[1.1] mb-4">
            Four tiers.{" "}
            <span className="text-green">Pay per scan.</span>
          </h1>
          <p className="font-mono font-light text-[14px] text-text-muted max-w-[560px]">
            Every service returns structured JSON and logs a reputation event
            on-chain via Virtuals Protocol ACP. No subscriptions — agents pay
            only for the intelligence they consume.
          </p>
        </div>
      </section>

      {/* Service sections */}
      {SERVICES.map(
        ({
          id,
          tier,
          price,
          name,
          tagline,
          sla,
          accentColor,
          useCases,
          checks,
          terminalResponse,
          ...rest
        }) => {
          const featured = "featured" in rest && rest.featured;
          return (
            <section
              key={id}
              id={id}
              className="relative z-10 py-20 px-section-x border-b border-border"
            >
              <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left — details */}
                <div>
                  {/* Tier badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="font-mono text-[11px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border"
                      style={{
                        color: accentColor,
                        borderColor: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
                        background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
                      }}
                    >
                      Tier {tier}
                    </span>
                    {featured && (
                      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-sol border border-sol/30 bg-sol-dim px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <div
                    className="font-mono font-bold text-[40px] leading-none mb-1"
                    style={{ color: accentColor }}
                  >
                    {price}
                  </div>
                  <h2 className="font-sans font-bold text-[28px] mb-2">{name}</h2>
                  <p className="font-mono text-[13px] text-text-muted mb-8">
                    {tagline}
                  </p>

                  {/* SLA */}
                  <div className="flex items-center gap-2 mb-8 font-mono text-[12px] text-text-muted">
                    <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-green inline-block" />
                    SLA: <span className="text-green">{sla}</span>
                  </div>

                  {/* What's checked */}
                  <div className="mb-8">
                    <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-dim mb-3">
                      What&apos;s checked
                    </div>
                    <ul className="flex flex-col gap-2">
                      {checks.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2 font-mono text-[12px] text-text-muted"
                        >
                          <span className="text-green mt-0.5">→</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use cases */}
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-dim mb-3">
                      Use cases
                    </div>
                    <ul className="flex flex-col gap-2">
                      {useCases.map((u) => (
                        <li
                          key={u}
                          className="flex items-start gap-2 font-mono text-[12px] text-text-muted"
                        >
                          <span className="text-sol mt-0.5">·</span>
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right — terminal */}
                <div className="lg:sticky lg:top-[calc(64px+32px)]">
                  <Terminal
                    service={`${id} — example response`}
                    command={`solprobe ${id} <token_address>`}
                    fee={price}
                    response={terminalResponse}
                  />
                </div>
              </div>
            </section>
          );
        }
      )}
    </>
  );
}
