# Setup

## First Run

1. Install dependencies:

   ```bash
   bun install
   ```

2. Create the app env file:

   ```bash
   cp apps/app/.env.example apps/app/.env
   ```

3. Set required auth values:

   ```text
   BETTER_AUTH_SECRET=
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

4. Create a local Postgres database. The default examples use:

   ```text
   postgresql://localhost/saas_boilerplate
   ```

5. Replace placeholder Hyperdrive IDs in `apps/app/wrangler.jsonc`.

6. Ask the project owner to run database commands from `apps/app`:

   ```bash
   bun run db:generate
   bun run db:migrate
   ```

Agents should not run package `db:*` scripts directly.

## Google OAuth

Create an OAuth client for the app and set:

```text
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Use these callback URLs:

```text
http://localhost:3000/api/auth/callback/google
https://your-production-domain.com/api/auth/callback/google
```

## Development

```bash
bun run dev
```

The app runs at `http://localhost:3000`.

## Validation

```bash
bun install --frozen-lockfile
bun run check
bun run check-types
bun run --cwd apps/app test
BETTER_AUTH_SECRET=dev-secret BETTER_AUTH_URL=http://localhost:3000 GOOGLE_CLIENT_ID=dev-client GOOGLE_CLIENT_SECRET=dev-secret bun run build
```

The build command needs auth environment values because the app validates
required auth config.
