# Template Usage

Use this checklist after creating a new repository from the template.

## Rename

- Root `package.json` name.
- Workspace package names in `apps/app/package.json` and
  `packages/ui/package.json`.
- `@saas-boilerplate/ui` imports and TypeScript path aliases.
- `apps/app/wrangler.jsonc` Worker name.
- App title and visible brand copy.
- GitHub repository metadata.

## Configure

- Copy `apps/app/.env.example` to `apps/app/.env`.
- Configure Google OAuth redirect URLs.
- Replace Hyperdrive placeholders in `apps/app/wrangler.jsonc`.
- Set production Cloudflare secrets and variables.

## Build Product Features

- Add product routes under `apps/app/src/routes/_app`.
- Put business logic under `apps/app/src/features/<feature>`.
- Add app-owned database schema under `apps/app/src/db/schema`.
- Export new schema from `apps/app/src/db/schema/index.ts`.
- Add query keys and query option factories under the feature folder.

## Keep The Starter Clean

- Do not add product-specific examples to shared UI.
- Do not expose internal IDs in public URLs or labels.
- Do not store database clients in module scope.
- Do not run package `db:*` scripts unless explicitly asked by the project
  owner.
