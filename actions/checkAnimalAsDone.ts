"use server";

import { drizzle } from "@/drizzle/drizzle";
import { animalOnShift } from "@/drizzle/drizzleSchema";
import { getCurrentShiftId } from "./getCurrentShiftId";

export async function checkAnimalAsDone(
  shiftType = "cats",
  animalId: string,
  isDone: boolean,
  description = ""
) {
  const currentShiftId = await getCurrentShiftId(shiftType);

  if (!currentShiftId) {
    throw new Error("Couldn't find the shift");
  }

  const updateData = {
    animalTrelloId: animalId,
    shiftId: currentShiftId,
    done: isDone,
    description,
  };

  await drizzle
    .insert(animalOnShift)
    .values(updateData)
    .onConflictDoUpdate({
      target: [animalOnShift.animalTrelloId, animalOnShift.shiftId],
      set: { done: isDone, description },
    });

  return true;
}
