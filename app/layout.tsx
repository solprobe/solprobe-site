import type { Metadata } from "next";
import { JetBrains_Mono, Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import ScrollEffects from "@/components/ScrollEffects";
import Providers from "./providers";
import { getJobCount } from "@/lib/acp";

// ── Fonts ──────────────────────────────────────────────────────────────────
// JetBrains Mono: data, metrics, code, terminal text
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

// Bricolage Grotesque: display headings (32px+)
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Inter: body copy, UI labels, nav links
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
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
      className={`${jetbrainsMono.variable} ${bricolage.variable} ${inter.variable}`}
    >
      <body>
        <Providers>
          <ScrollEffects />
          <Nav />

          <main>{children}</main>

          <TrustBar jobCount={jobCount} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
