import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { waitlists } from "./waitlists";

export const statusEnum = pgEnum("status", ["waiting", "invited"]);

export const signups = pgTable("signups", {
  signupID: varchar("signup_id", { length: 256 }).primaryKey().notNull(),
  waitlistID: varchar("waitlist_id", { length: 256 })
    .notNull()
    .references(() => waitlists.waitlistID),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: statusEnum("status").notNull().default("waiting"),
});

export const signupsRelations = relations(signups, ({ one }) => ({
  waitlist: one(waitlists, {
    fields: [signups.waitlistID],
    references: [waitlists.waitlistID],
  }),
}));
