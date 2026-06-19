# Deployment

This starter is Cloudflare-first.

## Required Cloudflare Resources

- Worker for `apps/app`.
- Hyperdrive binding named `HYPERDRIVE`.
- PostgreSQL database reachable by Hyperdrive.

The committed `apps/app/wrangler.jsonc` contains placeholder Hyperdrive IDs.
Replace them before running real dev or production deploys.

## Secrets And Variables

Set these per environment:

```text
BETTER_AUTH_SECRET
BETTER_AUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
SENTRY_DSN optional
VITE_SENTRY_DSN optional
VITE_POSTHOG_KEY optional
VITE_POSTHOG_HOST optional
```

`DIRECT_DATABASE_URL` is not a deployed runtime secret. It is only for local CLI
database tooling.

## Production Build

The Cloudflare environment must be selected at build time:

```bash
CLOUDFLARE_ENV=production bun run --cwd apps/app build
```

The app deploy script does this already:

```bash
bun run --cwd apps/app deploy
```

## Before Deploying

Run:

```bash
bun install --frozen-lockfile
bun run check
bun run check-types
bun run --cwd apps/app test
```

Ask the project owner to run any needed `db:*` migration scripts and confirm the
output before deploying schema-dependent changes.
