import { env as cloudflareEnv } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";
import { getRequestScopedValue } from "@/lib/server/request-cache.server";
import * as schema from "./schema";

function createClient(): Sql {
  return postgres(cloudflareEnv.HYPERDRIVE.connectionString, {
    fetch_types: false,
    max: 5,
    prepare: false,
  });
}

function createDb(client: Sql) {
  return drizzle({ client, schema });
}

export type AppDb = ReturnType<typeof createDb>;

const DB_CACHE_KEY = Symbol.for("saas-boilerplate.app-db");

export function getDb(): AppDb {
  return getRequestScopedValue(DB_CACHE_KEY, () => createDb(createClient()));
}
