import { drizzle } from "@/drizzle/drizzle";
import { link } from "@/drizzle/drizzleSchema";
import { eq } from "drizzle-orm";

export async function deleteLink(id: string) {
  await drizzle.delete(link).where(eq(link.id, id));
}
