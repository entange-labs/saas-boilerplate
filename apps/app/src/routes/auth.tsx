import { Button } from "@saas-boilerplate/ui/components/button";
import { Card } from "@saas-boilerplate/ui/components/card";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand-logo";
import { getAuthRedirectState } from "@/features/foundation/server/actions";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/auth")({
  beforeLoad: async () => {
    const state = await getAuthRedirectState();

    if (state.authenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: AuthPage,
});

function AuthPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <Card className="w-full max-w-md overflow-hidden p-0 lg:aspect-[16/9] lg:max-w-5xl">
        <div className="grid min-h-full lg:grid-cols-2">
          <section className="hidden flex-col justify-center gap-6 border-r p-16 lg:flex">
            <BrandLogo size="xl" />
            <div className="flex max-w-md flex-col gap-5">
              <h1 className="text-balance font-medium text-6xl tracking-tight">
                Your workspace, ready.
              </h1>
              <p className="max-w-xs text-base text-muted-foreground">
                Sign in and continue where you left off.
              </p>
            </div>
          </section>

          <section className="flex items-center justify-center p-8 sm:p-10 lg:p-16">
            <div className="grid max-w-sm gap-5">
              <BrandLogo className="mx-auto lg:hidden" size="xl" />
              <div className="flex flex-col gap-1 text-center">
                <h2 className="font-semibold text-2xl tracking-tight">
                  Sign in to SaaS Boilerplate
                </h2>
                <p className="text-base text-muted-foreground">
                  Access your workspace.
                </p>
              </div>

              <div className="grid gap-4">
                <Button
                  className="gap-3"
                  size="lg"
                  onClick={() => {
                    void authClient.signIn.social({
                      callbackURL: "/",
                      provider: "google",
                    });
                  }}
                  type="button"
                >
                  <span aria-hidden="true" className="font-semibold">
                    G
                  </span>
                  Continue with Google
                </Button>
                <p className="text-muted-foreground text-xs">
                  By continuing, you agree to this product&apos;s terms and
                  privacy policy.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </main>
  );
}
