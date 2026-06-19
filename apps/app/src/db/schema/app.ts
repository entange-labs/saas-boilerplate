import { relations, sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { organization, user } from "./auth";

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").default(sql`pg_catalog.gen_random_uuid()`).primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    action: text("action").notNull(),
    targetType: text("target_type").notNull(),
    targetId: text("target_id").notNull(),
    metadata: jsonb("metadata")
      .$type<Record<string, boolean | null | number | string>>()
      .default({})
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("audit_logs_organization_id_idx").on(table.organizationId),
    index("audit_logs_user_id_idx").on(table.userId),
  ],
);

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  organization: one(organization, {
    fields: [auditLogs.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [auditLogs.userId],
    references: [user.id],
  }),
}));
