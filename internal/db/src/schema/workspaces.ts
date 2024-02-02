import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { waitlists } from "./waitlists";

export const planEnum = pgEnum("plan", ["free", "pro"]);

export const workspaces = pgTable("workspaces", {
	workspaceID: varchar("workspace_id", { length: 256 }).primaryKey().notNull(),
	workspaceName: varchar("workspace_name", { length: 256 }),
	tenantID: varchar("tenant_id", { length: 256 }).notNull(),
	plan: planEnum("plan").notNull().default("free"),
	stripeCustomerID: varchar("stripe_customer_id", { length: 256 }),
	stripeSubscriptionID: varchar("stripe_subscription_id", { length: 256 }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	deletedAt: timestamp("deleted_at"),
});

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
	waitlists: many(waitlists),
}));