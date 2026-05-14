const STEPS = [
  {
    num: "01",
    title: "Request",
    accent: "violet" as const,
    body: (
      <>
        POST to the endpoint with your token address. Receive a{" "}
        <code className="api-inline-code violet">402 Payment Required</code>{" "}
        with payment terms (amount, payTo, asset, network{" "}
        <code className="api-inline-code violet">eip155:8453</code>) in the
        response body&apos;s <code className="api-inline-code violet">accepts[]</code>{" "}
        array.
      </>
    ),
  },
  {
    num: "02",
    title: "Sign",
    accent: "cyan" as const,
    body: (
      <>
        Sign an EIP-3009{" "}
        <code className="api-inline-code cyan">TransferWithAuthorization</code>{" "}
        for the exact USDC amount on Base. Gasless — the facilitator pays gas.
        No ETH needed in your wallet. No on-chain tx from you.
      </>
    ),
  },
  {
    num: "03",
    title: "Receive",
    accent: "emerald" as const,
    body: (
      <>
        Re-POST with{" "}
        <code className="api-inline-code emerald">
          X-Payment: &lt;base64 payload&gt;
        </code>
        . The x402 facilitator settles the USDC transfer on Base, your request
        runs, structured JSON returned.
      </>
    ),
  },
];

export default function ApiPaymentFlow() {
  return (
    <section className="api-section" id="how">
      <div className="api-wrap">
        <div className="api-section-label">Payment flow</div>
        <div className="api-steps">
          {STEPS.map(({ num, title, accent, body }) => (
            <div key={num} className="api-step">
              <div className="api-step-num">{num}</div>
              <div className={`api-step-title accent-${accent}`}>{title}</div>
              <div className="api-step-body">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
