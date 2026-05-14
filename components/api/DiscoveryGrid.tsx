import Link from "next/link";

const LINKS = [
  {
    href: "/.well-known/x402",
    icon: "📡",
    accent: "violet",
    path: "/.well-known/x402",
    desc: "Protocol spec · JSON · all services + payment terms",
  },
  {
    href: "/llm.txt",
    icon: "🤖",
    accent: "cyan",
    path: "/llm.txt",
    desc: "Plain-text spec for LLM agents to read directly",
  },
  {
    href: "/openapi.json",
    icon: "📄",
    accent: "emerald",
    path: "/openapi.json",
    desc: "OpenAPI 3.1 schema · all routes + request/response types",
  },
  {
    href: "/.well-known/agent.json",
    icon: "⚡",
    accent: "amber",
    path: "/.well-known/agent.json",
    desc: "Virtuals ACP registration · agent identity + services",
  },
] as const;

export default function DiscoveryGrid() {
  return (
    <section className="api-section" id="discovery">
      <div className="api-wrap">
        <div className="api-section-label">Machine-readable discovery</div>
        <div className="api-discovery-grid">
          {LINKS.map(({ href, icon, accent, path, desc }) => (
            <Link
              key={href}
              href={href}
              className="api-discovery-link"
            >
              <div className={`api-disc-icon accent-${accent}`}>{icon}</div>
              <div>
                <div className="api-disc-path">{path}</div>
                <div className="api-disc-desc">{desc}</div>
              </div>
              <span className="api-disc-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
