import type { Metadata } from "next";
import Terminal from "@/components/Terminal";

export const metadata: Metadata = {
  title: "Services — SolProbe",
  description:
    "Seventeen Solana services for AI agents — scanning, market intel, deep-dive analysis, discovery radars, graduation tracking, exit checks, wallet intel, Twitter news synthesis, and Jupiter-routed swap execution via Virtuals Protocol ACP.",
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
  {
    id: "sol_trending",
    tier: 5,
    price: "$0.02",
    name: "Trending",
    tagline: "What's hot right now — pre-screened for safety",
    sla: "< 28 seconds",
    accentColor: "var(--cyan)",
    accentDim: "var(--cyan-dim)",
    accentGlow: "var(--cyan-glow)",
    useCases: [
      "Discovery feed for momentum and rotation agents",
      "Surfacing movers already filtered through the safety gate",
      "Seeding a watchlist with structurally-screened candidates",
    ],
    checks: [
      "Top trending tokens by volume / liquidity",
      "Each entry run through the full Quick Scan safety gate (A–F)",
      "Authority flags, LP burn, top-10 holder % per token",
      "Liquid staking tokens filtered out",
      "Sort by rank, 24h volume, or liquidity",
    ],
    terminalResponse: {
      source: "birdeye_trending",
      limit: 25,
      tokens: [
        { rank: 1, symbol: "EXAMPLE", price_usd: 1.23, liquidity_usd: 1500000, quickscan: { structural_risk_grade: "B" } },
      ],
      data_quality: "FULL",
    },
  },
  {
    id: "sol_smart_money",
    tier: 6,
    price: "$0.05",
    name: "Smart Money",
    tagline: "Where informed traders are deploying",
    sla: "< 28 seconds",
    accentColor: "var(--violet)",
    accentDim: "var(--violet-dim)",
    accentGlow: "var(--violet-glow)",
    useCases: [
      "Copy-trade discovery screened for honeypots",
      "Following smart-money flow into early positions",
      "Filtering the smart-money cohort by trader style",
    ],
    checks: [
      "Top tokens the smart-money cohort is buying",
      "Interval selectable: 1d / 7d / 30d",
      "Trader style: all / risk_averse / risk_balancers / trenchers",
      "Net smart-money flow + distinct smart-trader count",
      "Each entry run through the Quick Scan safety gate (A–F)",
    ],
    terminalResponse: {
      source: "birdeye_smart_money",
      interval: "7d",
      tokens: [
        { symbol: "EXAMPLE", net_flow_usd: 12500, smart_traders_no: 87, quickscan: { structural_risk_grade: "B" } },
      ],
      data_quality: "FULL",
    },
  },
  {
    id: "sol_signal_radar",
    tier: 7,
    price: "$0.04",
    name: "Signal Radar",
    tagline: "What's converging on-chain right now",
    sla: "< 25 seconds",
    accentColor: "var(--emerald)",
    accentDim: "var(--emerald-dim)",
    accentGlow: "var(--emerald-glow)",
    useCases: [
      "Attention radar for conviction-seeking agents",
      "Catching multi-signal convergence before price moves",
      "Ranking the day's setups by how many signals co-fire",
    ],
    checks: [
      "Weighted convergence score per token",
      "Distinct bullish signals: smart-money buys, ATH, price spikes, CTO",
      "Each top entry structurally enriched (A–F grade)",
      "Neutral manipulation flags (bundler, wash, rug, fresh-wallet, insider)",
      "Optional market-cap and min-convergence filters",
    ],
    terminalResponse: {
      source: "convergence_signals",
      tokens: [
        { rank: 1, symbol: "EXAMPLE", convergence_score: 7, distinct_bullish_types: 3, quickscan: { structural_risk_grade: "B" } },
      ],
      data_quality: "FULL",
    },
  },
  {
    id: "sol_launch_radar",
    tier: 8,
    price: "$0.05",
    name: "Launch Radar",
    tagline: "Pre-graduation discovery DEX scanners miss",
    sla: "< 25 seconds",
    accentColor: "var(--amber)",
    accentDim: "var(--amber-dim)",
    accentGlow: "rgba(245,158,11,0.30)",
    useCases: [
      "Bonding-curve discovery for early-entry agents",
      "Surfacing launchpad tokens before they hit a DEX",
      "Grading new launches before any liquidity footprint exists",
    ],
    checks: [
      "Bonding-curve tokens across new_creation + near_completion",
      "Each candidate graded A–F by the SolProbe risk engine",
      "Launchpad manipulation signals folded into the grade",
      "near_completion candidates get a full Quick Scan snapshot",
      "Optional stage / preset / smart-money / rug / market-cap filters",
    ],
    terminalResponse: {
      source: "launchpad_radar",
      tokens: [
        { rank: 1, symbol: "EXAMPLE", stage: "near_completion", risk_grade: "B", bonding_progress: 0.87, smart_degen_count: 3 },
      ],
      data_quality: "FULL",
    },
  },
  {
    id: "sol_graduation_radar",
    tier: 9,
    price: "$0.06",
    name: "Graduation Radar",
    tagline: "Tokens about to graduate off the curve",
    sla: "< 25 seconds",
    accentColor: "var(--cyan)",
    accentDim: "var(--cyan-dim)",
    accentGlow: "var(--cyan-glow)",
    useCases: [
      "Catching the graduation moment for timing agents",
      "Ranking imminent graduations by bonding progress",
      "Keeping brand-impersonation rugs visible near the top of the curve",
    ],
    checks: [
      "near_completion tokens above a bonding threshold (default 70%)",
      "Ranked by closeness to graduation",
      "A–F grade + manipulation flags retained per token",
      "Average fill-rate and estimated minutes-to-graduation",
      "Optional min_bonding_progress / min_grade / limit",
    ],
    terminalResponse: {
      source: "graduation_radar",
      tokens: [
        { rank: 1, symbol: "EXAMPLE", risk_grade: "B", bonding_progress: 0.96, est_minutes_to_graduation: 2.5 },
      ],
      data_quality: "FULL",
    },
  },
  {
    id: "sol_graduation_momentum",
    tier: 10,
    price: "$0.40",
    name: "Graduation Momentum",
    tagline: "Premium momentum scoring on graduation candidates",
    sla: "< 50 seconds",
    accentColor: "var(--violet)",
    accentDim: "var(--violet-dim)",
    accentGlow: "var(--violet-glow)",
    useCases: [
      "Ranking graduation candidates by buying velocity",
      "Premium conviction scoring for execution-ready agents",
      "Filtering momentum that can't be realised (exit-gated)",
    ],
    checks: [
      "Scores the top N candidates 0–100 (HOT / HEATING / COOLING / FLAT)",
      "Folds bonding-curve velocity + market signal",
      "Exit-feasibility gate (sellable + honeypot / sell-tax)",
      "Dev-wallet risk discount applied",
      "Holder breakdown with curve_conflated flag",
      "Optional min_bonding_progress / min_grade / enrich_count",
    ],
    terminalResponse: {
      source: "graduation_momentum",
      tokens: [
        { rank: 1, symbol: "EXAMPLE", momentum_score: 78, momentum_label: "HOT", market_signal_source: "market_intel" },
      ],
      data_quality: "FULL",
    },
  },
  {
    id: "sol_exit_check",
    tier: 11,
    price: "$0.01",
    name: "Exit Check",
    tagline: "Can you get out — and at what cost?",
    sla: "< 7 seconds",
    accentColor: "var(--emerald)",
    accentDim: "var(--emerald-dim)",
    accentGlow: "var(--emerald-glow)",
    useCases: [
      "Pre-trade trap-exit screen for trading agents",
      "Confirming a position is sellable before sizing up",
      "Catching honeypots a buy-side scan alone misses",
    ],
    checks: [
      "Deterministic sellable yes / no",
      "Expected USDC on a round-trip (default $10)",
      "Exit price impact + route count",
      "Hard blockers: freeze authority, Token-2022 non-transferable, transfer fee bps",
    ],
    terminalResponse: {
      source: "exit_check",
      sellable: true,
      expected_return_usdc: 9.81,
      exit_price_impact_pct: 0.18,
      blockers: [],
      data_quality: "FULL",
    },
  },
  {
    id: "sol_cross_exit_check",
    tier: 12,
    price: "$0.01",
    name: "Cross-chain Exit Check",
    tagline: "All-in cost to exit a Solana token back to your own chain",
    sla: "< 12 seconds",
    accentColor: "var(--amber)",
    accentDim: "var(--amber-dim)",
    accentGlow: "rgba(245,158,11,0.30)",
    useCases: [
      "Non-Solana agents pricing a full exit home",
      "Comparing Solana-native vs bridged exit cost",
      "Treasury agents repatriating to their home chain",
    ],
    checks: [
      "Everything in Exit Check, plus:",
      "Li.Fi bridge-leg quote (Solana USDC → home-chain USDC)",
      "Home chain: base / arbitrum / optimism / polygon / ethereum",
      "Composite net_home_output_usdc + all_in_cost_pct",
    ],
    terminalResponse: {
      source: "cross_exit_check",
      home_chain: "base",
      net_home_output_usdc: 9.62,
      all_in_cost_pct: 0.44,
      data_quality: "FULL",
    },
  },
  {
    id: "sol_wallet_intel",
    tier: 13,
    price: "$0.10",
    name: "Wallet Intel",
    tagline: "Vet any Solana wallet before you follow it",
    sla: "< 9 seconds",
    accentColor: "var(--violet)",
    accentDim: "var(--violet-dim)",
    accentGlow: "var(--violet-glow)",
    useCases: [
      "Deciding whether to copy-trade a wallet",
      "Screening a dev or whale before acting on their token",
      "Vetting a counterparty in an agent-to-agent deal",
    ],
    checks: [
      "Win rate, realized PnL, average hold time",
      "Wallet age + funding origin (CEX / mixer / fresh)",
      "Behaviour style (sniper / flipper / hodler / bot / pro)",
      "Copy-trade worthiness with sample size",
      "LOW_RISK / HIGH_RISK / UNKNOWN verdict",
    ],
    terminalResponse: {
      source: "wallet_intel",
      win_rate_pct: 61.5,
      realized_pnl_usd: 24800,
      behaviour_style: "pro_trader",
      verdict: "LOW_RISK",
      data_quality: "FULL",
    },
  },
  {
    id: "sol_news_pulse",
    tier: 14,
    price: "$0.01",
    name: "News Pulse",
    tagline: "What's the timeline saying right now?",
    sla: "< 8 seconds",
    accentColor: "var(--cyan)",
    accentDim: "var(--cyan-dim)",
    accentGlow: "var(--cyan-glow)",
    useCases: [
      "Cheap sentiment read before sizing a position",
      "Watchlist sentiment sweeps for trading agents",
      "A fast pulse with no LLM cost",
    ],
    checks: [
      "Live Twitter cashtag stream for the symbol",
      "BULLISH / BEARISH / NEUTRAL signal",
      "Bull / bear / neutral counts",
      "Top terms from the conversation",
      "Lexicon-only — deterministic, no LLM",
    ],
    terminalResponse: {
      source: "news_pulse",
      cashtag: "BONK",
      signal: "BULLISH",
      bull_count: 6,
      bear_count: 2,
      top_terms: ["pump", "🚀", "moon"],
      data_quality: "FULL",
    },
  },
  {
    id: "sol_news_brief",
    tier: 15,
    price: "$0.05",
    name: "News Brief",
    tagline: "An LLM read of the stream, grounded on-chain",
    sla: "< 10 seconds",
    accentColor: "var(--violet)",
    accentDim: "var(--violet-dim)",
    accentGlow: "var(--violet-glow)",
    useCases: [
      "Sentiment synthesis for a token you're evaluating",
      "Pairing narrative with structural safety in one call",
      "Agents that want prose, not raw tweets",
    ],
    checks: [
      "Haiku-synthesized brief of the Twitter stream",
      "Paired with the Quick Scan structural snapshot",
      "Sentiment grounded against on-chain reality",
      "Symbol (cashtag or mint) mode",
    ],
    terminalResponse: {
      source: "news_brief",
      cashtag: "BONK",
      signal: "BULLISH",
      brief: "Heavy retail enthusiasm; structure clean (grade B, LP burned).",
      data_quality: "FULL",
    },
  },
  {
    id: "sol_news_pulse_plus",
    tier: 16,
    price: "$0.10",
    name: "News Pulse+",
    tagline: "Who is saying what — cohort-attributed sentiment",
    sla: "< 12 seconds",
    accentColor: "var(--emerald)",
    accentDim: "var(--emerald-dim)",
    accentGlow: "var(--emerald-glow)",
    useCases: [
      "Distinguishing analyst conviction from degen hype",
      "Weighting sentiment by who is voicing it",
      "Deeper narrative read than a flat pulse",
    ],
    checks: [
      "Haiku synthesis with cohort attribution",
      "Ecosystem / analyst / degen voice split",
      "Per-cohort sentiment, not just the aggregate",
      "Symbol mode",
    ],
    terminalResponse: {
      source: "news_pulse_plus",
      cashtag: "BONK",
      cohorts: { ecosystem: "BULLISH", analyst: "NEUTRAL", degen: "BULLISH" },
      data_quality: "FULL",
    },
  },
  {
    id: "sol_news_report",
    tier: 17,
    price: "$0.25",
    name: "News Report",
    tagline: "The deepest read on a token's news flow",
    sla: "< 25 seconds",
    accentColor: "var(--amber)",
    accentDim: "var(--amber-dim)",
    accentGlow: "rgba(245,158,11,0.30)",
    useCases: [
      "Pre-position due diligence on the narrative side",
      "A structured brief an agent can act on",
      "Catching invented-token noise before it misleads",
    ],
    checks: [
      "Sonnet-grade structured JSON report",
      "Key takes + a synthesized narrative",
      "Risks called out explicitly",
      "Watch list with invented-token filtering",
    ],
    terminalResponse: {
      source: "news_report",
      cashtag: "BONK",
      takes: ["Retail-driven momentum", "No fresh catalyst"],
      risks: ["Sentiment is reflexive — fades fast"],
      watch_list: ["WIF", "MEW"],
      data_quality: "FULL",
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
            Seventeen services.{" "}
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
