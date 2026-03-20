import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/docs",    label: "Docs" },
  { href: "/status",  label: "Status" },
  { href: "/api/schema", label: "API" },
  { href: "https://x.com/solprobe", label: "X / Twitter", external: true },
] as const;

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="max-w-8xl mx-auto px-section-x h-14 flex items-center justify-between">
        {/* Left — copyright */}
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
          © 2025 SolProbe · Built on Virtuals Protocol ACP · Solana
        </p>

        {/* Right — links */}
        <ul className="flex items-center gap-6 list-none">
          {FOOTER_LINKS.map(({ href, label, ...rest }) => {
            const isExternal = "external" in rest && rest.external;
            return (
              <li key={href}>
                <Link
                  href={href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted hover:text-text transition-colors duration-200 no-underline"
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
