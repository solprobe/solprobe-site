"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/#how",     label: "How it works" },
  { href: "/services", label: "Services" },
  { href: "/docs",     label: "Docs" },
  { href: "/status",   label: "Status" },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        id="main-nav"
        className="
          pointer-events-auto
          w-[95%] max-w-[672px]
          flex items-center justify-between
          px-4 sm:px-6 h-14
          rounded-full
          border border-transparent
          transition-[border-color] duration-300
        "
        style={{
          background: "rgba(10,10,10,0.70)",
          backdropFilter: "blur(16px) saturate(150%)",
          WebkitBackdropFilter: "blur(16px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            flex items-center gap-[10px]
            font-mono text-[14px] font-bold tracking-[0.05em] text-text no-underline
            group shrink-0
          "
        >
          <Image
            src="/logo-96.png"
            alt="SolProbe"
            width={96}
            height={96}
            priority
            className="
              h-7 w-auto
              transition-[filter] duration-200
              group-hover:[filter:drop-shadow(0_0_8px_var(--violet-glow))]
            "
          />
          SOLPROBE
        </Link>

        {/* Centre nav links — hidden below 768px */}
        <ul className="hidden md:flex items-center gap-6 list-none absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href.replace("/#", "/"));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    relative font-body text-[13px] no-underline
                    transition-colors duration-150
                    pb-[2px]
                    ${isActive ? "text-text" : "text-text-sub hover:text-text"}
                    [&::after]:content-[''] [&::after]:absolute [&::after]:bottom-0 [&::after]:left-0
                    [&::after]:h-px [&::after]:bg-violet
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

        {/* CTA — white button, black text */}
        <Link
          href="/chat"
          className="
            inline-flex items-center gap-2 shrink-0
            font-body text-[13px] font-semibold
            text-black bg-white
            px-5 py-2 rounded-full no-underline
            transition-all duration-300
            hover:bg-opacity-90 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
          "
        >
          Launch App
          <span
            className="
              font-mono text-[10px] tracking-[0.06em] uppercase
              text-amber bg-amber-dim
              px-2 py-0.5 rounded-full
            "
          >
            Soon
          </span>
        </Link>
      </nav>
    </div>
  );
}
