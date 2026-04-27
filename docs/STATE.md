# SolProbe Website — State

> **Update this file at the end of every Claude Code session.**

---

## Current Phase

**Phase:** Website overhaul — complete
**Last completed:** Homepage overhaul (2026-04-27) — all 8 steps done
**Next:** Update /services page to reflect 3 active tiers; review build health

---

## Page Status

| Page | Built | Notes |
|---|---|---|
| `/` Home | ✅ Live | Overhaul complete — gradient hero, v2.0 terminal, 3 new sections |
| `/services` | ✅ Live | References 4 tiers — needs update to 3 |
| `/docs` | ✅ Live | — |
| `/status` | ✅ Live | KV-backed, 6h cron from VPS |
| `/chat` | ✅ Placeholder | Phase 2 — "coming soon" page created |
| `/token` | ❌ Placeholder in nav | Reserved for $PROBE launch |

---

## Component Status

| Component | Status | Notes |
|---|---|---|
| `Nav.tsx` | ✅ Built | "Launch App →" CTA with amber "Soon" badge |
| `Footer.tsx` | ✅ Built | Copyright 2026 ✓ |
| `TrustBar.tsx` | ✅ Built | — |
| `Terminal.tsx` | ✅ Built | Response content set via props in page.tsx |
| `StatsStrip.tsx` | ✅ Built | Shows 3 service tiers (wallet risk archived) |
| `ServiceCard.tsx` | ✅ Built | — |
| `HowItWorks.tsx` | ✅ Built | — |
| `UptimeChart.tsx` | ✅ Built | In `app/status/` — `'use client'` with mounted guard |

---

## Infrastructure Status

| Item | Status | Notes |
|---|---|---|
| Vercel deployment | ✅ Live | `solprobe.xyz` |
| Upstash Redis KV | ✅ Provisioned | Via `lib/kv.ts` lazy singleton |
| Status ingest cron | ✅ Running | VPS → `/api/status/ingest` every 6h via PM2 |
| `agent.json` | ✅ Live | `/agent.json` — no auth |
| Virtual Protocol verification | ✅ | Meta tag in layout.tsx |

---

## Active Services (reflected across site)

| Service | Price | SLA | Status |
|---|---|---|---|
| `sol_quick_scan` | $0.05 | <5s | ✅ Live |
| `sol_market_intel` | $0.10 | <10s | ✅ Live |
| `sol_deep_dive` | $0.50 | <30s | ✅ Live |
| `sol_wallet_risk` | — | — | 🗄 Archived — do not reference |

---

## Known Issues

*(Add here as discovered)*

---

## Last Session Notes

Session 2026-04-27:
- Ingest auth fixed: switched from `Authorization: Bearer` to `x-ingest-secret` custom header (Vercel was stripping the Authorization header)
- Homepage overhaul complete:
  - `.gradient-text` applied to hero "for AI agents" span
  - Terminal response updated to schema_version 2.0
  - Section 6: For AI Agents (ACP discovery flow)
  - Section 7: Intelligence Stack (4-source grid: Helius, RugCheck, DexScreener, Birdeye)
  - Section 8: Chat Teaser (glass panel with mock chat UI, Phase 2 badge)
- Nav CTA updated to "Launch App →" with amber "Soon" badge pointing to /chat
- StatsStrip corrected: 3 service tiers (not 4)
- app/chat/page.tsx placeholder created
- CLAUDE.md restructured into compact doc-index format by user
