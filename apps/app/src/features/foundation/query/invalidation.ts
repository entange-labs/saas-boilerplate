import type { QueryClient } from "@tanstack/react-query";
import { appQueryKeys } from "@/features/foundation/query/query-keys";

export async function invalidateAppShell(queryClient: QueryClient) {
  await queryClient.invalidateQueries({
    queryKey: appQueryKeys.appShell(),
  });
}
