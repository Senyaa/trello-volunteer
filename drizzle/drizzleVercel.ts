import * as schema from "./drizzleSchema";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const drizzleVercelConnection = sql;

export const drizzleVercel = drizzle(sql, { schema });
