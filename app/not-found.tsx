import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — SolProbe",
  description: "Page not found.",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-section-x overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: "600px",
          height: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 text-center max-w-[520px]">
        {/* Error code */}
        <div
          className="font-mono font-bold leading-none mb-8 select-none"
          style={{
            fontSize: "clamp(96px, 18vw, 180px)",
            color: "var(--violet)",
            opacity: 0.12,
            letterSpacing: "-0.04em",
          }}
        >
          404
        </div>

        {/* Overlapping label */}
        <div className="-mt-[clamp(64px,12vw,120px)] mb-4">
          <span
            className="font-mono text-[11px] tracking-[0.14em] uppercase"
            style={{ color: "var(--violet)" }}
          >
            Not found
          </span>
        </div>

        <h1 className="font-sans font-extrabold text-[clamp(24px,3vw,36px)] leading-tight text-text mb-4">
          This page doesn&apos;t exist
        </h1>
        <p className="font-body text-[14px] leading-relaxed text-text-sub mb-10">
          The route you requested isn&apos;t here. It may have moved, or you
          may have followed a broken link.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="font-body text-[13px] font-semibold no-underline px-6 py-2.5 rounded-full text-bg"
            style={{ background: "var(--violet)" }}
          >
            Back to home
          </Link>
          <Link
            href="/services"
            className="font-body text-[13px] font-medium no-underline px-6 py-2.5 rounded-full border text-text-sub"
            style={{ borderColor: "var(--border-mid)" }}
          >
            View services
          </Link>
        </div>

        {/* Terminal-style hint */}
        <div
          className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-[4px] font-mono text-[11px] text-text-muted"
          style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
          }}
        >
          <span style={{ color: "var(--violet)" }}>$</span>
          <span>solprobe: route not found</span>
          <span
            className="inline-block w-1.5 h-3.5 ml-0.5 align-middle"
            style={{ background: "var(--violet)", opacity: 0.7, animation: "blink 1.2s step-end infinite" }}
          />
        </div>
      </div>
    </main>
  );
}
