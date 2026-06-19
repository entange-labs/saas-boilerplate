import { Skeleton } from "@saas-boilerplate/ui/components/skeleton";

export function RoutePending(): React.ReactElement {
  return (
    <main className="min-h-[calc(100svh-3.5rem)] bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-9 w-56" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-4/5" />
        </div>
      </div>
    </main>
  );
}
