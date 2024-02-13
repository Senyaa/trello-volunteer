import * as schema from "./drizzleSchema";
import { drizzleVercel, drizzleVercelConnection } from "./drizzleVercel";
import { drizzleLocal, drizzleLocalConnection } from "./drizzleLocal";

const isVercel = process.env.PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK;

export const dbConnection = isVercel
  ? drizzleVercelConnection
  : drizzleLocalConnection;
export const drizzle = isVercel ? drizzleVercel : drizzleLocal;
export const drizzleSchema = schema;
