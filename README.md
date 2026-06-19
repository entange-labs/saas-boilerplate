# SaaS Boilerplate

A Bun/Turbo starter for a Cloudflare-first SaaS app.

## Stack

- Bun workspaces with Turbo task orchestration
- TanStack Start, React, TanStack Router, and TanStack Query
- Cloudflare Vite plugin, Wrangler, Workers, and Hyperdrive
- Better Auth with Google OAuth and the organization plugin
- Drizzle ORM with PostgreSQL
- Tailwind CSS v4 and shared shadcn/Base UI primitives
- Optional PostHog analytics and Sentry error monitoring

## Setup

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

5. Ask the project owner to run the needed database scripts from `apps/app`
   after the database is ready:

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

## License

MIT
