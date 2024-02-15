import * as schema from "./drizzleSchema";
import { drizzleVercel } from "./drizzleVercel";

const isVercel = process.env.PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK;

export const drizzle = isVercel ? drizzleVercel : require('./drizzleLocal').drizzleLocal;
export const drizzleSchema = schema;
