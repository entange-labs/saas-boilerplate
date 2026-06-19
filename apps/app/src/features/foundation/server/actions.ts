import { createServerFn } from "@tanstack/react-start";
import {
  getCurrentSession,
  getOrCreateDefaultOrganizationForUser,
  requireUser,
} from "@/features/foundation/server/app.server";

export const getAuthRedirectState = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await getCurrentSession();

    return {
      authenticated: Boolean(session),
    };
  },
);

export const getAuthenticatedUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireUser();

    return {
      user: {
        email: user.email,
        id: user.id,
        image: user.image ?? null,
        name: user.name,
      },
    };
  },
);

export const getAppShellData = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireUser();
    const organization = await getOrCreateDefaultOrganizationForUser(user);

    return {
      organization: {
        id: organization.id,
        name: organization.name,
        role: organization.role,
        slug: organization.slug,
      },
    };
  },
);
