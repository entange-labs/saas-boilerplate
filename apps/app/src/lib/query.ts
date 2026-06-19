import { QueryClient } from "@tanstack/react-query";

const DEFAULT_QUERY_STALE_TIME = 30 * 1000;
const DEFAULT_QUERY_GC_TIME = 5 * 60 * 1000;

function createAppQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: DEFAULT_QUERY_GC_TIME,
        retry: 1,
        staleTime: DEFAULT_QUERY_STALE_TIME,
      },
    },
  });
}

export function getRouterContext() {
  return {
    queryClient: createAppQueryClient(),
  };
}
