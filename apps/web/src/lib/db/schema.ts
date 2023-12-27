import { PgArray, json, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const waitlists = pgTable("waitlists", {
	waitlistID: varchar("waitlist_id", { length: 256 }).primaryKey().notNull(),
	userID: varchar("user_id", { length: 50 }).notNull(),
	waitlistName: varchar("waitlist_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	deletedAt: timestamp("deleted_at"),
	colorString: varchar("color_string", { length: 255 }).notNull(),
	emailSettings: json("email_settings")
		.$type<{ signup: boolean; invite: boolean }>()
		.notNull()
		.default({ signup: false, invite: false }),
});

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

export const templateEnum = pgEnum("template", ["invite", "signup"]);

export const email_templates = pgTable("email_templates", {
	templateID: varchar("template_id", { length: 256 }).primaryKey().notNull(),
	waitlistID: varchar("waitlist_id", { length: 256 }).references(() => waitlists.waitlistID),
	template: templateEnum("template").notNull(),
	subject: varchar("subject", { length: 255 }),
	header: text("header"),
	bodyText: text("body_text"),
});

export const invites = pgTable("invites", {
	inviteID: varchar("invite_id", { length: 256 }).primaryKey().notNull(),
	waitlistID: varchar("waitlist_id", { length: 256 })
		.notNull()
		.references(() => waitlists.waitlistID),
	email_ids: varchar("email_ids", { length: 256 }).array().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	invited_emails: varchar("invited_emails", { length: 256 }).array().notNull(),
});
