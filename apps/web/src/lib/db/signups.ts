import "server-only";

import type { DBResult, Entry, EntryResponse } from "@/types";
import { signups } from "@entrybase/db";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db } from "./db";

export async function getInvitesListByCount(selectionMethod: string, count: number, waitlistID: string) {
  const orderBy =
    selectionMethod === "random"
      ? sql`RANDOM()`
      : selectionMethod === "latest"
        ? desc(signups.createdAt)
        : selectionMethod === "oldest"
          ? asc(signups.createdAt)
          : null;

  if (!orderBy) {
    throw new Error("invalid selection method");
  }

  const signupsList = await db
    .select({
      id: signups.signupID,
      email: signups.email,
    })
    .from(signups)
    .where(and(eq(signups.status, "waiting"), eq(signups.waitlistID, waitlistID)))
    .orderBy(orderBy)
    .limit(count);

  return signupsList;
}

export async function getSignupsList(waitlistID: string) {
  const signupsList = await db
    .select()
    .from(signups)
    .where(eq(signups.waitlistID, waitlistID))
    .orderBy(desc(signups.createdAt));
  return signupsList;
}

export async function deleteSignupById(id: string) {
  return await db.delete(signups).where(eq(signups.signupID, id));
}

export async function getSignupsEmailListforUser(waitlistID: string) {
  const result = await db
    .select({
      email: signups.email,
      dateCreated: signups.createdAt,
    })
    .from(signups)
    .where(eq(signups.waitlistID, waitlistID))
    .orderBy(desc(signups.createdAt))
    .limit(10);

  return result;
}

export async function getSignupsCountForDay(waitlistID: string, day: string) {
  const fromTimestamp = `${day} 00:00:00`;
  const toTimestamp = `${day} 23:59:59`;
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

export async function getSignupsCountForDayRange(waitlistID: string, from: string, to: string) {
  const fromTimestamp = `${from} 00:00:00`;
  const toTimestamp = `${to} 23:59:59`;

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

export async function getDayChartLabelsAndValues(waitlist: string, day: string): Promise<EntryResponse> {
  const data = await getSignupsCountForDay(waitlist, day);

  const entries: Entry[] = data.map((row) => {
    const day = new Date(row.timestep).toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
    const signups = Number(row.signups_count);
    return { day, signups };
  });
  const dayString = new Date(day).toDateString().split(" ").slice(1, 3).join(" ");
  return { entries, dayString };
}

export async function getDayRangeChartLabelsAndValues(
  waitlist: string,
  from: string,
  to: string,
): Promise<EntryResponse> {
  const data = await getSignupsCountForDayRange(waitlist, from, to);

  const entries: Entry[] = data.map((row) => {
    const day = new Date(row.timestep).toDateString().split(" ").slice(1, 3).join(" ");
    const signups = Number(row.signups_count);
    return { day, signups };
  });
  const fromDateString = new Date(from).toDateString().split(" ").slice(1, 3).join(" ");
  const toDateString = new Date(to).toDateString().split(" ").slice(1, 3).join(" ");
  const dayString = `${fromDateString} - ${toDateString}`;

  return { entries, dayString };
}

export async function getCounts(waitlistID: string) {
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
      return result.rows as [{ total_count: string; invited_count: string; delta: string }];
    });
  return {
    total: data[0].total_count,
    invited: data[0].invited_count,
    waiting: (Number.parseInt(data[0].total_count) - Number.parseInt(data[0].invited_count)).toString(),
    delta: data[0]?.delta ?? 0,
  };
}

export async function getSignupsCountForWeek(waitlistID: string) {
  return (await db
    .select({
      count: sql`COUNT(*)`,
    })
    .from(signups)
    .where(and(eq(signups.waitlistID, waitlistID), sql`created_at >= CURRENT_DATE - INTERVAL '7 days'`))
    .then((result) => {
      return result[0]?.count;
    })) as number;
}

export async function getSignupsCountForMonth(waitlistID: string) {
  return (await db
    .select({
      count: sql`COUNT(*)`,
    })
    .from(signups)
    .where(and(eq(signups.waitlistID, waitlistID), sql`created_at >= CURRENT_DATE - INTERVAL '30 days'`))
    .then((result) => {
      return result[0]?.count;
    })) as number;
}
