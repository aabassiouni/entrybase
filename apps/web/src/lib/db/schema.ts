import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const waitlists = pgTable("waitlists", {
	waitlistID: varchar("waitlist_id", { length: 256 }).primaryKey().notNull(),
	userID: varchar("user_id", { length: 50 }).notNull(),
	waitlistName: varchar("waitlist_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	colorString: varchar("color_string", { length: 255 }).notNull(),
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

export const email_templates = pgTable("email_templates", {
	templateID: varchar("template_id", { length: 256 }).primaryKey().notNull(),
	waitlistID: varchar("waitlist_id", { length: 256 }).references(() => waitlists.waitlistID),
	subject: varchar("subject", { length: 255 }),
	header: text("header"),
	bodyText: text("body_text"),
});
