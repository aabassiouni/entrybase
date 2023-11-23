import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const waitlists = pgTable("waitlists", {
	waitlistID: varchar("waitlist_id", { length: 256 }).primaryKey().notNull(),
	userID: varchar("user_id", { length: 50 }).notNull(),
	waitlistName: varchar("waitlist_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const statusEnum = pgEnum("status", ["waiting","invited"]);

export const signups = pgTable("signups", {
	signupID: uuid("signup_id").primaryKey().defaultRandom(),
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
	templateID: uuid("template_id").primaryKey().defaultRandom(),
    waitlistID: varchar("waitlist_id", { length: 256 }).references(() => waitlists.waitlistID),
	userID: varchar("user_id", { length: 50 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	sectionColor: varchar("section_color", { length: 50 }).notNull(),
	bodyText: text("body_text").notNull(),
});
