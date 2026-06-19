# UI System Memory

- Shared UI lives in `packages/ui` as `@saas-boilerplate/ui`.
- Install shadcn components against `packages/ui/components.json` so reusable primitives land in the UI package.
- Keep styling token-based and avoid raw color overrides unless a product direction explicitly requires them.
- Cards are for repeated items, modals, and clearly framed content. Do not make every page section a card.
- Keep the app shell viewport-locked: top bar and sidebar stay fixed, and only the main content region scrolls.
- Keep the top bar minimal: brand, workspace context, and user menu.
- Keep the starter dashboard/settings pages low-copy and product-neutral.
- Put route-specific UI under `apps/app/src/features/*/components` instead of scattering reusable app components through route files.
