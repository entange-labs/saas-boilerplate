import { AsyncLocalStorage } from "node:async_hooks";

type RequestCacheStore = Map<symbol, unknown>;

const requestCache = new AsyncLocalStorage<RequestCacheStore>();

export async function runWithRequestCache<T>(
  callback: () => Promise<T>,
): Promise<T> {
  return await requestCache.run(new Map<symbol, unknown>(), callback);
}

export function getRequestScopedValue<T>(key: symbol, createValue: () => T): T {
  const values = requestCache.getStore();

  if (!values) {
    throw new Error(
      "REQUEST_CACHE_UNAVAILABLE: request-scoped values must be read during a TanStack Start request or Worker event cache scope.",
    );
  }

  if (values.has(key)) {
    return values.get(key) as T;
  }

  const value = createValue();
  values.set(key, value);
  return value;
}
