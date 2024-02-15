import * as schema from "./drizzleSchema";
import { drizzleVercel, drizzleVercelConnection } from "./drizzleVercel";

export const drizzle = drizzleVercel;
export const drizzleSchema = schema;
