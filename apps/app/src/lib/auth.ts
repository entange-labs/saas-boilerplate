import { betterAuth } from "better-auth";
import { getDb } from "@/db";
import { createAuthOptions } from "@/lib/auth-options";
import { getRequestScopedValue } from "@/lib/server/request-cache.server";

function createAuth() {
  return betterAuth(createAuthOptions(getDb()));
}

export type AppAuth = ReturnType<typeof createAuth>;

const AUTH_CACHE_KEY = Symbol.for("saas-boilerplate.app-auth");

export function getAuth(): AppAuth {
  return getRequestScopedValue(AUTH_CACHE_KEY, createAuth);
}
