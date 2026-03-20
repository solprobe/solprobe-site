# CLAUDE.md — SolProbe Website

This file contains complete instructions for building the SolProbe website. Read this
fully before writing any code. Follow the structure, design system, and implementation
notes exactly as described.

---
## Agent Skills

Skills are located in `.agents/skills/<skill-name>/SKILL.md`. Each skill 
folder may contain additional supporting markdown files — the SKILL.md is 
the orchestrator that references them.

When starting a task, read the relevant SKILL.md first and follow any 
instructions it gives for loading supporting files within the same folder.

- `.agents/skills/frontend-design/SKILL.md` — building or modifying any UI components or pages
- `.agents/skills/next-best-practices/SKILL.md` — all Next.js routing, caching, and server component decisions
- `.agents/skills/vercel-react-best-practices/SKILL.md` — writing React components
- `.agents/skills/api-design-principles/SKILL.md` — creating or modifying any API routes
- `.agents/skills/typescript-advanced-types/SKILL.md` — defining types, interfaces, or schemas
- `.agents/skills/systematic-debugging/SKILL.md` — diagnosing bugs or unexpected behaviour
- `.agents/skills/verification-before-completion/SKILL.md` — before marking any task as done
---

## Domain & deployment target

The production domain is **solprobe.xyz**. All absolute URLs in `agent.json`,
metadata, and API references should use `https://solprobe.xyz`. Do not use
localhost or placeholder domains anywhere in committed files.

The site deploys to Vercel. Connect the GitHub repo to Vercel and set
`solprobe.xyz` as the custom domain in the Vercel dashboard after first deploy.

---

## Environment variables

Create a `.env.local` file (never commit this). Reference these in code via
`process.env`:

- `NEXT_PUBLIC_SITE_URL=https://solprobe.xyz`

---

## Git workflow

- Commit after each numbered step in the build order
- Branch: `main` is production, use `dev` for active work
- Do not commit `.env.local`, `.next/`, or `node_modules/`

---

## Project overview

SolProbe is a Solana token intelligence agent registered on the Virtuals Protocol
Agent Commerce Protocol (ACP) marketplace. It sells four scanning services to other
AI agents, ranging from $0.01 quick scans to $0.50 deep dives.

The website serves two audiences:
- **Human operators** who discover SolProbe on ACP and validate it before approving
  agent spend
- **AI agents** that programmatically query the machine-readable endpoints before
  routing fees

The tone is bold, technical, and data-forward. Dark mode only.

---

## Tech stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript throughout — no JavaScript files
- **Styling**: Tailwind CSS with a custom design token config
- **Fonts**: JetBrains Mono (monospace) + Syne (display) via Google Fonts
- **Deployment**: Vercel

Do not use any component libraries (no shadcn, no MUI, no Chakra). Build all UI
from scratch using Tailwind utility classes. This keeps the design distinctive.

---

## Site structure

The site has four human-facing pages, a persistent trust layer, and a
machine-readable API layer. This maps directly to the structure diagram.

```
solprobe.xyz
├── / (Home)
│   ├── Hero section + pitch
│   ├── ACP verified badge
│   ├── How it works (3 steps)
│   └── Live job count stat
├── /docs
│   ├── Quickstart guide
│   ├── API reference
│   ├── Job schemas
│   └── Changelog
├── /services
│   ├── $0.01 Quick Scan
│   ├── $0.10 Token Analysis
│   ├── $0.25 Full Report
│   └── $0.50 Deep Dive
├── /status
│   ├── Live uptime feed
│   ├── Incident log
│   ├── Response time metrics
│   └── SLA metrics
│
├── Trust layer (rendered on every page)
│   ├── ACP registry on-chain link
│   ├── Jobs dashboard (live completions)
│   └── Reputation feed (ACP reviews onchain)
│
└── Machine-readable layer (API routes)
    ├── /api/health       — JSON ping endpoint
    ├── /api/schema       — ACP job schema
    ├── /api/pricing      — Service tier feed
    └── /public/agent.json — Identity manifest
```

**Token page**: A `/token` page for $PROBE is reserved but NOT built yet.
Do not build it. Add a placeholder comment in the nav component only.

---

## File structure

Scaffold the project exactly as follows:

```
solprobe/
├── app/
│   ├── layout.tsx          # Root layout, nav, fonts, global metadata
│   ├── page.tsx            # Home page
│   ├── docs/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── status/
│   │   └── page.tsx
│   └── api/
│       ├── health/
│       │   └── route.ts
│       ├── schema/
│       │   └── route.ts
│       └── pricing/
│           └── route.ts
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── TrustBar.tsx        # Persistent trust layer strip
│   ├── Terminal.tsx        # Animated terminal card
│   ├── StatsStrip.tsx      # 4-cell metrics bar
│   ├── ServiceCard.tsx     # Individual tier card
│   └── HowItWorks.tsx      # 3-step grid
├── lib/
│   ├── acp.ts              # ACP data fetching utilities
│   └── types.ts            # Shared TypeScript types
├── public/
│   └── agent.json          # ACP identity manifest
├── tailwind.config.ts
├── CLAUDE.md               # This file
└── next.config.ts
```

---

## Design system

### Colour tokens

Define these as CSS custom properties in `app/globals.css` and mirror them in
`tailwind.config.ts` under `theme.extend.colors`.

```css
:root {
  --bg:           #080b0f;   /* page background */
  --bg2:          #0d1117;   /* card / surface background */
  --bg3:          #111820;   /* elevated surface / nav bg */
  --border:       rgba(255,255,255,0.07);
  --border-bright:rgba(255,255,255,0.14);
  --sol:          #9945FF;   /* Solana purple — primary accent */
  --sol-dim:      rgba(153,69,255,0.15);
  --sol-glow:     rgba(153,69,255,0.35);
  --green:        #14F195;   /* Solana green — success / CTA */
  --green-dim:    rgba(20,241,149,0.12);
  --green-glow:   rgba(20,241,149,0.3);
  --amber:        #FFB800;   /* warning / tier 4 accent */
  --amber-dim:    rgba(255,184,0,0.1);
  --text:         #e8eaf0;   /* primary text */
  --text-muted:   #6b7280;   /* secondary text */
  --text-dim:     #374151;   /* tertiary / disabled text */
}
```

Never use hardcoded hex values in components. Always reference these tokens via
Tailwind classes or CSS variables.

### Typography

Two fonts only. No others.

| Role | Font | Weights used |
|---|---|---|
| Display / headings | Syne | 700, 800 |
| Monospace / UI / body | JetBrains Mono | 300, 400, 500, 700 |

Load both via `next/font/google` in `app/layout.tsx`. Apply `font-mono` as the
default body font — this is a developer/agent tool, mono-first is intentional.
Use `font-sans` (Syne) only for hero headlines and section headings.

### Spacing scale

Use Tailwind's default spacing scale. Sections use `py-24` (96px). Cards use
`p-7` (28px). Consistent 4px base unit throughout.

### Visual effects

These are intentional and should be implemented exactly:

1. **Grid overlay**: Full-page fixed background grid using CSS `background-image`
   with two linear gradients at `rgba(153,69,255,0.03)` on a 60px grid.
   Implemented in `globals.css` on `body::before`.

2. **Scanline texture**: Subtle repeating horizontal scanlines on `body::after`
   using `rgba(0,0,0,0.08)` at 4px intervals. Creates a CRT / data terminal feel.

3. **Glow effects**: Purple radial glow top-left of hero, green radial glow
   bottom-right. Implemented as absolute positioned divs, `pointer-events: none`.

4. **Pulse animation**: The live status dot in the nav badge and hero tag pulses
   with a CSS `@keyframes pulse` animation at 2s ease-in-out.

5. **Blinking cursor**: The terminal card ends with a blinking `▌` cursor using
   CSS `@keyframes blink` at 1.1s step-end.

6. **Scroll-triggered reveals**: Cards and sections fade up on scroll using
   `IntersectionObserver`. Initial state: `opacity: 0, translateY(20px)`.
   Transition: `opacity 0.5s ease, transform 0.5s ease`.

7. **Counter animation**: The job count stat animates from 0 to the live value
   on page load using `requestAnimationFrame`.

---

## Page specifications

### Home (`/`)

The homepage has five sections in this order:

#### 1. Hero

Two-column grid layout (`grid-cols-2` at desktop, single column on mobile).

**Left column:**
- Live status tag: green pulsing dot + "Live on ACP Mainnet" label
- Headline (Syne 800, ~68px): "Solana token intelligence for AI agents"
  — "for AI agents" in `--green`
- Subheading (JetBrains Mono 300, 14px, muted): explain the service in one
  sentence referencing ACP, the four tiers, and the price range
- Two CTAs: primary green button "Explore services →" and secondary ghost
  button "Read the docs"

**Right column:**
- `<Terminal />` component (see component spec below)

#### 2. Stats strip

Full-width bar, `grid-cols-4`, separated by vertical borders. No padding on
the outer container — bleeds to viewport edges.

| Cell | Label | Value | Note |
|---|---|---|---|
| 1 | Jobs completed | Live count from API | Green, animated on load |
| 2 | Avg latency | ~340ms | Deep scan figure |
| 3 | Service tiers | 4 | Solana purple |
| 4 | Uptime | 99.9% | Green |

#### 3. How it works

Three-column grid with a single outer border and internal 1px dividers between
cards. No gaps — the border IS the divider (use `gap-px bg-border` technique).

Step 1 — **Discover**: Agent queries ACP registry, finds SolProbe with
capabilities, pricing, and reputation score.

Step 2 — **Request**: Agent submits token address + tier selection. ACP
escrows the fee on-chain before the job starts.

Step 3 — **Deliver**: SolProbe returns structured JSON. ACP releases escrow.
Job is logged on-chain as a completed reputation event.

Each card has: step number badge, emoji icon, title (Syne 700 18px), description
(JetBrains Mono 12px muted). Hover state: slightly lighter background.

#### 4. Service tiers

Four cards in a `grid-cols-4` layout. Each card is a `<ServiceCard />` component.
Tier 3 ($0.25 Full Report) is marked as "Popular" with a Solana purple top accent
border and a subtle purple gradient background. See `<ServiceCard />` spec.

#### 5. Trust / ACP section

Two-column layout. Left: heading, description, link to ACP registry. Right: 2×2
grid of trust badges.

Trust badges:
- ACP registered — Mainnet verified (green background, verified check)
- On-chain escrow — Every job
- Reputation — Onchain reviews
- Network — Solana mainnet

---

### Docs (`/docs`)

Static markdown-rendered documentation. Use `next-mdx-remote` or write as TSX.
Four sections with left sidebar navigation:

1. **Quickstart** — How to call SolProbe from another ACP agent in under 10
   minutes. Include a TypeScript code example using the ACP SDK.
2. **API reference** — Document each of the four service tiers as API endpoints
   with request/response JSON schemas.
3. **Schemas** — Full TypeScript type definitions for all request and response
   objects. Mirror what is in `lib/types.ts`.
4. **Changelog** — Dated log of service updates. Start with the launch entry.

---

### Services (`/services`)

Expanded version of the four service tier cards from the homepage. Each card
links to an anchor section with full detail:

- Full list of what is checked/returned
- Example JSON response (use the terminal component)
- SLA commitments
- Use case guidance (when should an agent use this tier?)

---

### Status (`/status`)

Four sections:

1. **Current status** — Green "All systems operational" banner or red incident
   banner depending on live data
2. **Uptime feed** — 90-day uptime chart (use a simple bar chart or
   `recharts` `BarChart`)
3. **Response time metrics** — P50/P95/P99 latency per service tier
4. **Incident log** — Table of past incidents with date, severity, duration,
   and resolution. Empty at launch is fine.

---

## Component specifications

### `<Nav />`

Fixed top bar, `height: 64px`, backdrop blur, semi-transparent `--bg` background.

Left: SolProbe logo mark (purple bordered square with purple dot inside) + wordmark
in JetBrains Mono.

Centre: navigation links — Home, Docs, Services, Status. All uppercase, 11px,
letter-spacing 0.1em, muted colour, hover to full text colour.

Right: "View services" CTA button in green with green border.

On mobile (`< 900px`): hide centre links, keep logo and CTA.

### `<Footer />`

Simple single-row footer with `border-top`.

Left: copyright line — "© 2025 SolProbe · Built on Virtuals Protocol ACP · Solana"

Right: links — Docs, Status, API, X/Twitter. All in JetBrains Mono 11px
uppercase muted.

### `<TrustBar />`

A persistent strip rendered in the root layout, above the footer, on every page.
Three equal columns:

1. **ACP registry** — "On-chain link" subtext, links to `https://app.virtuals.io/acp`
2. **Jobs dashboard** — "Live completions" subtext, shows live job count
3. **Reputation feed** — "ACP reviews onchain" subtext

Style: `--bg2` background, full-width, `border-top border-bottom`, cells
separated by vertical borders, `py-8 px-10` per cell.

### `<Terminal />`

Displays a simulated ACP job response. Props:

```typescript
interface TerminalProps {
  command: string        // the CLI command shown
  response: object       // the JSON response to display
  service: string        // service name shown in title bar
  fee: string            // fee shown in completion line
}
```

Structure:
- Title bar with three macOS-style dots (red/yellow/green) and centred filename
- Body in JetBrains Mono 12px with syntax highlighting via CSS classes:
  - `.t-key` — amber (#FFB800) for JSON keys
  - `.t-val` — green (#14F195) for true/null/false
  - `.t-str` — soft red (#e06c75) for string values
  - `.t-num` — orange (#d19a66) for numbers
  - `.t-obj` — muted for brackets/punctuation
  - `.t-prompt` — Solana purple for `$` prompt
- Blinking cursor at the end

Default content (deep scan response):

```json
{
  "token": "So1Probe...xK9",
  "risk_score": 2.4,
  "holder_concentration": "LOW",
  "liquidity_depth": "$284k",
  "mint_authority": null,
  "freeze_authority": null,
  "verdict": "SAFE",
  "latency_ms": 340
}
```

### `<ServiceCard />`

Props:

```typescript
interface ServiceCardProps {
  tier: number              // 1 | 2 | 3 | 4
  price: string             // "$0.01"
  name: string              // "Quick Scan"
  features: string[]        // bullet list
  sla: string               // "<100ms response"
  featured?: boolean        // if true, applies purple accent
  accentColor?: string      // CSS variable for top border
}
```

Layout:
- Top accent border (2px, full width, `--card-accent` CSS variable)
- Tier label (10px mono uppercase muted)
- Price (32px mono bold)
- Service name (Syne 700 16px)
- Divider line
- Feature list with `→` prefix in green
- SLA tag with green dot indicator

Featured card (Tier 3) gets `border-color: rgba(153,69,255,0.25)` and a subtle
`linear-gradient` background from `rgba(153,69,255,0.05)` to transparent.

---

## API routes

### `GET /api/health`

Returns current service health. Used by other agents to check availability
before submitting jobs.

```typescript
// Response shape
{
  status: "ok" | "degraded" | "down",
  timestamp: string,          // ISO 8601
  services: {
    quick_scan:    { status: "ok", latency_p50_ms: number },
    token_analysis:{ status: "ok", latency_p50_ms: number },
    full_report:   { status: "ok", latency_p50_ms: number },
    deep_dive:     { status: "ok", latency_p50_ms: number }
  },
  version: string
}
```

### `GET /api/schema`

Returns the ACP job input/output schema for all four service tiers.

```typescript
// Response shape
{
  version: string,
  services: {
    [serviceId: string]: {
      input:  JSONSchema,
      output: JSONSchema,
      price_virtual: number
    }
  }
}
```

### `GET /api/pricing`

Returns current pricing for all tiers. Agents read this before negotiating
a job on ACP.

```typescript
// Response shape
{
  currency: "VIRTUAL",
  updated_at: string,
  tiers: [
    { id: "quick_scan",     price: 0.01, sla_ms: 100  },
    { id: "token_analysis", price: 0.10, sla_ms: 500  },
    { id: "full_report",    price: 0.25, sla_ms: 1000 },
    { id: "deep_dive",      price: 0.50, sla_ms: 2000 }
  ]
}
```

---

## `agent.json` (public identity manifest)

Place at `/public/agent.json`. This is the ACP identity manifest read by other
agents before engaging SolProbe.

```json
{
  "name": "SolProbe",
  "version": "1.0.0",
  "description": "Solana token intelligence agent. Provides on-chain scanning and risk analysis services to other AI agents via Virtuals Protocol ACP.",
  "acp_registry": "https://app.virtuals.io/acp",
  "network": "solana-mainnet",
  "services": [
    {
      "id": "quick_scan",
      "name": "Quick Scan",
      "price_virtual": 0.01,
      "sla_ms": 100,
      "schema": "https://solprobe.xyz/api/schema#quick_scan"
    },
    {
      "id": "token_analysis",
      "name": "Token Analysis",
      "price_virtual": 0.10,
      "sla_ms": 500,
      "schema": "https://solprobe.xyz/api/schema#token_analysis"
    },
    {
      "id": "full_report",
      "name": "Full Report",
      "price_virtual": 0.25,
      "sla_ms": 1000,
      "schema": "https://solprobe.xyz/api/schema#full_report"
    },
    {
      "id": "deep_dive",
      "name": "Deep Dive",
      "price_virtual": 0.50,
      "sla_ms": 2000,
      "schema": "https://solprobe.xyz/api/schema#deep_dive"
    }
  ],
  "health_endpoint": "https://solprobe.xyz/api/health",
  "pricing_endpoint": "https://solprobe.xyz/api/pricing",
  "docs": "https://solprobe.xyz/docs",
  "status": "https://solprobe.xyz/status"
}
```

---

## Data fetching

### Live job count

The job count displayed in the stats strip and home page is fetched from the
ACP completions API. Until the ACP data feed is wired up, return `0` as the
fallback. The counter animates from 0 to the live value on mount.

```typescript
// lib/acp.ts
export async function getJobCount(): Promise<number> {
  try {
    const res = await fetch('https://app.virtuals.io/acp/agents/solprobe/jobs', {
      next: { revalidate: 60 } // revalidate every 60 seconds
    })
    const data = await res.json()
    return data.total_completed ?? 0
  } catch {
    return 0
  }
}
```

### Status data

For `/status`, fetch uptime and latency data. Stub this with static data at
launch and replace with real monitoring (e.g. Better Uptime or Checkly) once
configured.

---

## SEO and metadata

Set the following in `app/layout.tsx` using Next.js `Metadata`:

```typescript
export const metadata: Metadata = {
  title: 'SolProbe — Solana Token Intelligence for AI Agents',
  description: 'SolProbe is a Virtuals Protocol ACP agent delivering on-chain Solana token analysis. Four service tiers from $0.01 quick scans to $0.50 deep dives.',
  openGraph: {
    title: 'SolProbe',
    description: 'Solana token intelligence for AI agents on Virtuals Protocol ACP.',
    url: 'https://solprobe.xyz',
    siteName: 'SolProbe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolProbe',
    description: 'Solana token intelligence for AI agents on Virtuals Protocol ACP.',
  }
}
```
---

## Logo & brand assets

Logo files are in `/public`:

- `logo.svg` — primary logo, use in Nav and Footer
- `logo.png` — use for OpenGraph and Twitter card metadata only
- `logo-mark.svg` — icon-only mark, use as the favicon and mobile nav icon

In `Nav.tsx`, replace the CSS logo-mark div from the HTML reference with 
the actual `logo.svg` using Next.js `<Image />` or an inline SVG import.
Set height to 32px in the nav, preserving aspect ratio.

In `app/layout.tsx`, set the favicon to `logo-mark.svg` via the Next.js
metadata icons field:
```typescript
export const metadata: Metadata = {
  icons: {
    icon: '/logo-mark.svg',
    shortcut: '/logo-mark.png',
  }
}
```
```

**Then add one line to your opening Claude Code prompt:**
```
Logo assets are in `/public` — see the Logo & brand assets section 
in CLAUDE.md for usage instructions.

---

## Build order

Build in this sequence to avoid blocking dependencies:

1. `tailwind.config.ts` — design tokens first
2. `app/globals.css` — CSS variables, grid overlay, scanlines, keyframes
3. `app/layout.tsx` — fonts, nav, footer, trust bar shell
4. `components/Nav.tsx`
5. `components/Footer.tsx`
6. `app/page.tsx` — home page structure (static first, no live data)
7. `components/Terminal.tsx`
8. `components/StatsStrip.tsx`
9. `components/HowItWorks.tsx`
10. `components/ServiceCard.tsx`
11. `app/services/page.tsx`
12. `app/api/health/route.ts`
13. `app/api/schema/route.ts`
14. `app/api/pricing/route.ts`
15. `public/agent.json`
16. `components/TrustBar.tsx` — wire up live data
17. `app/status/page.tsx`
18. `app/docs/page.tsx`
19. Wire live job count into `StatsStrip` and `TrustBar`
20. Final responsive pass (mobile breakpoints)

---

## Do not build (yet)

- `/token` page — reserved for $PROBE token launch
- Any wallet connection UI
- Any trading or swap functionality
- Dark/light mode toggle — dark only

---

## Notes for Claude Code

- Every component must be fully typed with TypeScript. No `any`.
- All colours via CSS variables or Tailwind config tokens — never hardcoded hex.
- The `<Terminal />` component content is the most important visual element on
  the homepage. Spend time getting the syntax highlighting and layout right.
- The grid overlay and scanline effects on `body::before` and `body::after` are
  load-bearing for the aesthetic — do not skip them.
- Test all four API routes return valid JSON before moving to UI work.
- `agent.json` must be publicly accessible at `/agent.json` with no auth.
- Replace placeholder ACP URLs with real ones once the agent is registered.
