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
  // /chat  — reserved for Phase 2 chat interface, not built yet
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      id="main-nav"
      className="
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-4 sm:px-8 lg:px-12 h-nav
        glass
        border-b border-transparent
        transition-[border-color] duration-300
      "
    >
      {/* Logo */}
      <Link
        href="/"
        className="
          flex items-center gap-[10px]
          font-mono text-[15px] font-bold tracking-[0.05em] text-text no-underline
          group
        "
      >
        <Image
          src="/logo.svg"
          alt="SolProbe"
          width={32}
          height={32}
          priority
          className="
            h-8 w-auto
            transition-[filter] duration-200
            group-hover:[filter:drop-shadow(0_0_8px_var(--sol-glow))]
          "
        />
        SOLPROBE
      </Link>

      {/* Centre nav links — hidden below 900px */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname.startsWith(href.replace("/#", "/"));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`
                  relative font-mono text-[13px] no-underline
                  transition-colors duration-150
                  pb-[2px]
                  ${isActive ? "text-text" : "text-text-sub hover:text-text"}
                  [&::after]:content-[''] [&::after]:absolute [&::after]:bottom-0 [&::after]:left-0
                  [&::after]:h-px [&::after]:bg-sol
                  [&::after]:w-0 hover:[&::after]:w-full
                  [&::after]:transition-[width] [&::after]:duration-200 [&::after]:ease-out
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
        href="/chat"
        className="
          inline-flex items-center gap-2
          font-mono text-[13px] font-medium
          text-white
          px-5 py-2 rounded-full no-underline
          transition-all duration-200
          hover:shadow-glow-sol hover:scale-[1.02]
          [background:linear-gradient(135deg,var(--sol),#5b21b6)]
        "
      >
        Launch App →
        <span
          className="
            font-mono text-[10px] tracking-[0.06em] uppercase
            text-amber bg-amber-dim
            px-2 py-0.5 rounded-full ml-1
          "
        >
          Soon
        </span>
      </Link>
    </nav>
  );
}
