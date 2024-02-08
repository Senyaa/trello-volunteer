"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import getCurrentUserId from "./services/getCurrentUserId";
import getCurrentShift from "./services/getCurrentShift";

export async function checkAnimalAsDone(
  shiftType = "cats",
  animalId: string,
  isDone: boolean,
  description?: string
) {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw Error("There is no user");
  }

  const currentShift = await getCurrentShift(shiftType, userId);

  if (!currentShift) {
    throw new Error("Couldn't find the shift");
  }

  await prisma.animalOnShift.upsert({
    where: {
      animal_shift: {
        animalTrelloId: animalId,
        shiftId: currentShift.id,
      },
    },
    update: {
      animalTrelloId: animalId,
      shiftId: currentShift.id,
      done: isDone,
      description,
    },
    create: {
      animalTrelloId: animalId,
      shiftId: currentShift.id,
      done: true,
      description,
    },
  });

  revalidatePath("/protected/animals/cats");

  return currentShift;
}
