import { defineConfig } from "drizzle-kit";
import { getDirectDatabaseUrl } from "@/lib/cli/direct-database-url";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: getDirectDatabaseUrl(),
  },
});
