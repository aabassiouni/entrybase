import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { waitlists } from "./waitlists";

export const invites = pgTable("invites", {
  inviteID: varchar("invite_id", { length: 256 }).primaryKey().notNull(),
  waitlistID: varchar("waitlist_id", { length: 256 })
    .notNull()
    .references(() => waitlists.waitlistID),
  email_ids: varchar("email_ids", { length: 256 }).array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  invited_emails: varchar("invited_emails", { length: 256 }).array().notNull(),
});

export const invitesRelations = relations(invites, ({ one }) => ({
  waitlist: one(waitlists, {
    fields: [invites.waitlistID],
    references: [waitlists.waitlistID],
  }),
}));
