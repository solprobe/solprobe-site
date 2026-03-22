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

          {/* Right */}
          <Terminal
            service="sol_deep_dive — token analysis"
            command="solprobe scan --deep So1Probe...xK9"
            fee="$0.50 USDC"
            response={{
              token: "So1Probe...xK9",
              risk_score: 2.4,
              holder_concentration: "LOW",
              liquidity_depth: "$284k",
              mint_authority: null,
              freeze_authority: null,
              verdict: "SAFE",
              latency_ms: 340,
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
    </>
  );
}
