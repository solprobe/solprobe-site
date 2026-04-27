import Link from "next/link";
import Terminal from "@/components/Terminal";
import StatsStrip from "@/components/StatsStrip";
import HowItWorks from "@/components/HowItWorks";
import ServiceCard from "@/components/ServiceCard";
import { getJobCount } from "@/lib/acp";

// ── Service tier data (3 active tiers) ─────────────────────────────────────
const TIERS = [
  {
    tier: 1 as const,
    price: "$0.05",
    name: "Quick Scan",
    sla: "< 5s",
    features: [
      "Risk grade (A–F)",
      "Mint / freeze authority check",
      "Top-10 holder concentration",
      "Liquidity snapshot",
    ],
  },
  {
    tier: 2 as const,
    price: "$0.10",
    name: "Market Intel",
    sla: "< 10s",
    featured: true,
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
    features: [
      "Dev wallet analysis",
      "LP lock status",
      "Wash-trading score",
      "Pump.fun / bundle detection",
      "Full risk report + recommendation",
    ],
  },
] as const;

// ── Trust badges ────────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { label: "ACP Registered", sub: "Mainnet verified", dot: true },
  { label: "On-chain Escrow", sub: "Every job", dot: true },
  { label: "Reputation", sub: "Onchain reviews", dot: true },
  { label: "Network", sub: "Solana Mainnet", dot: true },
] as const;

// ── Intelligence sources ────────────────────────────────────────────────────
const INTEL_SOURCES = [
  {
    source: "Helius",
    layer: "On-chain",
    signals: ["Authority flags", "LP burn status", "Holder distribution"],
    color: "var(--sol)",
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
    color: "var(--green)",
  },
  {
    source: "Birdeye",
    layer: "ATH / Price",
    signals: ["All-time high", "Short-term intervals", "Price momentum"],
    color: "var(--sol)",
  },
] as const;

// ── Page ────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const jobCount = await getJobCount();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative z-10 pt-[calc(64px+96px)] pb-28 px-section-x overflow-hidden">
        {/* Large purple blob behind headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[64px] left-[-100px] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--mesh-purple) 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: -1,
          }}
        />
        {/* Green blob bottom-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-[-80px] w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--mesh-green) 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: -1,
          }}
        />

        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Live status pill */}
            <div
              className="
                inline-flex items-center gap-2 mb-8
                px-3 py-1.5 rounded-full
                border font-mono text-[11px] text-green
              "
              style={{
                borderColor: "var(--border-green)",
                backgroundColor: "var(--green-dim)",
              }}
            >
              <span
                className="pulse-dot w-2 h-2 rounded-full inline-block shrink-0"
                style={{ background: "var(--green)" }}
              />
              Live on ACP Mainnet
            </div>

            <h1
              className="font-sans font-extrabold leading-[1.05] mb-6"
              style={{ fontSize: "clamp(48px,5.5vw,76px)" }}
            >
              Solana token intelligence
              <br />
              <span className="gradient-text-brand">for AI agents</span>
            </h1>

            <p
              className="font-mono text-[15px] leading-[1.7] mb-10 max-w-md"
              style={{ color: "var(--text-sub)" }}
            >
              SolProbe sells on-chain scanning services to AI agents via
              Virtuals Protocol ACP — from $0.05 quick safety checks to $0.50
              deep-dive risk reports. Pay per scan, no subscription.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Primary — gradient pill */}
              <Link
                href="/services"
                className="
                  font-mono text-[13px] font-medium
                  px-6 py-2.5 rounded-full no-underline
                  text-white
                  transition-all duration-200 hover:shadow-glow-sol hover:scale-[1.02]
                "
                style={{ background: "linear-gradient(135deg, var(--sol), #5b21b6)" }}
              >
                Explore services →
              </Link>
              {/* Secondary — ghost */}
              <Link
                href="/docs"
                className="
                  font-mono text-[13px] font-medium
                  px-6 py-2.5 rounded-full no-underline
                  border transition-all duration-200
                "
                style={{
                  borderColor: "var(--border-mid)",
                  color: "var(--text-sub)",
                }}
                onMouseEnter={undefined}
              >
                Read the docs
              </Link>
            </div>
          </div>

          {/* Right — Terminal with orb + slight rotation */}
          <div className="relative">
            {/* Decorative orb behind terminal */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, var(--sol-glow) 0%, transparent 70%)",
                filter: "blur(60px)",
                opacity: 0.3,
                zIndex: 0,
              }}
            />
            <div
              className="relative z-10 transition-transform duration-300 ease-out hover:[transform:rotate(0deg)]"
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

      {/* ── Stats strip ── */}
      <StatsStrip jobCount={jobCount} />

      {/* ── How it works ── */}
      <HowItWorks />

      {/* ── Service tiers ── */}
      <section className="relative z-10 py-24 px-section-x border-t border-border">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-tag-line" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
              Services
            </span>
          </div>
          <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12 reveal">
            Three tiers. Pay per scan.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TIERS.map(({ tier, price, name, sla, features, ...rest }) => (
              <ServiceCard
                key={tier}
                tier={tier}
                price={price}
                name={name}
                sla={sla}
                features={features}
                featured={"featured" in rest && rest.featured === true}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/services"
              className="
                font-mono text-[12px] font-medium
                px-6 py-2.5 rounded-full no-underline
                border transition-all duration-200
                hover:border-border-bright hover:text-text
              "
              style={{ borderColor: "var(--border-mid)", color: "var(--text-sub)" }}
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
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
                Trust layer
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-6">
              Built on Virtuals Protocol ACP
            </h2>
            <p className="font-mono text-[13px] leading-relaxed mb-8" style={{ color: "var(--text-sub)" }}>
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
                font-mono text-[12px] tracking-[0.06em] uppercase
                text-sol no-underline
                transition-colors duration-200 hover:text-text
              "
            >
              View ACP registry →
            </Link>
          </div>

          {/* Right — 2×2 trust badges */}
          <div className="grid grid-cols-2 gap-3">
            {TRUST_BADGES.map(({ label, sub, dot }) => (
              <div
                key={label}
                className="glass-bright glow-border rounded-xl p-6 flex flex-col gap-3 reveal"
              >
                <div className="flex items-center gap-2">
                  {dot && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: "var(--green)" }}
                    />
                  )}
                  <div className="font-sans font-bold text-[13px] text-text">{label}</div>
                </div>
                <div className="font-mono text-[11px] text-text-muted">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: For AI Agents ── */}
      <section className="relative z-10 py-24 px-section-x border-t border-border">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-tag-line" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
                A2A
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-6">
              Built for autonomous agents
            </h2>
            <p className="font-mono text-[13px] leading-relaxed mb-8" style={{ color: "var(--text-sub)" }}>
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
                <li key={item} className="flex items-start gap-3 font-mono text-[12px]" style={{ color: "var(--text-sub)" }}>
                  <span className="text-green mt-0.5 shrink-0">→</span>
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
                font-mono text-[12px] tracking-[0.06em] uppercase
                text-sol no-underline
                transition-colors duration-200 hover:text-text
              "
            >
              View agent.json →
            </Link>
          </div>

          {/* Right — ACP flow terminal */}
          <div
            className="glass-bright rounded-2xl overflow-hidden font-mono text-[12px] reveal"
            style={{ boxShadow: "0 0 60px var(--sol-dim), 0 8px 32px rgba(0,0,0,0.4)" }}
          >
            <div className="flex items-center px-4 py-3 border-b border-border relative">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 text-text-muted text-[11px]">
                ACP call flow
              </span>
            </div>
            <div className="p-6 leading-7 space-y-1">
              <div><span className="t-comment"># 1. Discover</span></div>
              <div><span className="t-prompt">$ </span><span className="t-cmd">acp.registry.find(&quot;SolProbe&quot;)</span></div>
              <div className="pl-4"><span className="t-obj">{"{"}</span><span className="t-key">&quot;agent&quot;</span><span className="t-obj">: </span><span className="t-str">&quot;SolProbe&quot;</span><span className="t-obj">, </span><span className="t-key">&quot;tiers&quot;</span><span className="t-obj">: </span><span className="t-num">3</span><span className="t-obj">{"}"}</span></div>
              <div className="mt-3"><span className="t-comment"># 2. Escrow &amp; request</span></div>
              <div><span className="t-prompt">$ </span><span className="t-cmd">acp.job.create(tier=&quot;sol_deep_dive&quot;, token=addr)</span></div>
              <div className="pl-4"><span className="t-key">&quot;escrow_tx&quot;</span><span className="t-obj">: </span><span className="t-str">&quot;5xK9...mQ&quot;</span></div>
              <div className="mt-3"><span className="t-comment"># 3. Receive structured JSON</span></div>
              <div><span className="t-key">&quot;structural_risk_grade&quot;</span><span className="t-obj">: </span><span className="t-str">&quot;A&quot;</span></div>
              <div><span className="t-key">&quot;signal&quot;</span><span className="t-obj">: </span><span className="t-str">&quot;BULLISH&quot;</span></div>
              <div><span className="t-key">&quot;recommendation&quot;</span><span className="t-obj">: </span><span className="t-str">&quot;CONSIDER&quot;</span></div>
              <div className="mt-3"><span className="t-comment"># ACP releases escrow. Job logged on-chain.</span></div>
              <div className="mt-1"><span className="t-prompt">$ </span><span className="cursor-blink" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Intelligence Stack ── */}
      <section className="relative z-10 py-24 px-section-x border-t border-border">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-tag-line" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
              Data sources
            </span>
          </div>
          <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12 reveal">
            Intelligence stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {INTEL_SOURCES.map(({ source, layer, signals, color }) => (
              <div
                key={source}
                className="glass-bright glow-border rounded-2xl p-7 flex flex-col gap-4 reveal"
              >
                <div>
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase mb-1 block text-text-muted">
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
                    <li key={s} className="flex items-start gap-2 font-mono text-[11px] text-text-muted">
                      <span className="text-green mt-0.5 shrink-0">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: Chat Teaser ── */}
      <section className="relative z-10 py-24 px-section-x border-t border-border">
        <div className="max-w-8xl mx-auto">
          <div
            className="glass rounded-2xl overflow-hidden relative reveal"
            style={{ boxShadow: "0 0 80px rgba(120,40,255,0.2)" }}
          >
            {/* Dim overlay — reinforces coming-soon state */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: "rgba(5,7,10,0.25)" }}
            />

            {/* Phase 2 badge */}
            <div className="absolute top-6 right-6 z-20">
              <span
                className="
                  font-mono text-[10px] tracking-[0.08em] uppercase
                  text-amber border border-amber/30 bg-amber-dim
                  px-2.5 py-1 rounded-full
                "
              >
                Phase 2
              </span>
            </div>

            <div className="relative z-20 p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left — copy */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="section-tag-line" />
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
                    Coming soon
                  </span>
                </div>
                <h2 className="font-sans font-extrabold text-[clamp(28px,3vw,44px)] leading-[1.1] mb-6">
                  Research and trade from one interface
                </h2>
                <p className="font-mono text-[13px] leading-relaxed mb-8" style={{ color: "var(--text-sub)" }}>
                  Connect your Solana wallet, run risk intelligence on any
                  token, and execute swaps — all in one place. Coming soon.
                </p>
                <Link
                  href="https://x.com/solprobeai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    font-mono text-[13px] font-medium
                    px-6 py-2.5 rounded-full no-underline
                    text-white
                    transition-all duration-200 hover:shadow-glow-sol hover:scale-[1.02]
                  "
                  style={{ background: "linear-gradient(135deg, var(--sol), #5b21b6)" }}
                >
                  Notify me →
                </Link>
              </div>

              {/* Right — static mock UI */}
              <div className="glass-bright rounded-2xl overflow-hidden font-mono text-[12px]">
                {/* Mock nav bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span className="font-mono text-[12px] font-bold tracking-[0.06em]">
                    ◉ SolProbe Chat
                  </span>
                  <span className="font-mono text-[11px] text-green tracking-[0.04em]">
                    Connect Wallet
                  </span>
                </div>

                {/* Chat body */}
                <div className="p-5 space-y-4">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div
                      className="border rounded-xl px-4 py-2.5 max-w-[80%]"
                      style={{ background: "var(--bg3)", borderColor: "var(--border-mid)" }}
                    >
                      <span className="text-text text-[12px]">Is BONK safe to buy right now?</span>
                    </div>
                  </div>

                  {/* Agent response card */}
                  <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border-mid)" }}>
                    <div className="flex items-center gap-3 px-4 py-2 border-b border-border" style={{ background: "var(--bg3)" }}>
                      <span className="text-[10px] tracking-[0.08em] uppercase text-text-muted">sol_deep_dive</span>
                      <span className="text-text-dim text-[10px]">·</span>
                      <span className="text-[10px] text-amber">$0.50</span>
                      <span className="text-text-dim text-[10px]">·</span>
                      <span className="text-[10px] text-text-muted">312ms</span>
                    </div>
                    <div className="px-4 py-3 space-y-1 text-[11px]">
                      <div><span className="t-key">&quot;structural_risk_grade&quot;</span><span className="t-obj">: </span><span className="t-str">&quot;A&quot;</span></div>
                      <div><span className="t-key">&quot;signal&quot;</span><span className="t-obj">: </span><span className="t-str">&quot;BULLISH&quot;</span></div>
                      <div><span className="t-key">&quot;mint_authority_revoked&quot;</span><span className="t-obj">: </span><span className="t-val">true</span> <span className="text-green">✓</span></div>
                      <div><span className="t-key">&quot;lp_status&quot;</span><span className="t-obj">: </span><span className="t-str">&quot;NOT_APPLICABLE (Meteora CLMM)&quot;</span> <span className="text-green">✓</span></div>
                      <div><span className="t-key">&quot;recommendation&quot;</span><span className="t-obj">: </span><span className="t-str">&quot;CONSIDER&quot;</span></div>
                    </div>
                    <div className="px-4 py-2 border-t border-border">
                      <span
                        className="
                          font-mono text-[11px] tracking-[0.04em] uppercase
                          border border-border rounded-full px-3 py-1
                          opacity-40 cursor-not-allowed text-green
                        "
                      >
                        Swap BONK →
                      </span>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div
                    className="flex items-center gap-3 rounded-xl border px-4 py-3"
                    style={{ borderColor: "var(--border-mid)", background: "var(--bg-card)" }}
                  >
                    <span className="text-text-muted text-[12px] flex-1">Ask about any Solana token...</span>
                    <span className="text-text-muted text-[11px] border border-border rounded-[3px] px-1.5 py-0.5">⏎</span>
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
