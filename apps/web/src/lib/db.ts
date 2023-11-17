import "server-only";

import { neon, neonConfig } from "@neondatabase/serverless";
import { sql, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { DBResult, Entry, EntryResponse } from "@/types";

neonConfig.fetchConnectionCache = true;

if (process.env.NODE_ENV === "development") {
	neonConfig.fetchEndpoint = (host) => {
		const protocol = host === "db.localtest.me" ? "http" : "https";
		const port = host === "db.localtest.me" ? 4444 : 443;
		return `${protocol}://${host}:${port}/sql`;
	};
}

const neonDB = neon(process.env.DRIZZLE_DATABASE_URL!);



export const signups = pgTable("signups", {
	id: uuid("id").primaryKey(),
	clerk_user_id: varchar("clerk_user_id", { length: 50 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	first_name: varchar("first_name", { length: 255 }).notNull(),
	last_name: varchar("last_name", { length: 255 }).notNull(),
	date_signed_up: timestamp("date_signed_up").defaultNow(),
	status: varchar("status", { length: 50 }).notNull(),
});

export const email_templates = pgTable("email_templates", {
	id: uuid("id").primaryKey(),
	clerk_user_id: varchar("clerk_user_id", { length: 50 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	section_color: varchar("section_color", { length: 50 }).notNull(),
	body_text: text("body_text").notNull(),
});

const db = drizzle(neonDB, { schema: { signups } });

// console.log(db.execute(sql`SELECT 1;`));

export async function setEmailTemplateForUser(emailTemplate: any) {
	console.log("inserting email template");
	return await db
		.update(email_templates)
		.set({
			body_text: emailTemplate.bodyText,
			section_color: emailTemplate.sectionColor,
			email: emailTemplate.email,
		})
		.where(eq(email_templates.clerk_user_id, "test"));
}

export async function getEmailTemplateForUser(userID: string) {
	return db.select().from(email_templates).where(eq(email_templates.clerk_user_id, userID));
}

export async function getSignupsList(userID: string) {
	const signupsList = await db
		.select()
		.from(signups)
		.where(eq(signups.clerk_user_id, userID))
		.orderBy(desc(signups.date_signed_up));
	return signupsList;
}

export async function deleteSignupById(id: string) {
	return db.delete(signups).where(eq(signups.id, id));
}

export async function getSignupsEmailListforUser(userID: string) {
	const result = await db
		.select({
			email: signups.email,
		})
		.from(signups)
		.where(eq(signups.clerk_user_id, userID))
		.orderBy(desc(signups.date_signed_up))
		.limit(10);

	return result;
}

export async function getSignupsCountForDay(userID: string, day: string) {
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
				COALESCE(COUNT(signups.date_signed_up), 0) AS signups_count
			FROM hourly_series
			LEFT JOIN signups
				ON date_trunc('hour', signups.date_signed_up) = hourly_series.signup_hour
				AND signups.date_signed_up BETWEEN '${fromTimestamp}' AND '${toTimestamp}'
				AND signups.clerk_user_id = '${userID}'
			GROUP BY hourly_series.signup_hour
			ORDER BY hourly_series.signup_hour;
			`),
		)
		.then((result) => {
			return result.rows as DBResult[];
		});
}

export async function getSignupsCountForDayRange(userID: string, from: string, to: string) {
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
				COALESCE(COUNT(signups.date_signed_up), 0) AS signups_count
			FROM date_series
			LEFT JOIN signups 
				ON date(signups.date_signed_up) = date_series.timestep
				AND signups.date_signed_up BETWEEN ${fromTimestamp} AND ${toTimestamp}
				AND signups.clerk_user_id = ${userID}
			GROUP BY date_series.timestep
			ORDER BY date_series.timestep;			
		`,
		)
		.then((result) => {
			return result.rows as DBResult[];
		});
}

export async function getDayChartLabelsAndValues(userID: string, day: string): Promise<EntryResponse> {
	const data = await getSignupsCountForDay(userID, day);

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
	userID: string,
	from: string,
	to: string,
): Promise<EntryResponse> {
	const data = await getSignupsCountForDayRange(userID, from, to);

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

export async function getCounts(userID: string) {
	const data = await db
		.execute(
			sql`
			WITH signups_today AS (
				SELECT COUNT(*) AS count_today
				FROM signups
				WHERE DATE(date_signed_up) = CURRENT_DATE
			)
			
			select 
				count(*) as total_count,
				count(*) filter (where status = 'invited') as invited_count,
				(select count_today from signups_today)  as delta
			from signups where clerk_user_id = ${userID};
				
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
