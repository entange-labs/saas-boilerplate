import * as Sentry from "@sentry/tanstackstart-react";
import {
  sentryDataCollection,
  sentryReplaysOnErrorSampleRate,
  sentryReplaysSessionSampleRate,
  sentryTracesSampleRate,
} from "@/lib/monitoring/sentry-config";

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    dataCollection: sentryDataCollection,
    environment: import.meta.env.MODE,
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: sentryTracesSampleRate,
    replaysSessionSampleRate: sentryReplaysSessionSampleRate,
    replaysOnErrorSampleRate: sentryReplaysOnErrorSampleRate,
  });
}
