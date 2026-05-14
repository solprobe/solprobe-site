import Link from "next/link";

export default function ApiHero() {
  return (
    <section className="api-hero">
      <div className="api-wrap">
        <div className="api-hero-eyebrow">
          x402 · Direct HTTP Payments · USDC on Base
        </div>
        <h1 className="api-hero-h1">
          Solana token intelligence.
          <br />
          Pay once, get{" "}
          <span className="api-hero-shimmer">intelligence</span>.
        </h1>
        <p className="api-hero-sub">
          Call SolProbe services with USDC on Base. No API key, no account, no
          subscription. Any agent, any wallet — send a POST, get structured JSON.
        </p>
        <div className="api-hero-actions">
          <a href="#services" className="api-btn-primary">
            View services →
          </a>
          <Link href="/.well-known/x402" className="api-btn-ghost">
            /.well-known/x402
          </Link>
          <Link href="/llm.txt" className="api-btn-ghost">
            /llm.txt
          </Link>
        </div>
      </div>
    </section>
  );
}
