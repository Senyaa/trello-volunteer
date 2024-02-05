"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import getCurrentUserId from "./services/getCurrentUserId";

export async function startShift(shiftType = "cats") {
  const userId = await getCurrentUserId();

 const shift =  await prisma.shift.create({
    data: {
      shiftType,
      users: { create: [{ user: { connect: { id: userId } } }] },
    },
  });

  revalidatePath("/protected/animals/[slug]", "page");

  return shift;
}
