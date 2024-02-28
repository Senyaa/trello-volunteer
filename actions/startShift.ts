"use server";

import { revalidatePath } from "next/cache";
import { drizzle } from "@/drizzle/drizzle";
import { shift as dbShift, usersOnShift } from "@/drizzle/drizzleSchema";
import getCurrentShiftIdOrThrow from "./services/getCurrentUserIdOrThrow";

export async function startShift(shiftType = "cats") {
  const userId = await getCurrentShiftIdOrThrow();

  const shiftReturned = await drizzle.transaction(async (tx) => {
    const [shift] = await tx
      .insert(dbShift)
      .values({
        shiftType: shiftType,
        started: new Date(),
      })
      .returning();
    await tx.insert(usersOnShift).values({ userId, shiftId: shift.id });
    return shift;
  });

  revalidatePath("/protected/animals/[slug]", "page");

  return shiftReturned;
}
