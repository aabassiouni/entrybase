import "server-only";

import { email_templates, invites, signups, waitlists, workspaces } from "@entrybase/db";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { dbEnv, env } from "../env";

neonConfig.fetchConnectionCache = true;
if (process.env.NODE_ENV === "development") {
	neonConfig.fetchEndpoint = (host) => {
		const protocol = host === "db.localtest.me" ? "http" : "https";
		const port = host === "db.localtest.me" ? 4444 : 443;
		return `${protocol}://${host}:${port}/sql`;
	};
}

const neonDB = neon(dbEnv().DRIZZLE_DATABASE_URL);

export const db = drizzle(neonDB, { schema: { invites, waitlists, email_templates, workspaces, signups } });
