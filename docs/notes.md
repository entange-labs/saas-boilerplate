# Notes

- This repository is a generic SaaS starter derived from a reusable app foundation.
- v1 scope is foundation only: auth, organizations, database, app shell, shared UI, observability hooks, and Cloudflare deployment wiring.
- Billing, media generation, background job services, object storage, vector search, and product-specific schemas are intentionally excluded.
- Runtime database access uses the Cloudflare `HYPERDRIVE` binding. `DIRECT_DATABASE_URL` is CLI-only for Drizzle and Better Auth generation.
- Do not run package `db:*` scripts directly. Ask the user to run them and share output.
