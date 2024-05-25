import type { InferSelectModel } from "drizzle-orm";
import type { email_templates, invites, signups, waitlists, workspaces } from "./schema";

export type EmailTemplate = InferSelectModel<typeof email_templates>;
export type Invite = InferSelectModel<typeof invites>;
export type Signup = InferSelectModel<typeof signups>;
export type Waitlist = InferSelectModel<typeof waitlists>;
export type Workspace = InferSelectModel<typeof workspaces>;
