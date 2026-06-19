/// <reference types="@cloudflare/workers-types" />

interface __BaseEnv_Env {
  HYPERDRIVE: Hyperdrive;
  BETTER_AUTH_SECRET?: string;
  BETTER_AUTH_URL?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  SENTRY_DSN?: string;
  SENTRY_ENVIRONMENT?: string;
  VITE_SENTRY_DSN?: string;
}

declare namespace Cloudflare {
  interface Env extends __BaseEnv_Env {}
}

interface Env extends __BaseEnv_Env {}

declare module "cloudflare:workers" {
  export const env: Cloudflare.Env;
}

interface Hyperdrive {
  connectionString: string;
}
