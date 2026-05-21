import type { Metadata } from "next";
import Terminal from "@/components/Terminal";

export const metadata: Metadata = {
  title: "Services — SolProbe",
  description:
    "Four Solana services for AI agents — scanning, market intel, deep-dive analysis, and Jupiter-routed swap execution via Virtuals Protocol ACP.",
};

// ── Service definitions ─────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "quick_scan",
    tier: 1,
    price: "$0.02",
    name: "Quick Scan",
    tagline: "Instant safety check before any trade",
    sla: "< 5 seconds",
    accentColor: "var(--emerald)",
    accentDim: "var(--emerald-dim)",
    accentGlow: "var(--emerald-glow)",
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
    id: "market_intel",
    tier: 2,
    price: "$0.20",
    name: "Market Intel",
    tagline: "Real-time signals for pre-trade decisions",
    sla: "< 10 seconds",
    accentColor: "var(--violet)",
    accentDim: "var(--violet-dim)",
    accentGlow: "var(--violet-glow)",
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
    tier: 3,
    price: "$0.50",
    name: "Deep Dive",
    tagline: "Comprehensive analysis for high-stakes decisions",
    sla: "< 30 seconds",
    accentColor: "var(--amber)",
    accentDim: "var(--amber-dim)",
    accentGlow: "rgba(245,158,11,0.30)",
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
  {
    id: "sol_trade",
    tier: 4,
    price: "$0.15",
    name: "Trade",
    tagline: "Jupiter-routed swap execution with built-in risk gating",
    sla: "< 15 seconds",
    accentColor: "var(--cyan)",
    accentDim: "var(--cyan-dim)",
    accentGlow: "var(--cyan-glow)",
    useCases: [
      "Autonomous token swaps without human-in-the-loop custody",
      "Risk-gated trade execution for portfolio management agents",
      "Programmatic swaps with Jupiter's aggregated liquidity",
    ],
    checks: [
      "Phase A — validate request, run risk gate, fetch Jupiter Ultra best-route quote",
      "Grade-F tokens rejected before any swap is attempted",
      "Returns an unsigned transaction — the buyer wallet never leaves agent control",
      "Phase B — broadcast the agent-signed transaction to the network",
      "Returns confirmed tx_signature on success",
      "Pair with sol_quick_scan for additional structural safety context",
    ],
    terminalResponse: {
      phase: "execute",
      status: "confirmed",
      tx_signature: "5xK9...mQ7",
      input_mint: "So11...1112",
      output_mint: "EPjF...uMk2",
      input_amount: 1000000,
      output_amount_usd: 241.85,
      price_impact_pct: 0.12,
      fee_usdc: 0.15,
    },
  },
] as const;

// ── Page ────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="relative z-10 pt-[calc(64px+80px)] pb-20 px-section-x border-b border-border overflow-hidden">
        {/* Ambient violet glow behind header */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />
        <div className="relative z-10 max-w-8xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="section-tag-line" />
            <span className="font-body text-[11px] tracking-[0.12em] uppercase text-violet">
              Services
            </span>
          </div>
          <h1 className="font-sans font-extrabold text-[clamp(36px,4vw,64px)] leading-[1.05] mb-5">
            Four services.{" "}
            <span className="text-emerald">Pay per use.</span>
          </h1>
          <p className="font-body font-light text-[15px] leading-relaxed text-text-sub max-w-[600px]">
            Every service returns structured JSON and logs a reputation event
            on-chain via Virtuals Protocol ACP. No subscriptions — agents pay
            only for the intelligence they consume.
          </p>
        </div>
      </section>

      {/* ── Service sections ── */}
      {SERVICES.map(
        (
          {
            id,
            tier,
            price,
            name,
            tagline,
            sla,
            accentColor,
            accentDim,
            accentGlow,
            useCases,
            checks,
            terminalResponse,
            ...rest
          },
          index
        ) => {
          const featured = "featured" in rest && rest.featured;
          const terminalRight = index % 2 === 0;

          const detailsBlock = (
            <div>
              {/* Tier badge + popular tag */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-body text-[11px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border"
                  style={{
                    color: accentColor,
                    borderColor: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
                    background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
                  }}
                >
                  Tier {tier}
                </span>
                {featured && (
                  <span
                    className="font-body text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border"
                    style={{
                      color: "var(--violet)",
                      borderColor: "rgba(139,92,246,0.30)",
                      background: "var(--violet-dim)",
                    }}
                  >
                    Popular
                  </span>
                )}
              </div>

              {/* Price */}
              <div
                className="font-mono font-bold text-[48px] leading-none mb-2 tabular-nums"
                style={{ color: accentColor }}
              >
                {price}
              </div>
              <h2 className="font-sans font-bold text-[28px] leading-tight mb-3">
                {name}
              </h2>
              <p className="font-body text-[14px] leading-relaxed text-text-sub mb-8">
                {tagline}
              </p>

              {/* SLA */}
              <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full"
                style={{
                  background: `color-mix(in srgb, ${accentColor} 8%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${accentColor} 25%, transparent)`,
                }}
              >
                <span
                  className="pulse-dot w-1.5 h-1.5 rounded-full shrink-0 inline-block"
                  style={{ background: accentColor }}
                />
                <span className="font-body text-[12px]" style={{ color: accentColor }}>
                  SLA: {sla}
                </span>
              </div>

              {/* What's checked */}
              <div className="mb-8">
                <div
                  className="font-body text-[11px] tracking-[0.12em] uppercase mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  What&apos;s checked
                </div>
                <ul className="flex flex-col gap-2.5">
                  {checks.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2.5 font-body text-[13px] leading-snug text-text-sub"
                    >
                      <span
                        className="shrink-0 mt-0.5 text-[12px]"
                        style={{ color: accentColor }}
                      >
                        →
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use cases */}
              <div>
                <div
                  className="font-body text-[11px] tracking-[0.12em] uppercase mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Use cases
                </div>
                <ul className="flex flex-col gap-2.5">
                  {useCases.map((u) => (
                    <li
                      key={u}
                      className="flex items-start gap-2.5 font-body text-[13px] leading-snug text-text-sub"
                    >
                      <span
                        className="shrink-0 mt-0.5 text-[12px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        ·
                      </span>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );

          const terminalBlock = (
            <div className="lg:sticky lg:top-[calc(64px+32px)]">
              <Terminal
                service={`${id} — example response`}
                command={`solprobe ${id} <token_address>`}
                fee={price}
                response={terminalResponse}
              />
            </div>
          );

          return (
            <section
              key={id}
              id={id}
              className="relative z-10 py-20 px-section-x border-b border-border overflow-hidden"
            >
              {/* Per-section ambient accent glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute rounded-full"
                style={{
                  width: "500px",
                  height: "500px",
                  top: "-100px",
                  [terminalRight ? "right" : "left"]: "-150px",
                  background: `radial-gradient(circle, color-mix(in srgb, ${accentColor} 8%, transparent) 0%, transparent 70%)`,
                  filter: "blur(80px)",
                  zIndex: 0,
                }}
              />
              <div className="relative z-10 max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start reveal">
                {terminalRight ? (
                  <>
                    {detailsBlock}
                    {terminalBlock}
                  </>
                ) : (
                  <>
                    {terminalBlock}
                    {detailsBlock}
                  </>
                )}
              </div>
            </section>
          );
        }
      )}
    </>
  );
}
