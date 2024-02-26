import { drizzle } from "@/drizzle/drizzle";
import { animalOnShift } from "@/drizzle/drizzleSchema";
import { eq } from "drizzle-orm";

const getShiftById = async (shiftId: string) => {
  const shift = await drizzle.query.animalOnShift.findMany({
    where: eq(animalOnShift.shiftId, shiftId)
  });

  return shift;
};

export default getShiftById;
