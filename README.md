# Scaffold website

Standalone Next.js website for Scaffold CMS. It ports the supplied product design and reads published
pages, navigation, and redirects from the CMS GraphQL delivery API.

## Requirements

- Node.js 22 or newer
- pnpm 9.1.4
- Scaffold CMS running on `http://localhost:4000`
- A site-scoped publishable token from **Site settings → API access**

## Local setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Fill `CMS_PUBLISHABLE_TOKEN` in `.env.local`. The website starts at
[http://localhost:4001](http://localhost:4001); the CMS remains on port 4000.

The token is server-only. Do not rename it to a `NEXT_PUBLIC_*` variable.

## CMS delivery strategy

- The homepage renders the root page's ordered published block list. Hero, metrics, steps, feature
  rows, live-page section, FAQ, CTA, links, screenshots, and example data are all authored in the CMS.
- Presentation components and icon-token mappings remain in this repository; authorable copy and
  content values come from GraphQL.
- `app/[...slug]/page.tsx` resolves any published page by its URL, so templates do not require separate
  GraphQL queries.
- Known published URLs are collected during `next build` with `generateStaticParams`.
- Local development fetches fresh CMS data on every request. Production keeps new and changed routes
  available at runtime and revalidates CMS fetches every 60 seconds by default.
- Published navigation and redirects are consumed from the same GraphQL contract.
- When the CMS is unavailable, the marketing homepage shows an operational connection state instead
  of invented fallback marketing content. CMS-owned routes use the application error boundary.

Configure the refresh interval with `CMS_REVALIDATE_SECONDS`.

## Quality commands

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

`pnpm check` runs the full local CI sequence. GitHub Actions runs the same checks on pushes and pull
requests.

## Repository handoff

This directory is an independent Git repository. The local `.env.local` and publishable token are
ignored by Git.
