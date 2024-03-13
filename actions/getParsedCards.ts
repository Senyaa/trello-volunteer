import { Card } from "../app/types/Card";
import getCards from "../app/client/getCards";
import { getCurrentShiftId } from "./getCurrentShiftId";
import { drizzle } from "@/drizzle/drizzle";
import { eq, inArray } from "drizzle-orm";
import { animalOnShift, imageUrl } from "@/drizzle/drizzleSchema";

export const getParsedCardsNotOnShift = (trelloId: string) =>
  getParsedCards(trelloId, true);

export const getParsedCards = async (
  trelloId: string,
  withoutShift?: boolean
): Promise<Card[]> => {
  const trelloCards = await getCards(trelloId);
  const attachmentIds = trelloCards
    .map((card) => card.cover.idAttachment || "")
    .filter(Boolean);

  const returnedUrls = await drizzle.query.imageUrl.findMany({
    where: inArray(imageUrl.attachmentId, attachmentIds),
  });

  let animalsOnCurrentShift: Shift[] = [];
  let currentShiftId: string | null | undefined = null;
  currentShiftId = await getCurrentShiftId();

  if (currentShiftId && !withoutShift) {
    animalsOnCurrentShift = currentShiftId
      ? await drizzle.query.animalOnShift.findMany({
          where: eq(animalOnShift.shiftId, currentShiftId),
        })
      : [];
  }
  trelloCards.forEach((card) => {
    card.cover.url =
      returnedUrls.find((url) => url.attachmentId === card.cover.idAttachment)
        ?.url?.replace("http://", "https://") || "";

    if (currentShiftId && !withoutShift) {
      const currentAnimal = animalsOnCurrentShift.find(
        (shiftAnimal) => shiftAnimal.animalTrelloId === card.id
      );
      const isCardOnShift = currentAnimal?.done || false;
      const hasNote = currentAnimal?.description || "";

      card.isDone = currentShiftId ? isCardOnShift : false;
      card.note = currentShiftId ? hasNote : "";
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
      note,
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
      note,
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
