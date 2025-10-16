import "dotenv/config";

import { migrate as migrateVercel } from "drizzle-orm/vercel-postgres/migrator";
import { drizzleVercel } from "./drizzleVercel";

(async function () {
  try {
    const isVercel = process.env.PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK;

    const options = { migrationsFolder: "./drizzle/migrations" };

    console.log("Starting migrations");

    console.log("Migrations mode:", isVercel ? "Vercel" : "Local");

    if (isVercel) {
      await migrateVercel(drizzleVercel, options);
    } else {
      const { migrate } = await import("drizzle-orm/postgres-js/migrator");
      const { drizzleLocal } = await import("./drizzleLocal");

      await migrate(drizzleLocal, options);
    }

    console.log("Finished migrations migrations");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }

  process.exit(0);
})();
