import getCurrentShift from "./services/getCurrentShift";
import getCurrentUserId from "./services/getCurrentUserId";

export async function getCurrentShiftId(shiftType = "cats") {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const currentShift = await getCurrentShift(shiftType, userId);

  return currentShift?.id;
}
