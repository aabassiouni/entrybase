
import { relations } from "drizzle-orm";
import { json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { workspaces } from "./workspaces";

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