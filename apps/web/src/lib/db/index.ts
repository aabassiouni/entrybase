import "server-only";

import { neon, neonConfig } from "@neondatabase/serverless";
import { sql, desc, eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { DBResult, Entry, EntryResponse } from "@/types";
import { email_templates, signups, waitlists } from "./schema";
import { newId } from "../id";
import { notFound, redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

neonConfig.fetchConnectionCache = true;

if (process.env.NODE_ENV === "development") {
	neonConfig.fetchEndpoint = (host) => {
		const protocol = host === "db.localtest.me" ? "http" : "https";
		const port = host === "db.localtest.me" ? 4444 : 443;
		return `${protocol}://${host}:${port}/sql`;
	};
}

const neonDB = neon(process.env.DRIZZLE_DATABASE_URL!);

const db = drizzle(neonDB, { schema: { signups, waitlists, email_templates } });

async function checkAuth(waitlistID: string, userID: string) {
	const authCheck = await db
		.select()
		.from(waitlists)
		.where(and(eq(waitlists.userID, userID), eq(waitlists.waitlistID, waitlistID)));

	if (authCheck.length === 0) {
		return redirect("/dashboard");
	}
}

export async function createWaitlist(waitlist: string, userID: string) {
	return await db
		.insert(waitlists)
		.values({ waitlistName: waitlist, userID: userID, waitlistID: newId("wt") })
		.returning({ waitlistID: waitlists.waitlistID });
}

export async function getWaitlistsForUser(userID: string) {
	
	return await db
		.select({
			waitlistID: waitlists.waitlistID,
			waitlistName: waitlists.waitlistName,
		})
		.from(waitlists)
		.where(eq(waitlists.userID, userID)).orderBy(desc(waitlists.createdAt));
}

export async function getWaitlistByID(waitlistID: string) {
	return await db.query.waitlists.findFirst({
		where: eq(waitlists.waitlistID, waitlistID),
	});
}

export async function updateWaitlistByID(waitlistID: string, waitlistName: string) {
	noStore();
	return await db
		.update(waitlists)
		.set({
			waitlistName: waitlistName,
		})
		.where(eq(waitlists.waitlistID, waitlistID));
}

export async function setEmailTemplateForUser(emailTemplate: any) {
	return await db
		.update(email_templates)
		.set({
			bodyText: emailTemplate.bodyText,
			sectionColor: emailTemplate.sectionColor,
			email: emailTemplate.email,
		})
		.where(
			and(
				eq(email_templates.userID, emailTemplate.userID),
				eq(email_templates.waitlistID, emailTemplate.waitlistID),
			),
		);
}

export async function getEmailTemplateForUser(waitlistID: string, userID: string) {
	return db
		.select()
		.from(email_templates)
		.where(and(eq(email_templates.userID, userID), eq(email_templates.waitlistID, waitlistID)));
}

export async function getSignupsList(waitlistID: string, userID: string) {
	await checkAuth(waitlistID, userID);

	const signupsList = await db
		.select()
		.from(signups)
		.where(eq(signups.waitlistID, waitlistID))
		.orderBy(desc(signups.createdAt));
	return signupsList;
}

export async function deleteSignupById(id: string) {
	return db.delete(signups).where(eq(signups.signupID, id));
}

export async function getSignupsEmailListforUser(waitlistID: string, userID: string) {
	const result = await db
		.select({
			email: signups.email,
		})
		.from(signups)
		.where(eq(signups.waitlistID, waitlistID))
		.orderBy(desc(signups.createdAt))
		.limit(10);

	return result;
}

export async function getSignupsCountForDay(waitlistID: string, userID: string, day: string) {
	console.log(day);
	const fromTimestamp = day + " 00:00:00";
	const toTimestamp = day + " 23:59:59";
	return await db
		.execute(
			sql.raw(`WITH hourly_series AS (
				SELECT generate_series(
					timestamp '${fromTimestamp}',
					timestamp '${toTimestamp}',
					interval '1 hour'
				) AS signup_hour
			)

			SELECT
				hourly_series.signup_hour as timestep,
				COALESCE(COUNT(signups.created_at), 0) AS signups_count
			FROM hourly_series
			LEFT JOIN signups
				ON date_trunc('hour', signups.created_at) = hourly_series.signup_hour
				AND signups.created_at BETWEEN '${fromTimestamp}' AND '${toTimestamp}'
				
				AND signups.waitlist_id = '${waitlistID}'
			GROUP BY hourly_series.signup_hour
			ORDER BY hourly_series.signup_hour;
			`),
		)
		.then((result) => {
			return result.rows as DBResult[];
		});
}

export async function getSignupsCountForDayRange(waitlistID: string, userID: string, from: string, to: string) {
	const fromTimestamp = from + " 00:00:00";
	const toTimestamp = to + " 23:59:59";

	return await db
		.execute(
			sql`WITH date_series AS (
				SELECT generate_series(
					${fromTimestamp}::DATE,
					${toTimestamp}::DATE,
					interval '1 day'
				)::DATE AS timestep
			)
			
			SELECT 
				date_series.timestep,
				COALESCE(COUNT(signups.created_at), 0) AS signups_count
			FROM date_series
			LEFT JOIN signups 
				ON date(signups.created_at) = date_series.timestep
				AND signups.created_at BETWEEN ${fromTimestamp} AND ${toTimestamp}
				
				AND signups.waitlist_id = ${waitlistID}
			GROUP BY date_series.timestep
			ORDER BY date_series.timestep;			
		`,
		)
		.then((result) => {
			return result.rows as DBResult[];
		});
}

export async function getDayChartLabelsAndValues(
	waitlist: string,
	userID: string,
	day: string,
): Promise<EntryResponse> {
	const data = await getSignupsCountForDay(waitlist, userID, day);

	const entries: Entry[] = data.map((row) => {
		const label = new Date(row.timestep).toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
		const value = Number(row.signups_count);
		const tooltipLabel = `${label}: ${value}`;
		return { label, value, tooltipLabel };
	});
	const dayString = new Date(day).toDateString().split(" ").slice(1, 3).join(" ");
	console.log(entries);
	return { entries, dayString };
}

export async function getDayRangeChartLabelsAndValues(
	waitlist: string,
	userID: string,
	from: string,
	to: string,
): Promise<EntryResponse> {
	const data = await getSignupsCountForDayRange(waitlist, userID, from, to);

	const entries: Entry[] = data.map((row) => {
		const label = new Date(row.timestep).toDateString().split(" ").slice(1, 3).join(" ");
		const value = Number(row.signups_count);
		const tooltipLabel = `${label}: ${value}`;
		return { label, value, tooltipLabel };
	});
	const fromString = new Date(from).toDateString().split(" ").slice(1, 3).join(" ");
	const toString = new Date(to).toDateString().split(" ").slice(1, 3).join(" ");
	const dayString = `${fromString} - ${toString}`;

	return { entries, dayString };
}

export async function getCounts(waitlistID: string, userID: string) {
	await checkAuth(waitlistID, userID);

	const data = await db
		.execute(
			sql`
			WITH signups_today AS (
				SELECT COUNT(*) AS count_today
				FROM signups
				WHERE DATE(created_at) = CURRENT_DATE AND waitlist_id = ${waitlistID}
			)
			
			select 
				count(*) as total_count,
				count(*) filter (where status = 'invited' AND waitlist_id = ${waitlistID}) as invited_count,
				(select count_today from signups_today)  as delta
			from signups where waitlist_id = ${waitlistID};
				
				`,
		)
		.then((result) => {
			return result.rows as { total_count: number; invited_count: number; delta: number }[];
		});
	console.log(data);
	return {
		total: data[0].total_count,
		invited: data[0].invited_count,
		waiting: data[0].total_count - data[0].invited_count,
		delta: data[0].delta,
	};
}
