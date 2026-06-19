import { HomeIcon, type LucideIcon, SettingsIcon } from "lucide-react";

type AppNavRoute = "/" | "/settings";

export type AppNavItem = {
  icon: LucideIcon;
  id: string;
  label: string;
  to: AppNavRoute;
};

export const appNavItems: readonly AppNavItem[] = [
  {
    icon: HomeIcon,
    id: "dashboard",
    label: "Dashboard",
    to: "/",
  },
  {
    icon: SettingsIcon,
    id: "settings",
    label: "Settings",
    to: "/settings",
  },
] as const;

export function isAppNavItemActive(
  item: AppNavItem,
  pathname: string,
): boolean {
  if (item.to === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(item.to);
}
