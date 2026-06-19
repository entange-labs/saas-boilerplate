import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppShell } from "@/features/app-shell/components/app-shell";
import { appShellQueryOptions } from "@/features/app-shell/query/app-shell-query";
import { getAuthenticatedUser } from "@/features/foundation/server/actions";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    return await getAuthenticatedUser().catch(() => {
      throw redirect({ to: "/auth" });
    });
  },
  component: AppLayout,
});

function AppLayout() {
  const context = Route.useRouteContext();
  const { data: shellData, isPending: isShellPending } = useQuery(
    appShellQueryOptions(),
  );

  return (
    <AppShell
      isShellPending={isShellPending}
      organization={shellData?.organization}
      user={context.user}
    >
      <Outlet />
    </AppShell>
  );
}
