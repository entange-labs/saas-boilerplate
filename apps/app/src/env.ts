import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
    SENTRY_DSN: z.url().optional(),
    SENTRY_ENVIRONMENT: z.string().min(1).optional(),
    SENTRY_ORG: z.string().min(1).optional(),
    SENTRY_PROJECT: z.string().min(1).optional(),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_POSTHOG_HOST: z.url().optional(),
    VITE_POSTHOG_KEY: z.string().min(1).optional(),
    VITE_SENTRY_DSN: z.url().optional(),
  },
  runtimeEnvStrict: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    VITE_POSTHOG_HOST: process.env.VITE_POSTHOG_HOST,
    VITE_POSTHOG_KEY: process.env.VITE_POSTHOG_KEY,
    VITE_SENTRY_DSN: process.env.VITE_SENTRY_DSN,
  },
  emptyStringAsUndefined: true,
});
