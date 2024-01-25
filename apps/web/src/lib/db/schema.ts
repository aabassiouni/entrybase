import { relations } from "drizzle-orm";
import { json, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

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

export const waitlists = pgTable("waitlists", {
	waitlistID: varchar("waitlist_id", { length: 256 }).primaryKey().notNull(),
	// userID: varchar("user_id", { length: 50 }).notNull(),
	workspaceID: varchar("workspace_id", { length: 256 })
		.notNull()
		.references(() => workspaces.workspaceID),
	waitlistName: varchar("waitlist_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	deletedAt: timestamp("deleted_at"),
	colorString: varchar("color_string", { length: 255 }).notNull(),
	emailSettings: json("email_settings")
		.$type<{ signup: boolean; invite: boolean }>()
		.notNull()
		.default({ signup: false, invite: false }),
	logoFileURL: varchar("logo_file_url"),
	logoFileKey: varchar("logo_file_key"),
	// domain: varchar("domain", { length: 255 }),
	// websiteName: varchar("website_name", { length: 255 }),
	// supportEmail: varchar("support_email", { length: 255 }),
	// websiteLink: varchar("website_link", { length: 255 }),
});

export const waitlistsRelations = relations(waitlists, ({ one, many }) => ({
	workspace: one(workspaces, {
		fields: [waitlists.workspaceID],
		references: [workspaces.workspaceID],
	}),
}));

export const statusEnum = pgEnum("status", ["waiting", "invited"]);

export const signups = pgTable("signups", {
	signupID: varchar("signup_id", { length: 256 }).primaryKey().notNull(),
	waitlistID: varchar("waitlist_id", { length: 256 })
		.notNull()
		.references(() => waitlists.waitlistID),
	email: varchar("email", { length: 255 }).notNull(),
	firstName: varchar("first_name", { length: 255 }),
	lastName: varchar("last_name", { length: 255 }),
	createdAt: timestamp("created_at").defaultNow(),
	status: statusEnum("status").notNull().default("waiting"),
});

export const signupsRelations = relations(signups, ({ one, many }) => ({
	waitlist: one(waitlists, {
		fields: [signups.waitlistID],
		references: [waitlists.waitlistID],
	}),
}));

export const templateEnum = pgEnum("template", ["invite", "signup"]);

export const email_templates = pgTable("email_templates", {
	templateID: varchar("template_id", { length: 256 }).primaryKey().notNull(),
	waitlistID: varchar("waitlist_id", { length: 256 }).references(() => waitlists.waitlistID),
	template: templateEnum("template").notNull(),
	subject: varchar("subject", { length: 255 }),
	header: text("header"),
	bodyText: text("body_text"),
});

export const email_templatesRelations = relations(email_templates, ({ one, many }) => ({
	waitlist: one(waitlists, {
		fields: [email_templates.waitlistID],
		references: [waitlists.waitlistID],
	}),
}));

export const invites = pgTable("invites", {
	inviteID: varchar("invite_id", { length: 256 }).primaryKey().notNull(),
	waitlistID: varchar("waitlist_id", { length: 256 })
		.notNull()
		.references(() => waitlists.waitlistID),
	email_ids: varchar("email_ids", { length: 256 }).array().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	invited_emails: varchar("invited_emails", { length: 256 }).array().notNull(),
});

export const invitesRelations = relations(invites, ({ one, many }) => ({
	waitlist: one(waitlists, {
		fields: [invites.waitlistID],
		references: [waitlists.waitlistID],
	}),
}));
