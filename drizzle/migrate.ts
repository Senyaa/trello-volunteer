import "dotenv/config";

import { migrate as migrateVercel } from "drizzle-orm/vercel-postgres/migrator";
import { migrate as migratePg } from "drizzle-orm/postgres-js/migrator";
import { drizzleVercel, drizzleVercelConnection } from "./drizzleVercel";
import { drizzleLocal, drizzleLocalConnection } from "./drizzleLocal";

const isVercel = process.env.PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK;

const options = { migrationsFolder: "./drizzle/migrations" };

if (isVercel) {
  await migrateVercel(drizzleVercel, options);
  await drizzleVercelConnection.end();
} else {
  await migratePg(drizzleLocal, options);
  await drizzleLocalConnection.end();
}
