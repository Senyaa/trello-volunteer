import * as schema from "./drizzleSchema";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let drizzleLocal: PostgresJsDatabase<typeof schema>;

if (!global.db) {
  global.db = drizzle(postgres(process.env.DATABASE_URL || ""), { schema });
}

drizzleLocal = global.db;

export { drizzleLocal };
