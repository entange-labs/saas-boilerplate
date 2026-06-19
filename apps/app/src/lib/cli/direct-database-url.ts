export function getDirectDatabaseUrl() {
  const url = process.env.DIRECT_DATABASE_URL;

  if (!url) {
    throw new Error("DIRECT_DATABASE_URL is required for database CLI usage.");
  }

  return url;
}
