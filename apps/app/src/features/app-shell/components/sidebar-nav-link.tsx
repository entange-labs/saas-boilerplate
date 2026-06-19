import { SidebarMenuButton } from "@saas-boilerplate/ui/components/sidebar";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type SidebarNavLinkProps = {
  children: ReactNode;
  isActive: boolean;
  preload?: "intent";
  to: "/" | "/settings";
};

export function SidebarNavLink({
  children,
  isActive,
  preload,
  to,
}: SidebarNavLinkProps) {
  return (
    <SidebarMenuButton
      isActive={isActive}
      render={<Link preload={preload} to={to} />}
    >
      {children}
    </SidebarMenuButton>
  );
}
