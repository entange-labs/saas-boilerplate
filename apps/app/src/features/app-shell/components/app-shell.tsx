import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@saas-boilerplate/ui/components/sidebar";
import { Skeleton } from "@saas-boilerplate/ui/components/skeleton";
import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { SidebarNavLink } from "@/features/app-shell/components/sidebar-nav-link";
import {
  SidebarUserMenu,
  SidebarUserMenuSkeleton,
} from "@/features/app-shell/components/sidebar-user-menu";
import {
  appNavItems,
  isAppNavItemActive,
} from "@/features/app-shell/shared/shell-navigation";

type AppShellProps = {
  children: ReactNode;
  isShellPending?: boolean;
  organization:
    | {
        name: string;
        role: string;
      }
    | null
    | undefined;
  user: {
    email: string;
    image: string | null;
    name: string;
  };
};

function AppTopBar({
  isShellPending,
  organization,
  user,
}: Pick<AppShellProps, "isShellPending" | "organization" | "user">) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <Link className="flex shrink-0 items-center gap-2" to="/">
          <BrandLogo size="sm" />
          <span className="font-semibold text-sm">SaaS Boilerplate</span>
        </Link>
        <span className="hidden text-muted-foreground text-sm sm:block">/</span>
        {isShellPending ? (
          <Skeleton className="h-6 w-32" />
        ) : (
          <span className="min-w-0 truncate text-muted-foreground text-sm">
            {organization?.name ?? "Workspace"}
          </span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {isShellPending ? (
          <SidebarUserMenuSkeleton />
        ) : (
          <SidebarUserMenu align="end" side="bottom" user={user} />
        )}
      </div>
    </header>
  );
}

export function AppShell({
  children,
  isShellPending = false,
  organization,
  user,
}: AppShellProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <SidebarProvider className="h-svh flex-col overflow-hidden">
      <AppTopBar
        isShellPending={isShellPending}
        organization={organization}
        user={user}
      />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar className="top-14 h-[calc(100svh-3.5rem)]" collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {appNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isAppNavItemActive(item, pathname);

                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarNavLink
                          isActive={isActive}
                          preload="intent"
                          to={item.to}
                        >
                          <Icon aria-hidden="true" />
                          <span>{item.label}</span>
                        </SidebarNavLink>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center justify-end gap-2 px-2 py-2">
              <SidebarTrigger className="hidden md:inline-flex" />
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <main className="min-h-0 flex-1 overflow-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
