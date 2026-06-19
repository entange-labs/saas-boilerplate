/// <reference types="vitest/config" />

import { fileURLToPath, URL } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const wranglerStatePath = fileURLToPath(
  new URL("./.wrangler/state", import.meta.url),
);

const appWorkerConfigPath = fileURLToPath(
  new URL("./wrangler.jsonc", import.meta.url),
);

const cloudflarePlugin = (mode: string) =>
  mode === "test"
    ? []
    : [
        cloudflare({
          configPath: appWorkerConfigPath,
          inspectorPort: 9230,
          persistState: { path: wranglerStatePath },
          viteEnvironment: {
            name: "ssr",
          },
        }),
      ];

const sentryPlugin = () => {
  const authToken = process.env.SENTRY_AUTH_TOKEN;
  const org = process.env.SENTRY_ORG ?? process.env.VITE_SENTRY_ORG;
  const project = process.env.SENTRY_PROJECT ?? process.env.VITE_SENTRY_PROJECT;

  if (!authToken || !org || !project) {
    return [];
  }

  return sentryTanstackStart({
    authToken,
    org,
    project,
    autoInstrumentMiddleware: false,
  });
};

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    ...cloudflarePlugin(mode),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    ...sentryPlugin(),
  ],
  test: {
    passWithNoTests: true,
  },
}));
