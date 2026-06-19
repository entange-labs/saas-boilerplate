# Future Work

This folder tracks starter improvements that are intentionally not part of the
foundation baseline.

## Good Next Additions

- Organization invitation and member management screens.
- Email provider abstraction for transactional messages.
- Billing scaffold with neutral customer, subscription, checkout, and webhook
  tables.
- File upload/storage scaffold.
- Background job pattern for queues or Workflows.
- End-to-end smoke test once real Cloudflare resource IDs are configured.
- Optional marketing/public routes if the product needs them.

## Keep Deferred Until Needed

- CI/CD. Prefer local/manual deploy docs until the project explicitly chooses a
  pipeline.
- AI/provider packages.
- Payment provider-specific logic.
- Product examples that make the starter less reusable.

## Decision Rules

- Add generic foundations only when they remove repeated setup work across many
  SaaS products.
- Keep provider-specific integrations optional and documented.
- Keep the first screen inside `apps/app` as the actual app surface, not a
  marketing landing page.
