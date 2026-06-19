import * as Sentry from "@sentry/cloudflare";
import { wrapFetchWithSentry } from "@sentry/tanstackstart-react";
import handler from "@tanstack/react-start/server-entry";
import { getSentryCloudflareOptions } from "@/lib/monitoring/sentry.server";

const sentryFetchHandler = wrapFetchWithSentry({
  fetch(request) {
    return handler.fetch(request);
  },
});

export default Sentry.withSentry(
  (cloudflareEnv) => getSentryCloudflareOptions(cloudflareEnv),
  {
    fetch(request) {
      return sentryFetchHandler.fetch(request);
    },
  } satisfies ExportedHandler<Env>,
);
