import * as schema from "./drizzleSchema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const drizzleLocalConnection = postgres(process.env.DATABASE_URL || "");

export const drizzleLocal = drizzle(drizzleLocalConnection, { schema });
