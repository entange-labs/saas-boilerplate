import { buttonVariants } from "@saas-boilerplate/ui/components/button";
import { Toaster } from "@saas-boilerplate/ui/components/sonner";
import { TooltipProvider } from "@saas-boilerplate/ui/components/tooltip";
import appCss from "@saas-boilerplate/ui/globals.css?url";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/lib/analytics/posthog-provider";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Outlet,
  head: () => ({
    links: [
      {
        href: appCss,
        rel: "stylesheet",
      },
      {
        href: "/favicon.ico",
        rel: "icon",
      },
    ],
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "SaaS Boilerplate",
      },
    ],
  }),
  notFoundComponent: RootNotFound,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <PostHogProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </PostHogProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-muted-foreground text-sm">404</p>
          <h1 className="font-semibold text-2xl">Page not found</h1>
          <p className="text-muted-foreground text-sm">
            This route does not exist or is no longer available.
          </p>
        </div>
        <Link className={buttonVariants()} to="/">
          Go home
        </Link>
      </div>
    </main>
  );
}
