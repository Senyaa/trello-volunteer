"use server"

import { drizzle } from "@/drizzle/drizzle";
import { shift } from "@/drizzle/drizzleSchema";
import { eq } from "drizzle-orm";

const getShiftById = async (shiftId: string) => {
  const shiftById = await drizzle.query.shift.findFirst({
    where: eq(shift.id, shiftId)
  });
  return shiftById;
};

export default getShiftById;
