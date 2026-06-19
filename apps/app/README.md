# App

This is the TanStack Start application for the SaaS Boilerplate.

## Routes

- `/auth` signs users in with Google through Better Auth.
- `/` is the authenticated dashboard placeholder.
- `/settings` is the authenticated settings placeholder.
- `/api/auth/$` is the Better Auth request handler.

## Runtime Boundaries

- Runtime environment validation lives in `src/env.ts`.
- Database access goes through `src/db/index.ts` and the Cloudflare
  `HYPERDRIVE` binding.
- Auth setup lives in `src/lib/auth-options.ts` and `src/lib/auth.ts`.
- Server functions live under feature folders, starting with
  `src/features/foundation/server/actions.ts`.
- Request-wide middleware lives in `src/start.ts`.

## Local Commands

```bash
bun run dev
bun run check-types
bun run test
bun run build
```

Do not run package `db:*` scripts unless the project owner explicitly asks you
to run them.
