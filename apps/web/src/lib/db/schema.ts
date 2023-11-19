import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const waitlists = pgTable("waitlists", {
	waitlistID: varchar("waitlist_id", { length: 256 }).primaryKey().notNull(),
	userID: varchar("user_id", { length: 50 }).notNull(),
	waitlistName: varchar("waitlist_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const signups = pgTable("signups", {
	id: uuid("id").primaryKey(),
	clerk_user_id: varchar("clerk_user_id", { length: 50 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	first_name: varchar("first_name", { length: 255 }).notNull(),
	last_name: varchar("last_name", { length: 255 }).notNull(),
	date_signed_up: timestamp("date_signed_up").defaultNow(),
	status: varchar("status", { length: 50 }).notNull(),
});

export const email_templates = pgTable("email_templates", {
	id: uuid("id").primaryKey(),
	clerk_user_id: varchar("clerk_user_id", { length: 50 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	section_color: varchar("section_color", { length: 50 }).notNull(),
	body_text: text("body_text").notNull(),
});