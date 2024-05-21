import * as schema from "@entrybase/db/src/schema";
import { neon, neonConfig } from "@neondatabase/serverless";
import { type NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";

export let db: NeonHttpDatabase<typeof schema>;

let initialized = false;

export function createConnection({
  env,
  databaseURL,
}: {
  env: string;
  databaseURL: string;
}) {
  console.log("Creating connection");
  console.log("initialized:", initialized);
  if (initialized) {
    return;
  }
  neonConfig.fetchConnectionCache = true;

  if (env === "development") {
    neonConfig.fetchEndpoint = (host) => {
      const protocol = host === "db.localtest.me" ? "http" : "https";
      const port = host === "db.localtest.me" ? 4444 : 443;
      return `${protocol}://${host}:${port}/sql`;
    };
  }

  const neonDB = neon(databaseURL);
  db = drizzle(neonDB, { schema: { ...schema } });
  initialized = true;
  
}
