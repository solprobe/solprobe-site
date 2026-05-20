import Link from "next/link";
import Terminal from "@/components/Terminal";
import StatsStrip from "@/components/StatsStrip";
import HowItWorks from "@/components/HowItWorks";
import ServiceCard from "@/components/ServiceCard";
import HeroShader from "@/components/HeroShader";
import { getJobCount } from "@/lib/acp";

// ── Service tier data ────────────────────────────────────────────────────────
const TIERS = [
  {
    tier: 1 as const,
    price: "$0.02",
    name: "Quick Scan",
    sla: "< 5s",
    icon: "⬡",
    features: [
      "Risk grade (A–F)",
      "Mint / freeze authority check",
      "Top-10 holder concentration",
      "Liquidity snapshot",
    ],
  },
  {
    tier: 2 as const,
    price: "$0.20",
    name: "Market Intel",
    sla: "< 10s",
    featured: true,
    icon: "◈",
    features: [
      "Real-time price & volume",
      "Buy / sell pressure ratio",
      "Large-tx detection",
      "BULLISH / BEARISH signal",
    ],
  },
  {
    tier: 3 as const,
    price: "$0.50",
    name: "Deep Dive",
    sla: "< 30s",
    icon: "⬢",
    features: [
      "Dev wallet analysis",
      "LP lock status",
      "Wash-trading score",
      "Pump.fun / bundle detection",
      "Full risk report + recommendation",
    ],
  },
  {
    tier: 4 as const,
    price: "$0.15",
    name: "Trade",
    sla: "< 15s",
    icon: "⟳",
    features: [
      "Jupiter Ultra best-route quote",
      "Grade-F tokens rejected at gate",
      "Unsigned tx returned — wallet stays yours",
      "Broadcast on agent signature",
      "Confirmed tx_signature on success",
    ],
  },
] as const;

// ── Trust badges ─────────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { label: "ACP Registered", sub: "Mainnet verified" },
  { label: "On-chain Escrow", sub: "Every job" },
  { label: "Reputation", sub: "Onchain reviews" },
  { label: "Network", sub: "Solana Mainnet" },
] as const;

// ── Intelligence sources ──────────────────────────────────────────────────────
const INTEL_SOURCES = [
  {
    source: "Helius",
    layer: "On-chain",
    signals: ["Authority flags", "LP burn status", "Holder distribution"],
    color: "var(--violet)",
  },
  {
    source: "RugCheck",
    layer: "Historical",
    signals: ["Rug history", "Bundled launch detection", "Risk score"],
    color: "var(--amber)",
  },
  {
    source: "DexScreener",
    layer: "Market",
    signals: ["Liquidity depth", "Price & volume", "Buy/sell ratio"],
    color: "var(--emerald)",
  },
  {
    source: "Birdeye",
    layer: "ATH / Price",
    signals: ["All-time high", "Short-term intervals", "Price momentum"],
    color: "var(--cyan)",
  },
] as const;

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const jobCount = await getJobCount();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative z-10 pt-48 pb-28 px-section-x overflow-hidden">

        {/* WebGL shader background */}
        <HeroShader />

        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Live status pill */}
            <div
              className="stagger-in inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full font-body text-[12px]"
              style={{
                "--delay": "0s",
                color: "var(--emerald)",
                border: "1px solid rgba(16,185,129,0.30)",
                background: "rgba(16,185,129,0.08)",
              } as React.CSSProperties}
            >
              <span
                className="pulse-dot w-2 h-2 rounded-full inline-block shrink-0"
                style={{ background: "var(--emerald)" }}
              />
              Live on ACP Mainnet
            </div>

            {/* Massive heading */}
            <h1
              className="stagger-in font-sans font-bold leading-[1.0] mb-6"
              style={{
                "--delay": "0.1s",
                fontSize: "clamp(48px,6vw,88px)",
              } as React.CSSProperties}
            >
              Solana token
              <br />
              intelligence
              <br />
              <span className="shimmer-text">for AI agents</span>
            </h1>

            <p
              className="stagger-in font-body text-[15px] leading-[1.7] mb-10 max-w-md"
              style={{
                "--delay": "0.2s",
                color: "var(--text-sub)",
              } as React.CSSProperties}
            >
              SolProbe sells on-chain scanning services to AI agents via
              Virtuals Protocol ACP — from $0.02 quick safety checks to $0.50
              deep-dive risk reports. Pay per scan, no subscription.
            </p>

            <div
              className="stagger-in flex flex-wrap gap-4"
              style={{ "--delay": "0.3s" } as React.CSSProperties}
            >
              {/* Primary — shiny border button */}
              <div className="shiny-btn">
                <Link
                  href="/services"
                  className="
                    font-body text-[14px] font-semibold
                    px-7 py-3 rounded-full no-underline
                    text-white
                    transition-all duration-300
                    hover:text-text
                    whitespace-nowrap
                  "
                >
                  Explore services →
                </Link>
              </div>

              {/* Secondary — ghost */}
              <Link
                href="/docs"
                className="
                  font-body text-[14px] font-medium
                  px-7 py-3 rounded-full no-underline
                  transition-all duration-300
                  hover:text-text
                  whitespace-nowrap
                "
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "var(--text-sub)",
                }}
              >
                Read the docs
              </Link>
            </div>
          </div>

          {/* Right — Terminal with ambient glow + slight rotation */}
          <div
            className="stagger-in relative"
            style={{ "--delay": "0.2s" } as React.CSSProperties}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
                filter: "blur(60px)",
                opacity: 0.4,
                zIndex: 0,
              }}
            />
            <div
              className="relative z-10 transition-transform duration-500 ease-out hover:[transform:rotate(0deg)]"
              style={{ transform: "rotate(1.5deg)" }}
            >
              <Terminal
                service="sol_deep_dive — token analysis"
                command="solprobe scan --deep So1Probe...xK9"
                fee="$0.50 USDC"
                response={{
                  schema_version: "2.0",
                  structural_risk_grade: "A",
                  signal: "BULLISH",
                  mint_authority_revoked: true,
                  freeze_authority_revoked: true,
                  top_10_holder_pct: 38.4,
                  lp_status: "NOT_APPLICABLE",
                  recommendation: "CONSIDER",
                  data_confidence: "HIGH",
                  latency_ms: 312,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ticker ── */}
      <StatsStrip jobCount={jobCount} />

      {/* ── How it works ── */}
      <HowItWorks />

      {/* ── Service tiers ── */}
      <section className="relative z-10 py-24 px-section-x border-t border-border">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-tag-line" />
            <span className="font-body text-[11px] tracking-[0.12em] uppercase text-violet">
              Services
            </span>
          </div>
          <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12 reveal">
            Four services. Pay per use.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIERS.map(({ tier, price, name, sla, features, icon, ...rest }) => (
              <ServiceCard
                key={tier}
                tier={tier}
                price={price}
                name={name}
                sla={sla}
                features={features}
                icon={icon}
                featured={"featured" in rest && rest.featured === true}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="
                font-body text-[13px] font-medium
                px-6 py-2.5 rounded-full no-underline
                transition-all duration-300
                hover:text-text
              "
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                color: "var(--text-sub)",
              }}
            >
              View full service details →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust / ACP section ── */}
      <section className="relative z-10 py-24 px-section-x border-t border-border">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-tag-line" />
              <span className="font-body text-[11px] tracking-[0.12em] uppercase text-violet">
                Trust layer
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-6">
              Built on Virtuals Protocol ACP
            </h2>
            <p
              className="font-body text-[14px] leading-relaxed mb-8"
              style={{ color: "var(--text-sub)" }}
            >
              Every job is verified, escrowed, and settled on-chain via Virtuals
              Protocol&apos;s Agent Commerce Protocol. SolProbe&apos;s reputation is
              transparent and publicly auditable on Solana mainnet.
            </p>
            <Link
              href="https://app.virtuals.io/acp/agent/24456"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                font-body text-[13px] tracking-[0.06em] uppercase
                no-underline
                transition-colors duration-200 hover:text-text
              "
              style={{ color: "var(--violet)" }}
            >
              View ACP registry →
            </Link>
          </div>

          {/* Right — 2×2 trust badges */}
          <div className="grid grid-cols-2 gap-3">
            {TRUST_BADGES.map(({ label, sub }) => (
              <div
                key={label}
                className="feature-card p-6 flex flex-col gap-3 reveal"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "var(--emerald)" }}
                  />
                  <div className="font-sans font-bold text-[13px] text-text">{label}</div>
                </div>
                <div className="font-body text-[12px] text-text-muted">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For AI Agents ── */}
      <section className="relative z-10 py-24 px-section-x border-t border-border">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-tag-line" />
              <span className="font-body text-[11px] tracking-[0.12em] uppercase text-violet">
                A2A
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-6">
              Built for autonomous agents
            </h2>
            <p
              className="font-body text-[14px] leading-relaxed mb-8"
              style={{ color: "var(--text-sub)" }}
            >
              SolProbe is registered on Virtuals ACP. Any compatible agent
              discovers it via the registry, escrows a fee on-chain, and receives
              structured JSON — no human in the loop.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Deterministic output — same input always returns same schema",
                "Schema-versioned responses — breaking changes are versioned",
                "On-chain job log — every call is a permanent reputation event",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-[13px]"
                  style={{ color: "var(--text-sub)" }}
                >
                  <span className="mt-0.5 shrink-0" style={{ color: "var(--emerald)" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/agent.json"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                font-body text-[13px] tracking-[0.06em] uppercase
                no-underline
                transition-colors duration-200 hover:text-text
              "
              style={{ color: "var(--violet)" }}
            >
              View agent.json →
            </Link>
          </div>

          {/* Right — ACP flow terminal (IDE style) */}
          <div
            className="reveal rounded-2xl overflow-hidden font-mono text-[12px]"
            style={{
              background: "rgba(8,8,8,0.80)",
              backdropFilter: "blur(20px) saturate(150%)",
              WebkitBackdropFilter: "blur(20px) saturate(150%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 60px rgba(139,92,246,0.10), 0 8px 32px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="flex items-center px-4 py-3 relative"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57", opacity: 0.7 }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e", opacity: 0.7 }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28c840", opacity: 0.7 }} />
              </div>
              <span
                className="absolute left-1/2 -translate-x-1/2 text-[11px]"
                style={{ color: "var(--text-muted)" }}
              >
                ACP call flow
              </span>
            </div>
            <div className="p-6 leading-7 space-y-1">
              <div><span className="t-comment"># 1. Discover</span></div>
              <div>
                <span className="t-prompt">$ </span>
                <span className="t-cyan">acp.registry.find</span>
                <span className="text-text">(</span>
                <span className="t-str">&quot;SolProbe&quot;</span>
                <span className="text-text">)</span>
              </div>
              <div className="pl-4">
                <span style={{ color: "var(--text-muted)" }}>{"{"}</span>
                <span className="t-key">&quot;agent&quot;</span>
                <span style={{ color: "var(--text-muted)" }}>: </span>
                <span className="t-str">&quot;SolProbe&quot;</span>
                <span style={{ color: "var(--text-muted)" }}>, </span>
                <span className="t-key">&quot;tiers&quot;</span>
                <span style={{ color: "var(--text-muted)" }}>: </span>
                <span className="t-num">3</span>
                <span style={{ color: "var(--text-muted)" }}>{"}"}</span>
              </div>
              <div className="mt-3"><span className="t-comment"># 2. Escrow &amp; request</span></div>
              <div>
                <span className="t-prompt">$ </span>
                <span className="t-cyan">acp.job.create</span>
                <span className="text-text">(tier=</span>
                <span className="t-str">&quot;sol_deep_dive&quot;</span>
                <span className="text-text">, token=addr)</span>
              </div>
              <div className="pl-4">
                <span className="t-key">&quot;escrow_tx&quot;</span>
                <span style={{ color: "var(--text-muted)" }}>: </span>
                <span className="t-str">&quot;5xK9...mQ&quot;</span>
              </div>
              <div className="mt-3"><span className="t-comment"># 3. Receive structured JSON</span></div>
              <div>
                <span className="t-key">&quot;structural_risk_grade&quot;</span>
                <span style={{ color: "var(--text-muted)" }}>: </span>
                <span className="t-emerald">&quot;A&quot;</span>
              </div>
              <div>
                <span className="t-key">&quot;signal&quot;</span>
                <span style={{ color: "var(--text-muted)" }}>: </span>
                <span className="t-emerald">&quot;BULLISH&quot;</span>
              </div>
              <div>
                <span className="t-key">&quot;recommendation&quot;</span>
                <span style={{ color: "var(--text-muted)" }}>: </span>
                <span className="t-str">&quot;CONSIDER&quot;</span>
              </div>
              <div className="mt-3">
                <span className="t-comment"># ACP releases escrow. Job logged on-chain.</span>
              </div>
              <div className="mt-1">
                <span className="t-prompt">$ </span>
                <span className="cursor-blink" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intelligence Stack ── */}
      <section className="relative z-10 py-24 px-section-x border-t border-border">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-tag-line" />
            <span className="font-body text-[11px] tracking-[0.12em] uppercase text-violet">
              Data sources
            </span>
          </div>
          <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12 reveal">
            Intelligence stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEL_SOURCES.map(({ source, layer, signals, color }) => (
              <div
                key={source}
                className="feature-card p-7 flex flex-col gap-4 reveal"
              >
                <div>
                  <span
                    className="font-body text-[10px] tracking-[0.12em] uppercase mb-1 block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {layer}
                  </span>
                  <div
                    className="font-sans font-bold text-[18px]"
                    style={{ color }}
                  >
                    {source}
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {signals.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 font-body text-[12px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span className="mt-0.5 shrink-0" style={{ color: "var(--emerald)" }}>→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chat Teaser ── */}
      <section className="relative z-10 py-24 px-section-x border-t border-border">
        <div className="max-w-8xl mx-auto">
          <div
            className="rounded-3xl overflow-hidden relative reveal"
            style={{
              background: "rgba(10,10,10,0.70)",
              backdropFilter: "blur(16px) saturate(150%)",
              WebkitBackdropFilter: "blur(16px) saturate(150%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 80px rgba(139,92,246,0.15)",
            }}
          >
            {/* Dim overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: "rgba(3,3,3,0.20)" }}
            />

            {/* Phase 2 badge */}
            <div className="absolute top-6 right-6 z-20">
              <span
                className="font-body text-[10px] tracking-[0.10em] uppercase px-3 py-1 rounded-full"
                style={{
                  color: "var(--amber)",
                  border: "1px solid rgba(245,158,11,0.30)",
                  background: "rgba(245,158,11,0.08)",
                }}
              >
                Phase 2
              </span>
            </div>

            <div className="relative z-20 p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left — copy */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="section-tag-line" />
                  <span className="font-body text-[11px] tracking-[0.12em] uppercase text-violet">
                    Coming soon
                  </span>
                </div>
                <h2 className="font-sans font-bold text-[clamp(28px,3vw,44px)] leading-[1.1] mb-6">
                  Research and trade from
                  <br />
                  <span className="shimmer-text">one interface</span>
                </h2>
                <p
                  className="font-body text-[14px] leading-relaxed mb-8"
                  style={{ color: "var(--text-sub)" }}
                >
                  Connect your Solana wallet, run risk intelligence on any
                  token, and execute swaps — all in one place. Coming soon.
                </p>
                <Link
                  href="https://x.com/solprobeai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[14px] font-semibold text-white no-underline"
                >
                  <div className="shiny-btn inline-flex">
                    <span className="px-7 py-3 rounded-full whitespace-nowrap">
                      Notify me →
                    </span>
                  </div>
                </Link>
              </div>

              {/* Right — static mock UI */}
              <div
                className="rounded-2xl overflow-hidden font-mono text-[12px]"
                style={{
                  background: "rgba(8,8,8,0.80)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Mock nav bar */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="font-mono text-[12px] font-bold tracking-[0.06em]">
                    ◉ SolProbe Chat
                  </span>
                  <span
                    className="font-body text-[11px] tracking-[0.04em]"
                    style={{ color: "var(--emerald)" }}
                  >
                    Connect Wallet
                  </span>
                </div>

                {/* Chat body */}
                <div className="p-5 space-y-4">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div
                      className="rounded-xl px-4 py-2.5 max-w-[80%]"
                      style={{
                        background: "var(--bg3)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span className="text-text text-[12px]">Is BONK safe to buy right now?</span>
                    </div>
                  </div>

                  {/* Agent response card */}
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="flex items-center gap-3 px-4 py-2"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        background: "var(--bg3)",
                      }}
                    >
                      <span
                        className="text-[10px] tracking-[0.08em] uppercase"
                        style={{ color: "var(--text-muted)" }}
                      >
                        sol_deep_dive
                      </span>
                      <span className="text-[10px]" style={{ color: "var(--text-dim)" }}>·</span>
                      <span className="text-[10px]" style={{ color: "var(--amber)" }}>$0.50</span>
                      <span className="text-[10px]" style={{ color: "var(--text-dim)" }}>·</span>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>312ms</span>
                    </div>
                    <div className="px-4 py-3 space-y-1 text-[11px]">
                      <div>
                        <span className="t-key">&quot;structural_risk_grade&quot;</span>
                        <span style={{ color: "var(--text-muted)" }}>: </span>
                        <span className="t-emerald">&quot;A&quot;</span>
                      </div>
                      <div>
                        <span className="t-key">&quot;signal&quot;</span>
                        <span style={{ color: "var(--text-muted)" }}>: </span>
                        <span className="t-emerald">&quot;BULLISH&quot;</span>
                      </div>
                      <div>
                        <span className="t-key">&quot;mint_authority_revoked&quot;</span>
                        <span style={{ color: "var(--text-muted)" }}>: </span>
                        <span className="t-emerald">true</span>
                        <span className="ml-1" style={{ color: "var(--emerald)" }}>✓</span>
                      </div>
                      <div>
                        <span className="t-key">&quot;recommendation&quot;</span>
                        <span style={{ color: "var(--text-muted)" }}>: </span>
                        <span className="t-str">&quot;CONSIDER&quot;</span>
                      </div>
                    </div>
                    <div
                      className="px-4 py-2"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <span
                        className="
                          font-body text-[11px] tracking-[0.04em] uppercase
                          rounded-full px-3 py-1
                          opacity-40 cursor-not-allowed
                        "
                        style={{
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: "var(--emerald)",
                        }}
                      >
                        Swap BONK →
                      </span>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "var(--bg-card)",
                    }}
                  >
                    <span
                      className="font-body text-[12px] flex-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Ask about any Solana token...
                    </span>
                    <span
                      className="font-mono text-[11px] rounded px-1.5 py-0.5"
                      style={{
                        color: "var(--text-muted)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      ⏎
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
