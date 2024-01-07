import { InferModel } from "drizzle-orm";
import { email_templates, invites, signups, waitlists, workspaces } from "./schema";

export * from "./signups";
export * from "./waitlists";
export * from "./templates";
export * from "./invites";
export * from "./workspaces";

export type EmailTemplate = InferModel<typeof email_templates>;
export type Invite = InferModel<typeof invites>;
export type Signup = InferModel<typeof signups>;
export type Waitlist = InferModel<typeof waitlists>;
export type Workspace = InferModel<typeof workspaces>;
