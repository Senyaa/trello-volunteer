"use server";

import { revalidatePath } from "next/cache";
import { getCurrentShiftId } from "./getCurrentShiftId";
import { drizzle, drizzleSchema } from "@/drizzle/drizzle";
import { eq } from "drizzle-orm";

export async function endShift() {
  const shiftId = await getCurrentShiftId();
  if (!shiftId) {
    throw Error("Nie jest obecnie prowadzony dyżur");
  }

  const shift = await drizzle
    .update(drizzleSchema.shift)
    .set({ finished: new Date() })
    .where(eq(drizzleSchema.shift.id, shiftId))
    .returning();

  revalidatePath("/protected/animals/cats");

  return shift;
}
