import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";
import { createAuthOptions } from "@/lib/auth-options";
import { getDirectDatabaseUrl } from "@/lib/cli/direct-database-url";

const client = postgres(getDirectDatabaseUrl(), {
  fetch_types: false,
  max: 1,
  prepare: false,
});

export const auth = createAuthOptions(drizzle({ client, schema }));
