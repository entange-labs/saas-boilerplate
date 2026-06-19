import type { BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins/organization";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env } from "@/env";

type AuthDatabase = Parameters<typeof drizzleAdapter>[0];

export function createAuthOptions(database: AuthDatabase): BetterAuthOptions {
  return {
    appName: "SaaS Boilerplate",
    baseURL: env.BETTER_AUTH_URL,
    database: drizzleAdapter(database, {
      provider: "pg",
    }),
    advanced: {
      database: {
        generateId: "uuid",
      },
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
    plugins: [
      organization({
        allowUserToCreateOrganization: false,
        organizationLimit: 1,
      }),
      tanstackStartCookies(),
    ],
  };
}
