"use client";

import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWalletClient,
  usePublicClient,
  useSwitchChain,
  useChainId,
} from "wagmi";
import { base } from "wagmi/chains";
import type { ApiService } from "@/lib/services";
import { API_BASE_URL } from "@/lib/services";
import { buildPaymentFetch } from "@/lib/x402-client";

type Phase =
  | "idle"
  | "connecting"
  | "switching-chain"
  | "calling"
  | "done"
  | "error";

export default function PayInBrowser({ service }: { service: ApiService }) {
  const [open, setOpen] = useState(false);
  const [tokenAddress, setTokenAddress] = useState(
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" // BONK as sample
  );
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [response, setResponse] = useState<unknown>(null);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const injected = connectors.find((c) => c.type === "injected");

  function reset() {
    setPhase("idle");
    setErrorMsg(null);
    setResponse(null);
  }

  async function handlePay() {
    if (!walletClient || !publicClient) return;
    setErrorMsg(null);
    setResponse(null);

    try {
      if (chainId !== base.id) {
        setPhase("switching-chain");
        await switchChainAsync({ chainId: base.id });
      }

      setPhase("calling");
      const payFetch = buildPaymentFetch(walletClient, publicClient);
      const res = await payFetch(`${API_BASE_URL}${service.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token_address: tokenAddress }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error ?? `HTTP ${res.status}`);
      }
      setResponse(json);
      setPhase("done");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg);
      setPhase("error");
    }
  }

  function close() {
    setOpen(false);
    reset();
  }

  return (
    <>
      <button
        type="button"
        className="api-pay-btn"
        onClick={() => setOpen(true)}
      >
        Try in browser · {service.priceUsd} →
      </button>

      {open && (
        <div
          className="api-drawer-backdrop"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div className="api-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="api-drawer-header">
              <div className="api-drawer-title">
                {service.name} · {service.priceUsd}
              </div>
              <button
                type="button"
                className="api-drawer-close"
                onClick={close}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Wallet row */}
            <div className="api-drawer-row">
              <span className="api-drawer-label">Wallet</span>
              {isConnected && address ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <code
                    style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
                  >
                    {address.slice(0, 6)}…{address.slice(-4)}
                  </code>
                  <button
                    type="button"
                    className="api-pay-btn"
                    onClick={() => disconnect()}
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="api-pay-btn"
                  disabled={!injected}
                  onClick={() => injected && connect({ connector: injected })}
                >
                  {injected
                    ? "Connect injected wallet (MetaMask, Rabby…)"
                    : "No injected wallet detected"}
                </button>
              )}
            </div>

            {/* Token address */}
            <div className="api-drawer-row">
              <label htmlFor={`token-${service.slug}`} className="api-drawer-label">
                Solana token mint
              </label>
              <input
                id={`token-${service.slug}`}
                className="api-drawer-input"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                spellCheck={false}
              />
            </div>

            {/* Pay button */}
            <button
              type="button"
              className="api-btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
              disabled={
                !isConnected ||
                phase === "calling" ||
                phase === "switching-chain" ||
                tokenAddress.length < 32
              }
              onClick={handlePay}
            >
              {phase === "calling"
                ? "Signing & settling…"
                : phase === "switching-chain"
                  ? "Switching to Base…"
                  : `Pay ${service.priceUsd} and call`}
            </button>

            {/* Status */}
            {phase === "error" && errorMsg && (
              <div className="api-drawer-status error">
                {errorMsg}
              </div>
            )}
            {phase === "done" && (
              <div className="api-drawer-status success">
                Paid · service returned 200 OK
              </div>
            )}

            {/* Result JSON */}
            {response !== null && (
              <pre className="api-drawer-result">
                {JSON.stringify(response, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </>
  );
}
