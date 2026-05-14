import { wrapFetchWithPayment, x402Client } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm/exact/client";
import { toClientEvmSigner } from "@x402/evm";
import type { WalletClient, PublicClient } from "viem";

/**
 * Build a fetch wrapper that handles the x402 v2 challenge/sign/retry loop
 * against the solprobe API on Base mainnet.
 *
 * The wallet client must be connected to Base (chain id 8453). The caller is
 * responsible for prompting a chain switch if the user is on the wrong network.
 */
export function buildPaymentFetch(
  walletClient: WalletClient,
  publicClient: PublicClient
) {
  if (!walletClient.account) {
    throw new Error("walletClient has no account — connect a wallet first");
  }

  // ClientEvmSigner = address + signTypedData (+ optional readContract). Wagmi's
  // walletClient already has both; toClientEvmSigner just smooths over the shape
  // and supplies readContract from the publicClient for any extension that
  // needs it (e.g. EIP-2612 / Permit2 enrichment, not used for plain USDC).
  const signer = toClientEvmSigner(
    {
      address: walletClient.account.address,
      // viem's signTypedData is heavily generic-typed for compile-time domain
      // shape inference; the x402 signer interface deliberately keeps it loose
      // (Record<string, unknown>). Bridge with a single cast.
      signTypedData: (msg) =>
        (walletClient.signTypedData as (a: unknown) => Promise<`0x${string}`>)({
          account: walletClient.account,
          ...msg,
        }),
    },
    publicClient
  );

  const client = new x402Client().register(
    "eip155:8453",
    new ExactEvmScheme(signer)
  );

  return wrapFetchWithPayment(globalThis.fetch.bind(globalThis), client);
}
