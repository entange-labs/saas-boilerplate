import {
  sentryGlobalFunctionMiddleware,
  sentryGlobalRequestMiddleware,
} from "@sentry/tanstackstart-react";
import {
  createCsrfMiddleware,
  createMiddleware,
  createStart,
} from "@tanstack/react-start";
import { runWithRequestCache } from "@/lib/server/request-cache.server";

const requestCacheMiddleware = createMiddleware().server(async ({ next }) => {
  return await runWithRequestCache(async () => await next());
});

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [
    sentryGlobalRequestMiddleware,
    requestCacheMiddleware,
    csrfMiddleware,
  ],
  functionMiddleware: [sentryGlobalFunctionMiddleware],
}));
