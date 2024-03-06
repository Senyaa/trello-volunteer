"use server";

import { drizzle } from "@/drizzle/drizzle";
import { shift } from "@/drizzle/drizzleSchema";
import { getCurrentShiftId } from "./getCurrentShiftId";
import { Shift } from "@/app/types/Shift";

export async function addShiftNote(
  shiftType = "cats",
  description: string,
) {
  const currentShiftId = await getCurrentShiftId(shiftType);

  if (!currentShiftId) {
    throw new Error("Couldn't find the shift");
  }

  const updateData: Partial<Shift> = {
    id: currentShiftId,
    description,
  };

  await drizzle
    .insert(shift)
    .values(updateData)
    .onConflictDoUpdate({
      target: [shift.id],
      set: { description },
    });

  return true;
}
