interface TerminalProps {
  command: string;
  service: string;
  fee: string;
  response: Record<string, unknown>;
}

// ── Syntax-highlighted value renderer ─────────────────────────────────────
function TokenValue({ value }: { value: unknown }) {
  if (value === null) return <span className="t-emerald">null</span>;
  if (typeof value === "boolean")
    return <span className="t-emerald">{String(value)}</span>;
  if (typeof value === "number")
    return <span className="t-num">{String(value)}</span>;
  return <span className="t-str">&quot;{String(value)}&quot;</span>;
}

export default function Terminal({ command, service, fee, response }: TerminalProps) {
  const entries = Object.entries(response);

  return (
    <div
      className="relative rounded-2xl overflow-hidden font-mono text-[12px]"
      style={{
        background: "rgba(8,8,8,0.80)",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 0 60px rgba(139,92,246,0.12), 0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      {/* Title bar — macOS traffic lights */}
      <div
        className="flex items-center px-4 py-3 relative"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57", opacity: 0.7 }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e", opacity: 0.7 }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840", opacity: 0.7 }} />
        </div>
        <span
          className="absolute left-1/2 -translate-x-1/2 text-[11px]"
          style={{ color: "var(--text-muted)" }}
        >
          {service}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 leading-7">
        {/* Import line */}
        <div className="mb-1">
          <span className="t-comment"># solprobe-sdk v2.1.4</span>
        </div>
        <div className="mb-3">
          <span className="t-violet">import</span>
          <span className="text-text"> {"{ SolProbe }"} </span>
          <span className="t-violet">from</span>
          <span className="t-str"> &quot;@solprobe/sdk&quot;</span>
        </div>

        {/* Command */}
        <div>
          <span className="t-prompt">$ </span>
          <span className="t-cyan">{command}</span>
        </div>

        {/* JSON response */}
        <div className="mt-3">
          <span style={{ color: "var(--text-muted)" }}>{"{"}</span>
        </div>
        {entries.map(([key, value], i) => (
          <div key={key} className="pl-4">
            <span className="t-key">&quot;{key}&quot;</span>
            <span style={{ color: "var(--text-muted)" }}>: </span>
            <TokenValue value={value} />
            {i < entries.length - 1 && <span style={{ color: "var(--text-muted)" }}>,</span>}
          </div>
        ))}
        <div>
          <span style={{ color: "var(--text-muted)" }}>{"}"}</span>
        </div>

        {/* Completion line */}
        <div className="mt-3">
          <span className="t-comment"># Fee deducted: {fee} · ACP escrow released</span>
        </div>

        {/* Blinking cursor */}
        <div className="mt-1">
          <span className="t-prompt">$ </span>
          <span className="cursor-blink" />
        </div>
      </div>
    </div>
  );
}
