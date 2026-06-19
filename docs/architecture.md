# Architecture

This starter is intentionally small. It provides the SaaS foundation and leaves
product workflows empty.

## Workspace Layout

```text
apps/app
  TanStack Start app, routes, server functions, auth, database access
packages/ui
  Shared shadcn/Base UI components, hooks, utilities, and global theme CSS
docs
  Setup notes, deployment notes, future plans, and durable agent memory
```

## Application Boundaries

- `apps/app/src/routes` owns file-based routing only. Keep real feature logic in
  `apps/app/src/features`.
- `apps/app/src/features/foundation` owns generic user, session, organization,
  app shell, and audit-log behavior.
- `apps/app/src/db/schema/auth.ts` is Better Auth-owned generated schema.
- `apps/app/src/db/schema/app.ts` is app-owned schema. Add new product tables in
  separate schema files when they grow beyond the starter.
- `packages/ui` owns reusable primitives. Do not recreate `components/ui` inside
  the app.

## Runtime Model

- TanStack Start handles routing, SSR, server functions, and request middleware.
- Cloudflare Workers run the deployed app.
- Hyperdrive is the runtime database binding.
- `DIRECT_DATABASE_URL` is only for CLI tools such as Drizzle and Better Auth
  schema generation.
- Database and auth objects are request-scoped through
  `runWithRequestCache(...)`.

## Starter Surfaces

- Auth page with Google sign-in.
- Protected app shell with top bar, sidebar, user menu, theme switcher, and toast
  provider.
- Dashboard placeholder.
- Settings placeholder.
- Minimal audit log schema for app-owned events.

## What Is Intentionally Excluded

- Billing and checkout.
- Email sending.
- File uploads and object storage.
- Background jobs and queues.
- AI/provider abstractions.
- Product-specific tables and routes.
