import { signups } from "@entrybase/db";
import { newId } from "@entrybase/id";
import type { Context } from "hono";
import { env } from "hono/adapter";
import { db } from "../db";

export async function signupRoute(c: Context) {
	const waitlist = c.req.param("waitlist");
	const body = await c.req.json();
	const email = body.email;

	const signupID = newId("su");

	try {
		const _record = await db.insert(signups).values({
			signupID,
			waitlistID: waitlist,
			email,
		});
	} catch (e) {
		console.log(e);
		return c.json({ message: "Internal Server Error" }, { status: 500 });
	}

	await fetch(`${env(c).REALTIME_API_URL}/receive`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			waitlist_id: waitlist,
			update: "update from workers",
		}),
	}).catch((e) => {
		console.log(e);
	});

	return c.json({ id: signupID, message: "Signup Successful" });
}
