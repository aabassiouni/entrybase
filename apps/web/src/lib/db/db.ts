import "server-only";

import { neon, neonConfig } from "@neondatabase/serverless";
import { sql, desc, eq, and, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { DBResult, Entry, EntryResponse } from "@/types";
import { email_templates, signups, waitlists, invites } from "./schema";
import { newId } from "../id";
import { notFound, redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { selectRandomTwColor } from "../utils";
import { findWaitlistForUser } from "./waitlists";

neonConfig.fetchConnectionCache = true;

if (process.env.NODE_ENV === "development") {
	neonConfig.fetchEndpoint = (host) => {
		const protocol = host === "db.localtest.me" ? "http" : "https";
		const port = host === "db.localtest.me" ? 4444 : 443;
		return `${protocol}://${host}:${port}/sql`;
	};
}

const neonDB = neon(process.env.DRIZZLE_DATABASE_URL!);

export const db = drizzle(neonDB, { schema: { signups, waitlists, email_templates, invites } });

export async function checkAuth(waitlistID: string, userID: string) {
	const waitlist = await findWaitlistForUser(userID, waitlistID);

	if (waitlist.length === 0) {
		return redirect("/dashboard");
	}
}
