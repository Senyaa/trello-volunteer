import { drizzle } from "@/drizzle/drizzle";
import { shift } from "@/drizzle/drizzleSchema";
import { and, eq, isNull } from "drizzle-orm";

const getCurrentShift = async (shiftType = "cats", userId: string) => {
  const currentShift = await drizzle.query.shift.findFirst({
    where: and(eq(shift.shiftType, shiftType), isNull(shift.finished)),
    with: {
      usersOnShift: {
        where: (u) => eq(u.userId, userId),
      },
    },
  });

  return currentShift;
};

export default getCurrentShift;
