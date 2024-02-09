"use server";

import getCurrentUserId from "./services/getCurrentUserId";
import { drizzle } from "@/drizzle/drizzle";
import { and, eq, isNull } from "drizzle-orm";
import { animalOnShift, shifts } from "@/drizzle/drizzleSchema";
import { v4 } from "uuid";

export async function checkAnimalAsDone(
  shiftType = "cats",
  animalId: string,
  isDone: boolean,
  description = ""
) {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw Error("There is no user");
  }

  const currentShift = await drizzle.query.shifts.findFirst({
    where: and(eq(shifts.shiftType, shiftType), isNull(shifts.finished)),
    with: {
      usersOnShift: {
        where: (u) => eq(u.userId, userId),
      },
    },
  });

  if (!currentShift) {
    throw new Error("Couldn't find the shift");
  }

  const updateData = {
    animalTrelloId: animalId,
    shiftId: currentShift.id,
    done: isDone,
    description,
    id: v4(),
  };

  await drizzle
    .insert(animalOnShift)
    .values(updateData)
    .onConflictDoUpdate({
      target: [animalOnShift.animalTrelloId, animalOnShift.shiftId],
      set: { done: isDone, description },
    });

  return currentShift;
}
