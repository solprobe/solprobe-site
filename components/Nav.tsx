"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/#how",      label: "How it works" },
  { href: "/services",  label: "Services" },
  { href: "/docs",      label: "Docs" },
  { href: "/status",    label: "Status" },
  // /token — reserved for $PROBE token launch, not built yet
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-12 h-nav
        bg-bg/85 backdrop-blur-[20px]
        border-b border-border
      "
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-[10px] font-mono text-[15px] font-bold tracking-[0.05em] text-text no-underline"
      >
        <Image
          src="/logo.svg"
          alt="SolProbe"
          width={32}
          height={32}
          priority
          className="h-8 w-auto"
        />
        SOLPROBE
      </Link>

      {/* Centre nav links — hidden below 900px */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href.replace("/#", "/"));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`
                  font-mono text-[12px] tracking-[0.1em] uppercase no-underline
                  transition-colors duration-200
                  ${isActive ? "text-text" : "text-text-muted hover:text-text"}
                `}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      <Link
        href="/services"
        className="
          font-mono text-[12px] font-medium tracking-[0.08em] uppercase
          text-green border border-green/30 bg-green-dim
          px-5 py-2 rounded-[4px] no-underline
          transition-all duration-200
          hover:bg-green/20 hover:shadow-green-glow-sm
        "
      >
        View services
      </Link>
    </nav>
  );
}
