"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentShiftId } from "./getCurrentShiftId";

export async function endShift() {
  const shiftId = await getCurrentShiftId();
  if (!shiftId) {
    throw Error("Nie jest obecnie prowadzony dyżur")
  }

  const shift = await prisma.shift.update({
    where: { id: shiftId },
    data: { finished: new Date() },
  });

  revalidatePath("/protected/animals/cats")

  return shift;
}
