"use server";

import { revalidatePath } from "next/cache";
import { drizzle } from "@/drizzle/drizzle";
import { shifts, usersOnShift } from "@/drizzle/drizzleSchema";
import { createId } from "@paralleldrive/cuid2";
import getCurrentShiftIdOrThrow from "./services/getCurrentUserIdOrThrow";

export async function startShift(shiftType = "cats") {
  const userId = await getCurrentShiftIdOrThrow();

  const shift = await drizzle.transaction(async (tx) => {
    const [shift] = await tx
      .insert(shifts)
      .values({
        id: createId(),
        shiftType: shiftType,
      })
      .returning();
    await tx.insert(usersOnShift).values({ userId, shiftId: shift.id });
    return shift;
  });

  revalidatePath("/protected/animals/[slug]", "page");

  return shift;
}
