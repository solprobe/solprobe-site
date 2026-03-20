import Link from "next/link";

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

// ── How it works steps ──────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    icon: "⬡",
    title: "Discover",
    body: "Agent queries the ACP registry, finds SolProbe with capabilities, pricing, and reputation score attached.",
  },
  {
    num: "02",
    icon: "⇄",
    title: "Request",
    body: "Agent submits token address + tier selection. ACP escrows the fee on-chain before the job starts.",
  },
  {
    num: "03",
    icon: "✓",
    title: "Deliver",
    body: "SolProbe returns structured JSON. ACP releases escrow. Job is logged on-chain as a completed reputation event.",
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
export default function HomePage() {
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
              <span className="text-green">for AI agents</span>
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

          {/* Right — Terminal placeholder (replaced in step 7) */}
          <div className="relative rounded-[8px] border border-border bg-bg2 overflow-hidden font-mono text-[12px]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg3">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="absolute left-1/2 -translate-x-1/2 text-text-muted text-[11px]">
                sol_deep_dive — token analysis
              </span>
            </div>
            {/* Body */}
            <div className="p-6 leading-7">
              <div>
                <span className="t-prompt">$ </span>
                <span className="t-cmd">solprobe scan --deep So1Probe...xK9</span>
              </div>
              <div className="mt-3 t-obj">{"{"}</div>
              <div className="pl-4">
                <span className="t-key">&quot;token&quot;</span>
                <span className="t-obj">: </span>
                <span className="t-str">&quot;So1Probe...xK9&quot;</span>
                <span className="t-obj">,</span>
              </div>
              <div className="pl-4">
                <span className="t-key">&quot;risk_score&quot;</span>
                <span className="t-obj">: </span>
                <span className="t-num">2.4</span>
                <span className="t-obj">,</span>
              </div>
              <div className="pl-4">
                <span className="t-key">&quot;holder_concentration&quot;</span>
                <span className="t-obj">: </span>
                <span className="t-str">&quot;LOW&quot;</span>
                <span className="t-obj">,</span>
              </div>
              <div className="pl-4">
                <span className="t-key">&quot;liquidity_depth&quot;</span>
                <span className="t-obj">: </span>
                <span className="t-str">&quot;$284k&quot;</span>
                <span className="t-obj">,</span>
              </div>
              <div className="pl-4">
                <span className="t-key">&quot;mint_authority&quot;</span>
                <span className="t-obj">: </span>
                <span className="t-val">null</span>
                <span className="t-obj">,</span>
              </div>
              <div className="pl-4">
                <span className="t-key">&quot;freeze_authority&quot;</span>
                <span className="t-obj">: </span>
                <span className="t-val">null</span>
                <span className="t-obj">,</span>
              </div>
              <div className="pl-4">
                <span className="t-key">&quot;verdict&quot;</span>
                <span className="t-obj">: </span>
                <span className="t-str">&quot;SAFE&quot;</span>
                <span className="t-obj">,</span>
              </div>
              <div className="pl-4">
                <span className="t-key">&quot;latency_ms&quot;</span>
                <span className="t-obj">: </span>
                <span className="t-num">340</span>
              </div>
              <div className="t-obj">{"}"}</div>
              <div className="mt-3">
                <span className="t-comment"># Fee deducted: $0.50 USDC · ACP escrow released</span>
              </div>
              <div className="mt-1">
                <span className="t-prompt">$ </span>
                <span className="cursor-blink" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="relative z-10 border-y border-border bg-bg2">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { value: "—",     label: "Jobs completed",  color: "text-green" },
            { value: "340ms", label: "Avg deep-scan latency", color: "text-sol" },
            { value: "4",     label: "Service tiers",   color: "text-sol" },
            { value: "99.9%", label: "Uptime",          color: "text-green" },
          ].map(({ value, label, color }) => (
            <div key={label} className="flex flex-col items-center justify-center py-8 px-6 gap-1">
              <span className={`font-mono font-bold text-3xl ${color}`}>{value}</span>
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <section id="how" className="relative z-10 py-24 px-section-x">
        <div className="max-w-8xl mx-auto">
          {/* Section tag */}
          <div className="flex items-center gap-3 mb-4">
            <div className="section-tag-line" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
              How it works
            </span>
          </div>
          <h2 className="font-sans font-bold text-[clamp(28px,3vw,40px)] mb-12">
            Three steps to token intelligence
          </h2>

          {/* Cards — no gap, border-as-divider */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-border gap-px rounded-[6px] overflow-hidden border border-border">
            {STEPS.map(({ num, icon, title, body }) => (
              <div
                key={num}
                className="bg-bg2 p-8 flex flex-col gap-4 hover:bg-bg3 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-text-dim">
                    {num}
                  </span>
                  <span className="text-sol text-xl">{icon}</span>
                </div>
                <h3 className="font-sans font-bold text-[18px]">{title}</h3>
                <p className="font-mono text-[12px] leading-relaxed text-text-muted">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            {TIERS.map(({ tier, price, name, sla, features, accentColor, ...rest }) => {
              const featured = "featured" in rest && rest.featured;
              return (
                <div
                  key={tier}
                  className={`
                    relative flex flex-col rounded-[6px] border p-7
                    transition-all duration-200
                    ${featured
                      ? "border-[rgba(153,69,255,0.25)] bg-gradient-to-b from-[rgba(153,69,255,0.05)] to-transparent"
                      : "border-border bg-bg2 hover:bg-bg3"}
                  `}
                  style={{ borderTopColor: accentColor, borderTopWidth: "2px" }}
                >
                  {featured && (
                    <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.1em] uppercase text-sol border border-sol/30 bg-sol-dim px-2 py-0.5 rounded-full">
                      Popular
                    </div>
                  )}

                  <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-dim mb-2">
                    Tier {tier}
                  </div>
                  <div className="font-mono font-bold text-[32px] leading-none mb-1">
                    {price}
                  </div>
                  <div className="font-sans font-bold text-[16px] mb-4">{name}</div>

                  <div className="h-px bg-border mb-4" />

                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 font-mono text-[11px] text-text-muted">
                        <span className="text-green mt-0.5">→</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
                    <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-green inline-block" />
                    SLA {sla}
                  </div>
                </div>
              );
            })}
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
              href="https://app.virtuals.io/acp"
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
    </>
  );
}
