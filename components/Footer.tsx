import Link from "next/link";

const PRODUCT_LINKS = [
  { href: "/services",    label: "Services" },
  { href: "/docs",        label: "Documentation" },
  { href: "/status",      label: "System Status" },
  { href: "/api/schema",  label: "API Schema" },
] as const;

const PROTOCOL_LINKS = [
  { href: "https://app.virtuals.io/acp/agent/019ddf5c-62c0-706d-a3c2-99c6e08a5388", label: "ACP Registry", external: true },
  { href: "https://virtuals.io",                     label: "Virtuals Protocol", external: true },
  { href: "https://solana.com",                      label: "Solana",           external: true },
] as const;

const COMMUNITY_LINKS = [
  { href: "https://x.com/solprobe", label: "X / Twitter", external: true },
] as const;

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      {/* Main 4-column grid */}
      <div
        className="max-w-8xl mx-auto px-section-x py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
      >
        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div
            className="font-sans font-bold text-[28px] leading-none"
            style={{
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SOLPROBE
          </div>
          <p className="font-body text-[13px] text-text-sub leading-relaxed max-w-[220px]">
            Solana token intelligence for AI agents. Powered by Virtuals Protocol ACP.
          </p>
        </div>

        {/* Col 2 — Product */}
        <div className="flex flex-col gap-4">
          <h4
            className="font-body text-[10px] tracking-[0.16em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Product
          </h4>
          <ul className="flex flex-col gap-2 list-none">
            {PRODUCT_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body text-[13px] text-text-sub hover:text-text transition-colors duration-200 no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Protocol */}
        <div className="flex flex-col gap-4">
          <h4
            className="font-body text-[10px] tracking-[0.16em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Protocol
          </h4>
          <ul className="flex flex-col gap-2 list-none">
            {PROTOCOL_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-text-sub hover:text-text transition-colors duration-200 no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Community */}
        <div className="flex flex-col gap-4">
          <h4
            className="font-body text-[10px] tracking-[0.16em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Community
          </h4>
          <ul className="flex flex-col gap-2 list-none">
            {COMMUNITY_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-text-sub hover:text-text transition-colors duration-200 no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-8xl mx-auto px-section-x py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="font-body text-[11px] tracking-[0.08em] uppercase text-text-muted">
          © 2026 SolProbe · Built on Virtuals Protocol ACP · Solana
        </p>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span
            className="pulse-dot w-1.5 h-1.5 rounded-full inline-block shrink-0"
            style={{ background: "var(--emerald)" }}
          />
          <span
            className="font-body text-[11px] tracking-[0.08em] uppercase"
            style={{ color: "var(--emerald)" }}
          >
            All Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
