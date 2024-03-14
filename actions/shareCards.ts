"use server";

import { drizzle } from "@/drizzle/drizzle";
import { guestView } from "@/drizzle/drizzleSchema";
import { getParsedCardsNotOnShift } from "./getParsedCards";
import getCurrentUserId from "./services/getCurrentUserId";
import { filterCats, filterDogs } from "@/app/helpers/cardFilters";

export const shareCards = async (
  trelloId: string,
  type: "cats" | "dogs"
) => {
  const cards = await getParsedCardsNotOnShift(trelloId);
  let animals;
  if (type === "cats") {
    animals = filterCats(cards);
  } else if (type === "dogs") {
    animals = filterDogs(cards);

  }
  const userId = await getCurrentUserId();

  if (!userId) return;

  const defaultEndTime = new Date();
  const shiftInMinutes = 3 * 60;
  defaultEndTime.setTime(defaultEndTime.getTime() + shiftInMinutes * 60 * 1000);

  const guestShift = {
    userId,
    content: animals,
    type: type,
    endsAt: defaultEndTime,
  };

  const guestViewReturned = await drizzle
    .insert(guestView)
    .values(guestShift)
    .returning();

  return guestViewReturned[0];
};
