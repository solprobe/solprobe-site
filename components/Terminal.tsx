interface TerminalProps {
  command: string;
  service: string;
  fee: string;
  response: Record<string, unknown>;
}

// ── Syntax-highlighted value renderer ───────────────────────────────────────
function TokenValue({ value }: { value: unknown }) {
  if (value === null) return <span className="t-val">null</span>;
  if (typeof value === "boolean")
    return <span className="t-val">{String(value)}</span>;
  if (typeof value === "number")
    return <span className="t-num">{String(value)}</span>;
  return <span className="t-str">&quot;{String(value)}&quot;</span>;
}

export default function Terminal({ command, service, fee, response }: TerminalProps) {
  const entries = Object.entries(response);

  return (
    <div className="relative rounded-[8px] border border-border bg-bg2 overflow-hidden font-mono text-[12px]">
      {/* Title bar */}
      <div className="relative flex items-center px-4 py-3 border-b border-border bg-bg3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-text-muted text-[11px]">
          {service}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 leading-7">
        {/* Command */}
        <div>
          <span className="t-prompt">$ </span>
          <span className="t-cmd">{command}</span>
        </div>

        {/* JSON response */}
        <div className="mt-3">
          <span className="t-obj">{"{"}</span>
        </div>
        {entries.map(([key, value], i) => (
          <div key={key} className="pl-4">
            <span className="t-key">&quot;{key}&quot;</span>
            <span className="t-obj">: </span>
            <TokenValue value={value} />
            {i < entries.length - 1 && <span className="t-obj">,</span>}
          </div>
        ))}
        <div>
          <span className="t-obj">{"}"}</span>
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
