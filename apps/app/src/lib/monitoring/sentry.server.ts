import type { CloudflareOptions } from "@sentry/cloudflare";
import {
  sentryDataCollection,
  sentryTracesSampleRate,
} from "@/lib/monitoring/sentry-config";

type SentryRuntimeEnv = {
  SENTRY_DSN?: string;
  SENTRY_ENVIRONMENT?: string;
  VITE_SENTRY_DSN?: string;
};

export function getSentryCloudflareOptions(
  cloudflareEnv: unknown,
): CloudflareOptions | undefined {
  const sentryEnv = getSentryRuntimeEnv(cloudflareEnv);
  const dsn =
    sentryEnv.SENTRY_DSN ??
    sentryEnv.VITE_SENTRY_DSN ??
    process.env.SENTRY_DSN ??
    process.env.VITE_SENTRY_DSN;

  if (!dsn) {
    return undefined;
  }

  return {
    dsn,
    dataCollection: sentryDataCollection,
    environment:
      sentryEnv.SENTRY_ENVIRONMENT ??
      process.env.SENTRY_ENVIRONMENT ??
      process.env.CLOUDFLARE_ENV ??
      process.env.NODE_ENV,
    tracesSampleRate: sentryTracesSampleRate,
  };
}

function getSentryRuntimeEnv(input: unknown): SentryRuntimeEnv {
  if (!input || typeof input !== "object") {
    return {};
  }

  return {
    SENTRY_DSN: getStringProperty(input, "SENTRY_DSN"),
    SENTRY_ENVIRONMENT: getStringProperty(input, "SENTRY_ENVIRONMENT"),
    VITE_SENTRY_DSN: getStringProperty(input, "VITE_SENTRY_DSN"),
  };
}

function getStringProperty(input: object, key: keyof SentryRuntimeEnv) {
  const value = (input as Record<string, unknown>)[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
