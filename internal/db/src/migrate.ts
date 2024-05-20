import { neon, neonConfig } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as schema from "./schema";

dotenv.config({ path: ".env.local" });

const runMigration = async () => {
	console.log("Running migration");
	console.log("Running on " + process.env.DATABASE_URL!);

	if (!process.env.DATABASE_URL) {
		throw new Error("No database URL");
	}

	// neonConfig.fetchConnectionCache = true;

	neonConfig.fetchEndpoint = (host) => {
		const protocol = host === "db.localtest.me" ? "http" : "https";
		const port = host === "db.localtest.me" ? 4444 : 443;
		return `${protocol}://${host}:${port}/sql`;
	};

	const neonDB = neon(process.env.DATABASE_URL!);

	const db = drizzle(neonDB, { schema: { ...schema } });

	await migrate(db, { migrationsFolder: "./drizzle/migrations" });

	console.log("Migration complete");
};

runMigration().catch((err) => {
	console.error(err);
	process.exit(1);
});
