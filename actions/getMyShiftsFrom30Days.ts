import { drizzle } from "@/drizzle/drizzle";
import { usersOnShift, shift } from "@/drizzle/drizzleSchema";
import { and, eq, inArray, gt, desc } from "drizzle-orm";
import getCurrentUserId from "./services/getCurrentUserId";
import { Shift } from "@/app/types/Shift";

const getMyShiftsFrom30Days = async (): Promise<Shift[]> => {
  const userId = await getCurrentUserId();
  const shiftIds = await drizzle.query.usersOnShift.findMany({
    where: eq(usersOnShift.userId, userId as any),
    columns: { shiftId: true },
  });

  const shiftIdsArray: string[] = shiftIds.map((o) => o.shiftId);

  const last30DaysAfter = new Date();
  last30DaysAfter.setDate(last30DaysAfter.getDate() - 30);

  const myShifts = await drizzle.query.shift.findMany({
    where: and(
      inArray(shift.id, shiftIdsArray),
      gt(shift.finished, last30DaysAfter)
    ),
    orderBy: [desc(shift.started), desc(shift.finished)],
  });

  return myShifts || [];
};

export default getMyShiftsFrom30Days;
