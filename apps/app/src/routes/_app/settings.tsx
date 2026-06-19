import { Badge } from "@saas-boilerplate/ui/components/badge";
import { Separator } from "@saas-boilerplate/ui/components/separator";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/features/app-shell/components/page-header";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Settings"
        description="Manage your account and workspace."
      />
      <section className="grid gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-1">
            <h2 className="font-medium text-base">Account access</h2>
            <p className="text-muted-foreground text-sm">
              Your sign-in method is active.
            </p>
          </div>
          <Badge variant="secondary">Enabled</Badge>
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-1">
            <h2 className="font-medium text-base">Workspace</h2>
            <p className="text-muted-foreground text-sm">
              Your default workspace is ready.
            </p>
          </div>
          <Badge variant="outline">Personal</Badge>
        </div>
      </section>
    </div>
  );
}
