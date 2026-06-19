import { queryOptions } from "@tanstack/react-query";
import { appQueryKeys } from "@/features/foundation/query/query-keys";
import { getAppShellData } from "@/features/foundation/server/actions";

export function appShellQueryOptions() {
  return queryOptions({
    gcTime: 10 * 60 * 1000,
    queryFn: () => getAppShellData(),
    queryKey: appQueryKeys.appShell(),
    staleTime: 60 * 1000,
  });
}
