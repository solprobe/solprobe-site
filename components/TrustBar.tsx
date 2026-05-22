import Link from "next/link";

interface TrustBarProps {
  jobCount?: number;
}

export default function TrustBar({ jobCount = 0 }: TrustBarProps) {
  return (
    <div className="relative z-10 border-t border-b border-border glass">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border max-w-full">
        {/* ACP registry */}
        <div
          className="
            flex flex-col justify-center py-8 px-10
            transition-colors duration-200
            hover:bg-sol-dim
            border-b md:border-b-0 md:border-r border-border hover:border-border-mid
          "
        >
          <Link
            href="https://app.virtuals.io/acp/agent/019ddf5c-62c0-706d-a3c2-99c6e08a5388"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline group"
          >
            <div className="font-mono font-medium text-[14px] text-text group-hover:text-sol transition-colors duration-200">
              ACP Registry
            </div>
            <div className="font-mono text-[11px] text-text-muted mt-0.5">
              On-chain link
            </div>
          </Link>
        </div>

        {/* Jobs dashboard */}
        <div
          className="
            flex flex-col justify-center py-8 px-10
            transition-colors duration-200
            hover:bg-sol-dim
            border-b md:border-b-0 md:border-r border-border hover:border-border-mid
          "
        >
          <div className="font-mono font-medium text-[14px] text-text">
            {jobCount > 0 ? (
              <span className="text-green">{jobCount.toLocaleString()} jobs</span>
            ) : (
              "Jobs dashboard"
            )}
          </div>
          <div className="font-mono text-[11px] text-text-muted mt-0.5">
            Live completions
          </div>
        </div>

        {/* Reputation feed */}
        <div
          className="
            flex flex-col justify-center py-8 px-10
            transition-colors duration-200
            hover:bg-sol-dim
          "
        >
          <Link
            href="https://app.virtuals.io/acp/agent/019ddf5c-62c0-706d-a3c2-99c6e08a5388"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline group"
          >
            <div className="font-mono font-medium text-[14px] text-text group-hover:text-sol transition-colors duration-200">
              Reputation feed
            </div>
            <div className="font-mono text-[11px] text-text-muted mt-0.5">
              ACP reviews onchain
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
