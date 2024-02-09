import * as schema from "./drizzleSchema";
import { sql } from "@vercel/postgres";
import { drizzle as vercelDb } from "drizzle-orm/vercel-postgres";
import { drizzle as postgresDb } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const drizzle = process.env.PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK
  ? vercelDb(sql, { schema })
  : postgresDb(postgres(process.env.DATABASE_URL || ""), { schema });

export const drizzleSchema = schema;
