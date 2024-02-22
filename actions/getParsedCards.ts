import { Card } from "../app/types/Card";
import getCards from "../app/client/getCards";
import { getCurrentShiftId } from "./getCurrentShiftId";
import { drizzle } from "@/drizzle/drizzle";
import { eq, inArray } from "drizzle-orm";
import { animalOnShift, imageUrl } from "@/drizzle/drizzleSchema";

export const getParsedCards = async (
  trelloId: string,
  isOnShift?: boolean
): Promise<Card[]> => {
  const trelloCards = await getCards(trelloId);
  const attachmentIds = trelloCards
    .map((card) => card.cover.idAttachment || "")
    .filter(Boolean);

  const returnedUrls = await drizzle.query.imageUrl.findMany({
    where: inArray(imageUrl.attachmentId, attachmentIds),
  });

  let isDoneOnCurrentShift: Shift[] = [];
  let currentShiftId: string | null | undefined = null;

  if (isOnShift) {
    currentShiftId = await getCurrentShiftId();

    isDoneOnCurrentShift = currentShiftId
      ? await drizzle.query.animalOnShift.findMany({
          where: eq(animalOnShift.shiftId, currentShiftId),
        })
      : [];
  }

  trelloCards.forEach((card) => {
    card.cover.url =
      returnedUrls.find((url) => url.attachmentId === card.cover.idAttachment)
        ?.url || "";

    if (isOnShift) {
      const isCardOnShift =
        isDoneOnCurrentShift.find(
          (shiftAnimal) => shiftAnimal.animalTrelloId === card.id
        )?.done || false;

      card.isDone = currentShiftId ? isCardOnShift : false;
    }
  });

  const cards = trelloCards.map(
    ({
      id,
      desc,
      idBoard,
      idList,
      name,
      url,
      cover,
      shortUrl,
      isDone,
      ..._
    }) => ({
      id,
      desc,
      idBoard,
      idList,
      name,
      url,
      cover,
      shortUrl,
      isDone,
    })
  );

  return cards;
};

type Shift = {
  description: string | null;
  shiftId: string | null;
  animalTrelloId: string | null;
  done: boolean | null;
};
