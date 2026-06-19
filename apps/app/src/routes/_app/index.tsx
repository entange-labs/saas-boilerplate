import { Button } from "@saas-boilerplate/ui/components/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@saas-boilerplate/ui/components/empty";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { PageHeader } from "@/features/app-shell/components/page-header";

export const Route = createFileRoute("/_app/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Dashboard"
        description="Track the work that matters."
        actions={
          <Button disabled type="button">
            <PlusIcon aria-hidden="true" />
            New item
          </Button>
        }
      />
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyTitle>No product surface yet</EmptyTitle>
          <EmptyDescription>
            Create your first item once your product flow is ready.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
