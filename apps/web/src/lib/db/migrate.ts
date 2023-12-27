import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { email_templates, signups, waitlists } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const runMigration = async () => {
	console.log("Running migration");
	console.log("Running on " + process.env.DRIZZLE_DATABASE_URL!);

	if (!process.env.DRIZZLE_DATABASE_URL) {
		throw new Error("No database URL");
	}

	neonConfig.fetchConnectionCache = true;

	neonConfig.fetchEndpoint = (host) => {
		const protocol = host === "db.localtest.me" ? "http" : "https";
		const port = host === "db.localtest.me" ? 4444 : 443;
		return `${protocol}://${host}:${port}/sql`;
	};

	const neonDB = neon(process.env.DRIZZLE_DATABASE_URL!);

	const db = drizzle(neonDB, { schema: { signups, waitlists, email_templates } });

	await migrate(db, { migrationsFolder: "./drizzle/migrations" });

	console.log("Migration complete");
};

runMigration().catch((err) => {
	console.error(err);
	process.exit(1);
});
