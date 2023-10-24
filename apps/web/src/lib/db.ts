import "server-only";

import { neon, neonConfig } from "@neondatabase/serverless";
import { sql, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { DBResult, Entry } from "@/types";

neonConfig.fetchConnectionCache = true;

const neonDB = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(neonDB);

export const signups = pgTable("signups", {
	id: uuid("id").primaryKey(),
	clerk_user_id: varchar("clerk_user_id", { length: 50 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	first_name: varchar("first_name", { length: 255 }).notNull(),
	last_name: varchar("last_name", { length: 255 }).notNull(),
	date_signed_up: timestamp("date_signed_up").defaultNow(),
	status: varchar("status", { length: 50 }).notNull(),
});

export async function getSignupsList() {
	console.log("getSignupsList");
	return db.select().from(signups).orderBy(desc(signups.date_signed_up));
}

export async function getEmailsList() {
	const result = await db
		.select({
			email: signups.email,
		})
		.from(signups)
		.orderBy(desc(signups.date_signed_up))
		.limit(10);

	return result;
}

export async function getSignupsCountForDay(day: string) {
	console.log(day);
	const fromTimestamp = day + " 00:00:00";
	const toTimestamp = day + " 23:59:59";
	return db
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
			GROUP BY hourly_series.signup_hour
			ORDER BY hourly_series.signup_hour;
			`),
		)
		.then((result) => {
			return result.rows as DBResult[];
		});
}

export async function getSignupsCountForDayRange(from: string, to: string) {

	const fromTimestamp = from + " 00:00:00";
	const toTimestamp = to + " 23:59:59";

	return db
		.execute(
			sql`SELECT
			date(date_signed_up) AS timestep,
			COUNT(*) AS signups_count
		FROM signups
		WHERE date_signed_up BETWEEN ${fromTimestamp} AND ${toTimestamp}
		GROUP BY timestep
		ORDER BY timestep;
		`,
		)
		.then((result) => {
			return result.rows as DBResult[];
		});
}

export async function getDayChartLabelsAndValues(day: string) {

	const data = await getSignupsCountForDay(day);

	const entries: Entry[] = data.map((row) => {
		const label = new Date(row.timestep).toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
		const value = Number(row.signups_count);
		const tooltipLabel = `${label}: ${value}`;
		return { label, value, tooltipLabel};
	});
	const dayString = new Date(day).toDateString().split(" ").slice(1, 3).join(" ");
	console.log(entries);
	return {entries, dayString};
}

export async function getDayRangeChartLabelsAndValues(from: string, to: string) {
	const data = await getSignupsCountForDayRange(from, to);

	const entries: Entry[] = data.map((row) => {
		const label = new Date(row.timestep).toDateString().split(" ").slice(1, 3).join(" ");
		const value = Number(row.signups_count);
		const tooltipLabel = `${label}: ${value}`;
		return { label, value, tooltipLabel };
	});
	const fromString = new Date(from).toDateString().split(" ").slice(1, 3).join(" ");
	const toString = new Date(to).toDateString().split(" ").slice(1, 3).join(" ");
	const dayString = `${fromString} - ${toString}`;

	return {entries, dayString};
}

export async function getCounts() {
	const data = await db
		.select({
			total_count: sql<number>`count(*)`,
			invited_count: sql<number>`count(case when status = 'invited' then 1 end)`,
		})
		.from(signups);

	return {
		total: data[0].total_count,
		invited: data[0].invited_count,
		waiting: data[0].total_count - data[0].invited_count,
	};
}
