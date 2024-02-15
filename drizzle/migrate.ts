import "dotenv/config";

import { migrate as migrateVercel } from "drizzle-orm/vercel-postgres/migrator";
// import { migrate as migratePg } from "drizzle-orm/postgres-js/migrator";
import { drizzleVercel, drizzleVercelConnection } from "./drizzleVercel";
// import { drizzleLocal, drizzleLocalConnection } from "./drizzleLocal";

(async function () {
  const isVercel = process.env.PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK;

  const options = { migrationsFolder: "./drizzle/migrations" };

  console.log("Starting migrations");

  console.log("Migrations mode:", isVercel ? "Vercel" : "Local");

  if (isVercel) {
    await migrateVercel(drizzleVercel, options);
    await drizzleVercelConnection.end();
  } else {
    // await migratePg(drizzleLocal, options);
    // await drizzleLocalConnection.end();
  }

  console.log("Finished migrations migrations");

  process.exit(0);
})();
