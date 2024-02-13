import { drizzle } from "@/drizzle/drizzle";
import { shifts } from "@/drizzle/drizzleSchema";
import { and, eq, isNull } from "drizzle-orm";

const getCurrentShift = async (shiftType = "cats", userId: string) => {
  const currentShift = await drizzle.query.shifts.findFirst({
    where: and(eq(shifts.shiftType, shiftType), isNull(shifts.finished)),
    with: {
      usersOnShift: {
        where: (u) => eq(u.userId, userId),
      },
    },
  });

  return currentShift;
};

export default getCurrentShift;
