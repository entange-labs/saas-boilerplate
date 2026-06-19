# SaaS Boilerplate

A Bun/Turbo starter for a Cloudflare-first SaaS app.

Use this repository as a template when you want the application foundation
already wired and product-specific features left empty.

## Stack

- Bun workspaces with Turbo task orchestration
- TanStack Start, React, TanStack Router, and TanStack Query
- Cloudflare Vite plugin, Wrangler, Workers, and Hyperdrive
- Better Auth with Google OAuth and the organization plugin
- Drizzle ORM with PostgreSQL
- Tailwind CSS v4 and shared shadcn/Base UI primitives
- Optional PostHog analytics and Sentry error monitoring

## Setup

See [docs/setup.md](docs/setup.md) for the full first-run checklist.

Quick start:

1. Install dependencies:

   ```bash
   bun install
   ```

2. Copy the app environment file:

   ```bash
   cp apps/app/.env.example apps/app/.env
   ```

3. Fill in `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, and
   `GOOGLE_CLIENT_SECRET`.

4. Replace the placeholder Hyperdrive IDs in `apps/app/wrangler.jsonc`.

5. Ask the project owner to run the needed database scripts from `apps/app` after
   the database is ready:

   ```bash
   bun run db:generate
   bun run db:migrate
   ```

   Agents should not run package `db:*` scripts directly.

## Development

```bash
bun run dev
```

The app runs on `http://localhost:3000` by default.

## Validation

```bash
bun run check-types
bun run check
bun run build
bun run --cwd apps/app test
```

## Package Layout

- `apps/app` contains the TanStack Start application.
- `packages/ui` contains the shared UI primitives and theme CSS.
- `docs/memory` keeps durable conventions for future agents.

## Docs

- [Architecture](docs/architecture.md)
- [Setup](docs/setup.md)
- [Deployment](docs/deployment.md)
- [Template usage](docs/template-usage.md)
- [Future work](docs/future/00-readme.md)

## License

MIT
