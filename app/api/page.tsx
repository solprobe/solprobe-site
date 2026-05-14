import type { Metadata } from "next";
import ApiHero from "@/components/api/ApiHero";
import ApiServiceGrid from "@/components/api/ApiServiceGrid";
import ApiPaymentFlow from "@/components/api/ApiPaymentFlow";
import ApiCodeExample from "@/components/api/ApiCodeExample";
import DiscoveryGrid from "@/components/api/DiscoveryGrid";

export const metadata: Metadata = {
  title: "SolProbe API — Solana Token Intelligence on Base x402",
  description:
    "AI-callable Solana token intelligence. Pay per call via x402 USDC on Base or Virtuals ACP escrow. No accounts, no keys, no subscription.",
};

export default function ApiLandingPage() {
  return (
    <div className="api-landing">
      <ApiHero />
      <ApiServiceGrid />
      <ApiPaymentFlow />
      <ApiCodeExample />
      <DiscoveryGrid />
    </div>
  );
}
