import getCurrentUserId from "./services/getCurrentUserId";
import getCurrentShift from "./services/getCurrentShift";

export async function getCurrentShiftId(shiftType = "cats") {
  const userId = await getCurrentUserId();

  if (!userId) {
    return ''
  }
  const currentShift = await getCurrentShift(shiftType, userId);

  return currentShift?.id;
}
