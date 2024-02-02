import { InferModel } from "drizzle-orm";
import {
  email_templates,
  invites,
  signups,
  waitlists,
  workspaces,
} from "./schema";

export type EmailTemplate = InferModel<typeof email_templates>;
export type Invite = InferModel<typeof invites>;
export type Signup = InferModel<typeof signups>;
export type Waitlist = InferModel<typeof waitlists>;
export type Workspace = InferModel<typeof workspaces>;
