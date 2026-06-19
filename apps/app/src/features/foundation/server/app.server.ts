import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { auditLogs, member, organization } from "@/db/schema";
import { getAuth } from "@/lib/auth";

export type CurrentSession = Awaited<ReturnType<typeof getCurrentSession>>;
export type CurrentUser = NonNullable<CurrentSession>["user"];

export async function getCurrentSession() {
  const auth = getAuth();

  return await auth.api.getSession({
    headers: new Headers(getRequestHeaders()),
  });
}

export async function requireUser(): Promise<CurrentUser> {
  const session = await getCurrentSession();

  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }

  return session.user;
}

export async function getCurrentOrganizationForUser(userId?: string) {
  const user = userId ? undefined : await requireUser();
  const currentUserId = userId ?? user?.id;
  const db = getDb();

  if (!currentUserId) {
    throw new Error("UNAUTHENTICATED");
  }

  const [row] = await db
    .select({
      createdAt: organization.createdAt,
      id: organization.id,
      name: organization.name,
      role: member.role,
      slug: organization.slug,
    })
    .from(member)
    .innerJoin(organization, eq(member.organizationId, organization.id))
    .where(eq(member.userId, currentUserId))
    .orderBy(member.createdAt)
    .limit(1);

  return row ?? null;
}

export async function getOrCreateDefaultOrganizationForUser(user: CurrentUser) {
  const existingOrganization = await getCurrentOrganizationForUser(user.id);

  if (existingOrganization) {
    return existingOrganization;
  }

  const slug = `personal-${user.id}`;
  const db = getDb();
  const [createdOrganization] = await db
    .insert(organization)
    .values({
      createdAt: new Date(),
      metadata: JSON.stringify({ hidden: true, purpose: "default" }),
      name: "Personal Account",
      slug,
    })
    .onConflictDoNothing({ target: organization.slug })
    .returning({
      createdAt: organization.createdAt,
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
    });

  const org =
    createdOrganization ??
    (
      await db
        .select({
          createdAt: organization.createdAt,
          id: organization.id,
          name: organization.name,
          slug: organization.slug,
        })
        .from(organization)
        .where(eq(organization.slug, slug))
        .limit(1)
    )[0];

  if (!org) {
    throw new Error("DEFAULT_ORGANIZATION_CREATE_FAILED");
  }

  const existingMember = await db
    .select({ id: member.id })
    .from(member)
    .where(and(eq(member.organizationId, org.id), eq(member.userId, user.id)))
    .limit(1);

  if (existingMember.length === 0) {
    await db.insert(member).values({
      createdAt: new Date(),
      id: crypto.randomUUID(),
      organizationId: org.id,
      role: "owner",
      userId: user.id,
    });
  }

  await logAudit({
    action: "default_organization_created",
    organizationId: org.id,
    targetId: org.id,
    targetType: "organization",
    userId: user.id,
  });

  return { ...org, role: "owner" };
}

export async function requireOrganizationAccess(organizationId: string) {
  const user = await requireUser();
  const db = getDb();
  const [membership] = await db
    .select({
      id: member.id,
      organizationId: member.organizationId,
      role: member.role,
      userId: member.userId,
    })
    .from(member)
    .where(
      and(
        eq(member.organizationId, organizationId),
        eq(member.userId, user.id),
      ),
    )
    .limit(1);

  if (!membership) {
    throw new Error("FORBIDDEN");
  }

  return membership;
}

export async function logAudit(input: {
  action: string;
  organizationId: string;
  targetId: string;
  targetType: string;
  userId: string;
}) {
  const db = getDb();

  await db.insert(auditLogs).values({
    action: input.action,
    organizationId: input.organizationId,
    targetId: input.targetId,
    targetType: input.targetType,
    userId: input.userId,
  });
}
