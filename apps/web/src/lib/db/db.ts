import "server-only";

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { email_templates, signups, waitlists, invites, workspaces } from "./schema";

neonConfig.fetchConnectionCache = true;

if (process.env.NODE_ENV === "development") {
	neonConfig.fetchEndpoint = (host) => {
		const protocol = host === "db.localtest.me" ? "http" : "https";
		const port = host === "db.localtest.me" ? 4444 : 443;
		return `${protocol}://${host}:${port}/sql`;
	};
}

const neonDB = neon(process.env.DRIZZLE_DATABASE_URL!);

export const db = drizzle(neonDB, { schema: { signups, waitlists, email_templates, invites, workspaces } });