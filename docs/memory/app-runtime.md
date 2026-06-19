# App Runtime Memory

- `apps/app/src/env.ts` owns validated runtime environment variables.
- `DIRECT_DATABASE_URL` is CLI-only for Drizzle and Better Auth generation commands.
- Deployed/runtime database access should go through the Cloudflare `HYPERDRIVE` binding.
- Better Auth-owned tables live in `apps/app/src/db/schema/auth.ts` and should be regenerated with the app `auth:generate` script when auth options change.
- App-owned Drizzle tables should live in separate files under `apps/app/src/db/schema/` and be exported through `index.ts`.
- App-owned UUID primary keys should use `uuid("id").default(sql\`pg_catalog.gen_random_uuid()\`).primaryKey()` to match the Better Auth schema.
- Create Drizzle/Postgres clients inside request or Worker event execution. Reuse them per request through `runWithRequestCache(...)`, not module scope.
- TanStack Start global middleware lives in `apps/app/src/start.ts`; keep request-wide middleware such as Sentry, request cache, and CSRF there.
- If non-HTTP Worker handlers are added later, wrap work that calls `getDb()` or `getAuth()` in `runWithRequestCache(...)`.
- Use feature-scoped TanStack Query option factories and targeted query invalidation.
