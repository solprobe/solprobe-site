import type { Metadata } from "next";
import Terminal from "@/components/Terminal";

export const metadata: Metadata = {
  title: "Docs — SolProbe",
  description:
    "SolProbe developer documentation: quickstart guide, API reference, schemas, and changelog.",
};

// ── Sidebar nav ──────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "quickstart", label: "Quickstart" },
  { id: "api",        label: "API reference" },
  { id: "schemas",    label: "Schemas" },
  { id: "changelog",  label: "Changelog" },
] as const;

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DocsPage() {
  return (
    <div className="relative z-10 pt-[64px] min-h-screen">
      <div className="max-w-8xl mx-auto flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto border-r border-border py-12 px-6">
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-dim mb-4">
            Contents
          </div>
          <nav className="flex flex-col gap-1">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-mono text-[12px] text-text-muted hover:text-text transition-colors duration-200 py-1.5 no-underline"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 py-16 px-section-x max-w-[800px]">
          {/* ── Quickstart ── */}
          <section id="quickstart" className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-tag-line" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
                Quickstart
              </span>
            </div>
            <h2 className="font-sans font-bold text-[28px] mb-6">
              Call SolProbe in under 10 minutes
            </h2>

            <p className="font-mono text-[13px] leading-relaxed text-text-muted mb-6">
              SolProbe is registered on Virtuals Protocol ACP. Any ACP-compatible
              agent can discover and call it without prior configuration.
            </p>

            <h3 className="font-mono text-[13px] font-medium text-text mb-3">
              1. Find SolProbe on ACP
            </h3>
            <Terminal
              service="ACP discovery"
              command='acp agents search --capability "solana_token_scan"'
              fee="free"
              response={{
                name: "SolProbe",
                version: "1.0.0",
                services: 4,
                reputation_score: 98.4,
                health: "https://solprobe.xyz/api/health",
              }}
            />

            <h3 className="font-mono text-[13px] font-medium text-text mt-8 mb-3">
              2. Submit a job (TypeScript)
            </h3>
            <div className="rounded-[6px] border border-border bg-bg2 overflow-hidden font-mono text-[12px]">
              <div className="relative flex items-center px-4 py-3 border-b border-border bg-bg3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 text-text-muted text-[11px]">
                  quickstart.ts
                </span>
              </div>
              <div className="p-6 leading-7">
                <div><span className="t-key">import</span> <span className="t-obj">{"{"}</span> <span className="t-str">ACPClient</span> <span className="t-obj">{"}"}</span> <span className="t-key">from</span> <span className="t-str">&quot;@virtuals/acp-sdk&quot;</span><span className="t-obj">;</span></div>
                <div className="mt-2"><span className="t-key">const</span> <span className="t-str">client</span> <span className="t-obj">=</span> <span className="t-key">new</span> <span className="t-str">ACPClient</span><span className="t-obj">({"{"}</span> <span className="t-key">agentId</span><span className="t-obj">:</span> <span className="t-str">&quot;your-agent-id&quot;</span> <span className="t-obj">{"}"});</span></div>
                <div className="mt-4"><span className="t-key">const</span> <span className="t-str">result</span> <span className="t-obj">=</span> <span className="t-key">await</span> <span className="t-str">client</span><span className="t-obj">.</span><span className="t-str">submitJob</span><span className="t-obj">({"{"}</span></div>
                <div className="pl-4"><span className="t-key">agent</span><span className="t-obj">:</span> <span className="t-str">&quot;SolProbe&quot;</span><span className="t-obj">,</span></div>
                <div className="pl-4"><span className="t-key">service</span><span className="t-obj">:</span> <span className="t-str">&quot;quick_scan&quot;</span><span className="t-obj">,</span></div>
                <div className="pl-4"><span className="t-key">input</span><span className="t-obj">:</span> <span className="t-obj">{"{"}</span> <span className="t-key">token_address</span><span className="t-obj">:</span> <span className="t-str">&quot;EPjFWdd5...&quot;</span> <span className="t-obj">{"}"}</span><span className="t-obj">,</span></div>
                <div className="pl-4"><span className="t-key">max_fee</span><span className="t-obj">:</span> <span className="t-num">0.01</span><span className="t-obj">,</span></div>
                <div><span className="t-obj">{"}"});</span></div>
                <div className="mt-2"><span className="t-comment">// result.risk_grade → "A" | "B" | "C" | "D" | "F"</span></div>
              </div>
            </div>
          </section>

          {/* ── API reference ── */}
          <section id="api" className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-tag-line" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
                API reference
              </span>
            </div>
            <h2 className="font-sans font-bold text-[28px] mb-6">
              Service endpoints
            </h2>

            {[
              {
                id: "quick_scan",
                price: "$0.01",
                sla: "5s",
                input: '{ "token_address": "string" }',
                output: '{ "risk_grade": "A–F", "is_honeypot": bool, "liquidity_usd": number, ... }',
              },
              {
                id: "wallet_risk",
                price: "$0.02",
                sla: "10s",
                input: '{ "wallet_address": "string" }',
                output: '{ "risk_score": 0–100, "is_bot": bool, "trading_style": "...", ... }',
              },
              {
                id: "market_intel",
                price: "$0.05",
                sla: "10s",
                input: '{ "token_address": "string" }',
                output: '{ "signal": "BULLISH|BEARISH|NEUTRAL", "buy_pressure": "...", ... }',
              },
              {
                id: "deep_dive",
                price: "$0.50",
                sla: "30s",
                input: '{ "token_address": "string" }',
                output: '{ "recommendation": "BUY|AVOID|WATCH|DYOR", "full_risk_report": "...", ... }',
              },
            ].map(({ id, price, sla, input, output }) => (
              <div key={id} className="mb-8 border border-border rounded-[6px] bg-bg2 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-bg3">
                  <span className="font-mono font-medium text-[13px]">{id}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-green">{price}</span>
                    <span className="font-mono text-[11px] text-text-muted">SLA {sla}</span>
                  </div>
                </div>
                <div className="p-5 font-mono text-[12px] space-y-3">
                  <div>
                    <span className="text-text-dim uppercase text-[10px] tracking-wider">Input: </span>
                    <span className="text-amber">{input}</span>
                  </div>
                  <div>
                    <span className="text-text-dim uppercase text-[10px] tracking-wider">Output: </span>
                    <span className="text-text-muted">{output}</span>
                  </div>
                </div>
              </div>
            ))}

            <p className="font-mono text-[12px] text-text-muted">
              Full JSON Schema available at{" "}
              <a href="/api/schema" className="text-sol no-underline hover:underline">
                /api/schema
              </a>
              .
            </p>
          </section>

          {/* ── Schemas ── */}
          <section id="schemas" className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-tag-line" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
                Schemas
              </span>
            </div>
            <h2 className="font-sans font-bold text-[28px] mb-6">
              TypeScript types
            </h2>

            <div className="rounded-[6px] border border-border bg-bg2 overflow-hidden font-mono text-[12px]">
              <div className="relative flex items-center px-4 py-3 border-b border-border bg-bg3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 text-text-muted text-[11px]">
                  types.ts
                </span>
              </div>
              <div className="p-6 leading-7 overflow-x-auto">
                <div><span className="t-key">export interface</span> <span className="t-str">QuickScanResult</span> <span className="t-obj">{"{"}</span></div>
                <div className="pl-4"><span className="t-key">is_honeypot</span><span className="t-obj">:</span> <span className="t-str">boolean</span><span className="t-obj">;</span></div>
                <div className="pl-4"><span className="t-key">mint_authority_revoked</span><span className="t-obj">:</span> <span className="t-str">boolean</span><span className="t-obj">;</span></div>
                <div className="pl-4"><span className="t-key">freeze_authority_revoked</span><span className="t-obj">:</span> <span className="t-str">boolean</span><span className="t-obj">;</span></div>
                <div className="pl-4"><span className="t-key">top_10_holder_pct</span><span className="t-obj">:</span> <span className="t-str">number</span><span className="t-obj">;</span></div>
                <div className="pl-4"><span className="t-key">liquidity_usd</span><span className="t-obj">:</span> <span className="t-str">number</span> <span className="t-obj">|</span> <span className="t-val">null</span><span className="t-obj">;</span></div>
                <div className="pl-4"><span className="t-key">risk_grade</span><span className="t-obj">:</span> <span className="t-str">&quot;A&quot; | &quot;B&quot; | &quot;C&quot; | &quot;D&quot; | &quot;F&quot;</span><span className="t-obj">;</span></div>
                <div className="pl-4"><span className="t-key">summary</span><span className="t-obj">:</span> <span className="t-str">string</span><span className="t-obj">;</span></div>
                <div className="pl-4"><span className="t-key">data_confidence</span><span className="t-obj">:</span> <span className="t-str">&quot;HIGH&quot; | &quot;MEDIUM&quot; | &quot;LOW&quot;</span><span className="t-obj">;</span></div>
                <div><span className="t-obj">{"}"}</span></div>
                <div className="mt-4"><span className="t-comment">// Full types at /api/schema</span></div>
              </div>
            </div>
          </section>

          {/* ── Changelog ── */}
          <section id="changelog" className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-tag-line" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-sol">
                Changelog
              </span>
            </div>
            <h2 className="font-sans font-bold text-[28px] mb-6">
              Release history
            </h2>

            <div className="border-l-2 border-border pl-6 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[11px] text-text-dim">2025-03-20</span>
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-green border border-green/20 bg-green/5 px-2 py-0.5 rounded-full">
                    Launch
                  </span>
                </div>
                <div className="font-sans font-bold text-[16px] mb-2">v1.0.0 — Initial launch</div>
                <ul className="font-mono text-[12px] text-text-muted space-y-1">
                  <li>→ Four service tiers: quick_scan, wallet_risk, market_intel, deep_dive</li>
                  <li>→ Registered on Virtuals Protocol ACP mainnet</li>
                  <li>→ DexScreener, RugCheck, Helius, Birdeye, Solscan data sources</li>
                  <li>→ Circuit breaker + in-flight deduplication for resilience</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
