import Link from "next/link";
import Terminal from "@/components/Terminal";
import StatsStrip from "@/components/StatsStrip";
import HowItWorks from "@/components/HowItWorks";
import ServiceCard from "@/components/ServiceCard";
import { getJobCount } from "@/lib/acp";

// ── Service tier data ───────────────────────────────────────────────────────
const TIERS = [
  {
    tier: 1,
    price: "$0.01",
    name: "Quick Scan",
    sla: "< 5s",
    accentColor: "var(--green)",
    features: [
      "Risk grade (A–F)",
      "Mint / freeze authority",
      "Top-10 holder concentration",
      "Liquidity snapshot",
    ],
  },
  {
    tier: 2,
    price: "$0.02",
    name: "Wallet Risk",
    sla: "< 10s",
    accentColor: "var(--sol)",
    features: [
      "Wallet age & tx count",
      "Bot detection",
      "Rug involvement history",
      "Trading style profile",
    ],
  },
  {
    tier: 3,
    price: "$0.05",
    name: "Market Intel",
    sla: "< 10s",
    accentColor: "var(--sol)",
    featured: true,
    features: [
      "Real-time price & volume",
      "Buy / sell pressure",
      "Large-tx detection",
      "BULLISH / BEARISH signal",
    ],
  },
  {
    tier: 4,
    price: "$0.50",
    name: "Deep Dive",
    sla: "< 30s",
    accentColor: "var(--amber)",
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
  { label: "ACP registered", sub: "Mainnet verified", icon: "✓" },
  { label: "On-chain escrow", sub: "Every job", icon: "⬡" },
  { label: "Reputation", sub: "Onchain reviews", icon: "★" },
  { label: "Network", sub: "Solana mainnet", icon: "◎" },
] as const;

// ── Page ────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const jobCount = await getJobCount();
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative z-10 pt-[calc(64px+80px)] pb-24 px-section-x">
        {/* Glow blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(153,69,255,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(20,241,149,0.2) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Live status tag */}
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-border bg-bg2">
              <span className="pulse-dot w-2 h-2 rounded-full bg-green inline-block" />
              <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
                Live on ACP Mainnet
              </span>
            </div>

            <h1 className="font-sans font-extrabold text-[clamp(40px,5vw,68px)] leading-[1.1] mb-6">
              Solana token intelligence{" "}
              <span className="gradient-text">for AI agents</span>
            </h1>

            <p className="font-mono font-light text-[14px] leading-relaxed text-text-muted mb-10 max-w-[480px]">
              SolProbe sells four on-chain scanning services to AI agents via
              Virtuals Protocol ACP — from $0.01 quick safety checks to $0.50
              deep-dive risk reports. Pay per scan, no subscription.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="
                  font-mono text-[12px] font-medium tracking-[0.08em] uppercase
                  px-6 py-3 rounded-[4px] no-underline
                  bg-green text-bg
                  transition-all duration-200 hover:shadow-green-glow-lg
                "
              >
                Explore services →
              </Link>
              <Link
                href="/docs"
                className="
                  font-mono text-[12px] font-medium tracking-[0.08em] uppercase
                  px-6 py-3 rounded-[4px] no-underline
                  border border-border text-text-muted
                  transition-all duration-200 hover:border-border-bright hover:text-text
                "
              >
                Read the docs
              </Link>
            </div>
          </div>

          {/* Right */}
          <Terminal
            service="sol_deep_dive — token analysis"
            command="solprobe scan --deep So1Probe...xK9"
            fee="$0.50 USDC"
            response={{
              schema_version: "2.0",
              token: "So1Probe...xK9",
              structural_risk_grade: "A",
              signal: "BULLISH",
              mint_authority_revoked: true,
              lp_status: "LOCKED",
              holder_concentration: "LOW",
              liquidity_depth: "$284k",
              recommendation: "CONSIDER",
              latency_ms: 312,
            }}
          />
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
          <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12">
            Four tiers. Pay per scan.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map(({ tier, price, name, sla, features, accentColor, ...rest }) => (
              <ServiceCard
                key={tier}
                tier={tier}
                price={price}
                name={name}
                sla={sla}
                features={features}
                accentColor={accentColor}
                featured={"featured" in rest && rest.featured}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/services"
              className="
                font-mono text-[12px] font-medium tracking-[0.08em] uppercase
                px-6 py-3 rounded-[4px] no-underline
                border border-border text-text-muted
                transition-all duration-200 hover:border-border-bright hover:text-text
              "
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
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="section-tag-line" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
                Trust layer
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-6">
              Built on Virtuals Protocol ACP
            </h2>
            <p className="font-mono text-[13px] leading-relaxed text-text-muted mb-8">
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
          <div className="grid grid-cols-2 gap-px bg-border rounded-[6px] overflow-hidden border border-border">
            {TRUST_BADGES.map(({ label, sub, icon }) => (
              <div
                key={label}
                className="bg-bg2 p-6 flex flex-col gap-2 hover:bg-bg3 transition-colors duration-200"
              >
                <span className="text-green text-xl">{icon}</span>
                <div className="font-mono font-medium text-[13px]">{label}</div>
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
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="section-tag-line" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
                A2A
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-6">
              Built for autonomous agents
            </h2>
            <p className="font-mono text-[13px] leading-relaxed text-text-muted mb-8">
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
                <li key={item} className="flex items-start gap-3 font-mono text-[12px] text-text-muted">
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
          <div className="relative rounded-[8px] border border-border bg-bg2 overflow-hidden font-mono text-[12px]">
            <div className="relative flex items-center px-4 py-3 border-b border-border bg-bg3">
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
          <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12">
            Intelligence stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-[6px] overflow-hidden border border-border">
            {[
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
            ].map(({ source, layer, signals, color }) => (
              <div key={source} className="bg-bg2 p-7 flex flex-col gap-4 hover:bg-bg3 transition-colors duration-200">
                <div>
                  <span
                    className="font-mono text-[10px] tracking-[0.12em] uppercase mb-1 block"
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
          {/* Outer glass panel */}
          <div
            className="glass-panel rounded-[12px] overflow-hidden relative"
            style={{ boxShadow: "0 0 80px rgba(153,69,255,0.2)" }}
          >
            {/* Dim overlay — reinforces coming-soon state */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: "rgba(8,11,15,0.25)" }}
            />

            {/* Phase 2 badge */}
            <div className="absolute top-6 right-6 z-20">
              <span
                className="font-mono text-[10px] tracking-[0.08em] uppercase
                  text-amber border border-amber/30 bg-amber-dim
                  px-2.5 py-1 rounded-[4px]"
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
                <p className="font-mono font-light text-[13px] leading-relaxed text-text-muted mb-8">
                  Connect your Solana wallet, run risk intelligence on any
                  token, and execute swaps — all in one place. Coming soon.
                </p>
                <Link
                  href="https://x.com/solprobeai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    font-mono text-[12px] font-medium tracking-[0.08em] uppercase
                    px-6 py-3 rounded-[4px] no-underline
                    bg-green text-bg
                    transition-all duration-200 hover:shadow-green-glow-lg
                  "
                >
                  Notify me →
                </Link>
              </div>

              {/* Right — static mock UI */}
              <div className="rounded-[8px] border border-border bg-bg2 overflow-hidden font-mono text-[12px]">
                {/* Mock nav bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg3">
                  <span className="font-mono text-[12px] font-bold tracking-[0.06em]">
                    ◉ SolProbe Chat
                  </span>
                  <span
                    className="font-mono text-[11px] tracking-[0.04em]"
                    style={{ color: "var(--green)" }}
                  >
                    Connect Wallet
                  </span>
                </div>

                {/* Chat body */}
                <div className="p-5 space-y-4">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-bg3 border border-border rounded-[6px] px-4 py-2.5 max-w-[80%]">
                      <span className="text-text text-[12px]">Is BONK safe to buy right now?</span>
                    </div>
                  </div>

                  {/* Agent response card */}
                  <div className="rounded-[6px] border border-border bg-bg overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-bg3">
                      <span className="text-[10px] tracking-[0.08em] uppercase text-text-muted">sol_deep_dive</span>
                      <span className="text-sol text-[10px]">·</span>
                      <span className="text-[10px] text-amber">$0.50</span>
                      <span className="text-sol text-[10px]">·</span>
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
                        className="font-mono text-[11px] tracking-[0.04em] uppercase
                          border border-border rounded-[4px] px-3 py-1
                          opacity-40 cursor-not-allowed"
                        style={{ color: "var(--green)" }}
                      >
                        Swap BONK →
                      </span>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-3 rounded-[6px] border border-border bg-bg px-4 py-3">
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
