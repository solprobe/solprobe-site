import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import { getJobCount } from "@/lib/acp";

// ── Fonts ──────────────────────────────────────────────────────────────────
// JetBrains Mono: UI, body, all monospace text (default body font)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

// Syne: display/headings only
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// ── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "SolProbe — Solana Token Intelligence for AI Agents",
  description:
    "SolProbe is a Virtuals Protocol ACP agent delivering on-chain Solana token analysis. Four service tiers from $0.01 quick scans to $0.50 deep dives.",
  metadataBase: new URL("https://solprobe.xyz"),
  openGraph: {
    title: "SolProbe",
    description:
      "Solana token intelligence for AI agents on Virtuals Protocol ACP.",
    url: "https://solprobe.xyz",
    siteName: "SolProbe",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SolProbe",
    description:
      "Solana token intelligence for AI agents on Virtuals Protocol ACP.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo-mark.svg",
    shortcut: "/logo-mark.svg",
  },
  verification: {
    other: {
      "virtual-protocol-site-verification": "d8dc5275e7169b43bb5a6896b017c40b",
    },
  },
};

// ── Root Layout ────────────────────────────────────────────────────────────
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jobCount = await getJobCount();

  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${syne.variable}`}
    >
      <body>
        <Nav />

        <main>{children}</main>

        <TrustBar jobCount={jobCount} />
        <Footer />
      </body>
    </html>
  );
}
