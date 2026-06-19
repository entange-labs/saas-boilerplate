import * as Sentry from "@sentry/tanstackstart-react";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { RoutePending } from "@/components/route-pending";
import { getRouterContext } from "@/lib/query";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const context = getRouterContext();

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPendingMs: 0,
    defaultPendingComponent: RoutePending,
    defaultPreloadStaleTime: 30 * 1000,
  });

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

  if (!router.isServer) {
    Sentry.addIntegration(
      Sentry.tanstackRouterBrowserTracingIntegration(router),
    );
  }

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
