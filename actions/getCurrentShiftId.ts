import getCurrentShift from "./services/getCurrentShift";
import getCurrentUserIdOrThrow from "./services/getCurrentUserIdOrThrow";

export async function getCurrentShiftId(shiftType = "cats") {
  const userId = await getCurrentUserIdOrThrow();
  const currentShift = await getCurrentShift(shiftType, userId);

  return currentShift?.id;
}
