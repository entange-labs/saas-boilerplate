import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@saas-boilerplate/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@saas-boilerplate/ui/components/dropdown-menu";
import { Skeleton } from "@saas-boilerplate/ui/components/skeleton";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { authClient } from "@/lib/auth-client";

type SidebarUserMenuProps = {
  align?: "center" | "end" | "start";
  side?: "bottom" | "left" | "right" | "top";
  user: {
    email: string;
    image: string | null;
    name: string;
  };
};

export function SidebarUserMenu({
  align = "start",
  side = "top",
  user,
}: SidebarUserMenuProps) {
  const initials = getInitials(user.name || user.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="flex h-9 items-center gap-2 rounded-md px-2 text-left transition-colors hover:bg-accent"
      >
        <Avatar className="size-7">
          {user.image ? <AvatarImage alt="" src={user.image} /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span className="hidden min-w-0 text-sm sm:block">
          <span className="block truncate font-medium">{user.name}</span>
          <span className="block truncate text-muted-foreground text-xs">
            {user.email}
          </span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-64" side={side}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate font-normal text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <div className="px-2 py-1.5">
            <ModeToggle />
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={
            <a href="/settings">
              <SettingsIcon aria-hidden="true" />
              Settings
            </a>
          }
        />
        <DropdownMenuItem
          onClick={() => {
            void authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  window.location.href = "/auth";
                },
              },
            });
          }}
        >
          <LogOutIcon aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SidebarUserMenuSkeleton() {
  return (
    <div className="flex h-9 items-center gap-2 px-2">
      <Skeleton className="size-7 rounded-full" />
      <div className="hidden min-w-0 flex-1 sm:block">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-1 h-3 w-36" />
      </div>
    </div>
  );
}

function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
