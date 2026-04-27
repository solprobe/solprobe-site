# SolProbe Website — Claude Code Index

> **Read this first. Load additional docs only for the task at hand.**
> Never load all docs simultaneously — that defeats the purpose.

---

## Quick Facts

- **Domain:** `solprobe.xyz` — deployed on Vercel
- **Repo:** `main` = production · `dev` = active work
- **Framework:** Next.js 14 App Router — TypeScript only, no JS files
- **Styling:** Tailwind CSS + CSS custom properties — no component libraries
- **KV store:** Upstash Redis via `@upstash/redis` — all access through `lib/kv.ts` only
- **Dark mode only**

---

## Doc Index — Load Only What You Need

| File | Load when... |
|---|---|
| `docs/STATE.md` | **Every session** — current build state, what's live, what's broken |
| `docs/ARCHITECTURE.md` | File structure, env vars, git, deployment, brand assets |
| `docs/DESIGN.md` | Any UI work — colours, typography, spacing, visual effects |
| `docs/COMPONENTS.md` | Building or modifying anything in `components/` |
| `docs/PAGES.md` | Building or modifying any page in `app/` |
| `docs/API.md` | API routes, `agent.json`, data fetching, SEO metadata |
| `docs/STATUS_FEATURE.md` | `/status` page, KV store, ingest endpoint, UptimeChart |
| `docs/OVERHAUL.md` | **Redesign work** — new design direction, inspiration refs, new sections |
| `docs/ROADMAP.md` | Future features — chat interface, wallet connect, swaps |

---

## Global Rules (always apply — no exceptions)

1. **TypeScript everywhere.** No `any`. Every component and API route fully typed.
2. **Colours via CSS variables or Tailwind tokens only** — never hardcoded hex.
3. **No component libraries.** No shadcn, no MUI, no Chakra. Build from scratch.
4. **Two fonts only:** Syne (display headings) + JetBrains Mono (everything else).
5. **All KV access through `lib/kv.ts` only** — never import `@upstash/redis` elsewhere.
6. **recharts components must be `'use client'`** with a `mounted` guard.
7. Commit after each logical unit of work. Never commit `.env.local`, `.next/`, `node_modules/`.
8. All absolute URLs use `https://solprobe.xyz` — never localhost in committed files.

---

## Agent Skills

Load the relevant SKILL.md before starting any task:

- `.agents/skills/frontend-design/SKILL.md` — any UI components or pages
- `.agents/skills/next-best-practices/SKILL.md` — routing, caching, server components
- `.agents/skills/vercel-react-best-practices/SKILL.md` — React components
- `.agents/skills/api-design-principles/SKILL.md` — API routes
- `.agents/skills/typescript-advanced-types/SKILL.md` — types, interfaces, schemas
- `.agents/skills/systematic-debugging/SKILL.md` — diagnosing bugs
- `.agents/skills/verification-before-completion/SKILL.md` — before marking any task done
