"use server";

import { drizzle } from "@/drizzle/drizzle";
import { animalOnShift } from "@/drizzle/drizzleSchema";
import { getCurrentShiftId } from "./getCurrentShiftId";

export async function addNote(
  shiftType = "cats",
  animalId: string,
  description: string,
) {
  const currentShiftId = await getCurrentShiftId(shiftType);

  if (!currentShiftId) {
    throw new Error("Couldn't find the shift");
  }

  const updateData = {
    animalTrelloId: animalId,
    shiftId: currentShiftId,
    description,
  };

  await drizzle
    .insert(animalOnShift)
    .values(updateData)
    .onConflictDoUpdate({
      target: [animalOnShift.animalTrelloId, animalOnShift.shiftId],
      set: { description },
    });

  return true;
}
