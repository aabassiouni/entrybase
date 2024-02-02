import "server-only";

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { invites, waitlists, email_templates, workspaces, signups } from "@waitlister/db";

neonConfig.fetchConnectionCache = true;
if (process.env.NODE_ENV === "development") {
	neonConfig.fetchEndpoint = (host) => {
		const protocol = host === "db.localtest.me" ? "http" : "https";
		const port = host === "db.localtest.me" ? 4444 : 443;
		return `${protocol}://${host}:${port}/sql`;
	};
}

const neonDB = neon(process.env.DRIZZLE_DATABASE_URL!);

export const db = drizzle(neonDB, { schema: { invites, waitlists, email_templates, workspaces, signups } });
