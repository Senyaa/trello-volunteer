"use server";

import { drizzle } from "@/drizzle/drizzle";
import { guestView } from "@/drizzle/drizzleSchema";
import { getParsedCards } from "./getParsedCards";
import getCurrentUserId from "./services/getCurrentUserId";
import { filterCats } from "@/app/helpers/cardFilters";

export const shareCards = async (trelloId: string) => {
  const cards = await getParsedCards(trelloId, false);

  const animals = filterCats(cards);
  const userId = await getCurrentUserId();

  if (!userId) return;

  const defaultEndTime = new Date();
  const shiftInMinutes = 3 * 60;
  defaultEndTime.setTime(defaultEndTime.getTime() + shiftInMinutes * 60 * 1000);

  const guestShift = {
    userId,
    content: animals,
    endsAt: defaultEndTime,
  };

  const guestViewReturned = await drizzle
    .insert(guestView)
    .values(guestShift)
    .returning();
  return guestViewReturned[0];
};
