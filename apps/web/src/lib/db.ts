import { neon, neonConfig } from "@neondatabase/serverless";
import { sql, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

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
// const result = await db.select().from(...);
type DBResult = {
	timestep: string;
	signups_count: number;
};

export async function getSignupsList() {
	return db.select().from(signups).limit(100).orderBy(desc(signups.date_signed_up));
}

export async function getEmailsList() {
	return db
		.select({
			email: signups.email,
		})
		.from(signups)
		.limit(100);
}

export async function getSignupsCountForDay(day: string) {
	console.log(day);
	const fromTimestamp = day + " 00:00:00";
	const toTimestamp = day + " 23:59:59";
	// return db
	// 	.execute(
	// 		sql`WITH hourly_series AS (
	// 			SELECT generate_series(
	// 				timestamp '2023-10-23 00:00:00',
	// 				timestamp '2023-10-23 23:59:59',
	// 				interval '1 hour'
	// 			) AS signup_hour
	// 		)
			
	// 		SELECT 
	// 			hourly_series.signup_hour as timestep,
	// 			COALESCE(COUNT(signups.date_signed_up), 0) AS signups_count
	// 		FROM hourly_series
	// 		LEFT JOIN signups 
	// 			ON date_trunc('hour', signups.date_signed_up) = hourly_series.signup_hour
	// 			AND signups.date_signed_up BETWEEN '2023-10-23 00:00:00' AND '2023-10-23 23:59:59'
	// 		GROUP BY hourly_series.signup_hour
	// 		ORDER BY hourly_series.signup_hour;
	// 		`,
	// 	)
	// 	.then((result) => {
	// 		return result.rows as DBResult[];
	// 	});
	return [
		{ timestep: '2023-10-23 00:00:00', signups_count: '3' },
		{ timestep: '2023-10-23 01:00:00', signups_count: '2' },
		{ timestep: '2023-10-23 02:00:00', signups_count: '2' },
		{ timestep: '2023-10-23 03:00:00', signups_count: '15' },
		{ timestep: '2023-10-23 04:00:00', signups_count: '14' },
		{ timestep: '2023-10-23 05:00:00', signups_count: '9' },
		{ timestep: '2023-10-23 06:00:00', signups_count: '4' },
		{ timestep: '2023-10-23 07:00:00', signups_count: '8' },
		{ timestep: '2023-10-23 08:00:00', signups_count: '9' },
		{ timestep: '2023-10-23 09:00:00', signups_count: '15' },
		{ timestep: '2023-10-23 10:00:00', signups_count: '13' },
		{ timestep: '2023-10-23 11:00:00', signups_count: '4' },
		{ timestep: '2023-10-23 12:00:00', signups_count: '2' },
		{ timestep: '2023-10-23 13:00:00', signups_count: '11' },
		{ timestep: '2023-10-23 14:00:00', signups_count: '8' },
		{ timestep: '2023-10-23 15:00:00', signups_count: '9' },
		{ timestep: '2023-10-23 16:00:00', signups_count: '8' },
		{ timestep: '2023-10-23 17:00:00', signups_count: '9' },
		{ timestep: '2023-10-23 18:00:00', signups_count: '10' },
		{ timestep: '2023-10-23 19:00:00', signups_count: '15' },
		{ timestep: '2023-10-23 20:00:00', signups_count: '8' },
		{ timestep: '2023-10-23 21:00:00', signups_count: '0' },
		{ timestep: '2023-10-23 22:00:00', signups_count: '0' },
		{ timestep: '2023-10-23 23:00:00', signups_count: '0' }
	  ]
	


}

export async function getSignupsCountForDayRange(from: string, to: string) {
	// return db
	// 	.select({
	// 		day: signups.date_signed_up,
	// 		count:  sql<number>`count(*)`
	// 	})
	// 	.from(signups)
	// 	.groupBy(signups.date_signed_up)
	// 	.orderBy(signups.date_signed_up);
	// console.log(from, to)
	
	const fromTimestamp = from + " 00:00:00";
	const toTimestamp = to + " 23:59:59";

	// return db
	// 	.execute(
	// 		sql`SELECT 
	// 		date(date_signed_up) AS timestep,
	// 		COUNT(*) AS signups_count
	// 	FROM signups
	// 	WHERE date_signed_up BETWEEN ${fromTimestamp} AND ${toTimestamp}
	// 	GROUP BY timestep
	// 	ORDER BY timestep;
	// 	`,
	// 	)
	// 	.then((result) => {
	// 		return result.rows as DBResult[];
	// 	});
		return  [
			{ timestep: '2023-10-07', signups_count: '5' },
			{ timestep: '2023-10-08', signups_count: '1' },
			{ timestep: '2023-10-09', signups_count: '4' },
			{ timestep: '2023-10-10', signups_count: '1' },
			{ timestep: '2023-10-11', signups_count: '2' },
			{ timestep: '2023-10-13', signups_count: '2' },
			{ timestep: '2023-10-14', signups_count: '2' },
			{ timestep: '2023-10-15', signups_count: '1' },
			{ timestep: '2023-10-16', signups_count: '4' },
			{ timestep: '2023-10-17', signups_count: '1' },
			{ timestep: '2023-10-18', signups_count: '8' },
			{ timestep: '2023-10-19', signups_count: '4' },
			{ timestep: '2023-10-20', signups_count: '1' },
			{ timestep: '2023-10-22', signups_count: '18' },
			{ timestep: '2023-10-23', signups_count: '178' },
			{ timestep: '2023-10-24', signups_count: '2' }
		  ]

	// return true
}

export async function getDayChartLabelsAndValues(day: string){

	type Entry = {
		label: string;
		value: number;
		tooltipLabel: string;
	};

	const data = await getSignupsCountForDay(day);
	
	const entries: Entry[] = data.map((row) => {
		const label =new Date( row.timestep).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
		const value = Number(row.signups_count);
		const tooltipLabel = `${label}: ${value}`;
		return { label, value, tooltipLabel };
	})
	console.log(entries)
	return entries

}

export async function getDayRangeChartLabelsAndValues(from: string, to: string){

	type Entry = {
		label: string;
		value: number;
		tooltipLabel: string;
	};

	const data = await getSignupsCountForDayRange(from, to);
	
	const entries: Entry[] = data.map((row) => {
		const label = row.timestep;
		const value = Number(row.signups_count);
		const tooltipLabel = `${label}: ${value}`;
		return { label, value, tooltipLabel };
	})
	console.log(entries)
	return entries

}