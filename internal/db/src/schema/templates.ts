
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { waitlists } from "./waitlists";

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
