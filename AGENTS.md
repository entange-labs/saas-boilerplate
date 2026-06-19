# NOTES

- Always use `bun` as the package manager.
- Always install packages with `bun install <pkg_name>` or `bun install -d <pkg_name>` and never directly add dependency entries to `package.json`.
- Never run package `db:*` commands directly. Ask the user to run the command and share the output.
- Keep this boilerplate product-neutral. Do not copy feature-specific code from source apps unless the feature belongs in a generic SaaS foundation.
- Use `packages/ui` for shared UI primitives. Avoid recreating app-local UI primitives that already exist there.
- Keep Cloudflare runtime resource IDs and secrets out of committed code. Use placeholders and documented setup steps.
- Keep user-facing labels generic and clean. Do not expose internal table names, provider names, or implementation details unless the page is explicitly for developers.
- Use conventional commit messages in all lower-case when the user asks for commits.
