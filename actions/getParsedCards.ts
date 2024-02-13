import { Card } from "../app/types/Card";
import getCards from "../app/client/getCards";
import { getCurrentShiftId } from "./getCurrentShiftId";
import { drizzle } from "@/drizzle/drizzle";
import { eq, inArray } from "drizzle-orm";
import { animalOnShift, imageUrl } from "@/drizzle/drizzleSchema";

export const getParsedCards = async (trelloId: string): Promise<Card[]> => {
  const trelloCards = await getCards(trelloId);
  const attachmentIds = trelloCards
    .map((card) => card.cover.idAttachment || "")
    .filter(Boolean);

  const imageUrls = await drizzle.query.imageUrl.findMany({
    where: inArray(imageUrl.attachmentId, attachmentIds ),
  });

  const currentShiftId = await getCurrentShiftId();

  const isDoneOnCurrentShift = await drizzle.query.animalOnShift.findMany({
    where: eq(animalOnShift.shiftId, currentShiftId || ''),
  });

  trelloCards.forEach((card) => {
    card.cover.url = imageUrls.find(
      (url) => url.attachmentId === card.cover.idAttachment
    )?.url || '';

    const isCardOnShift =
      isDoneOnCurrentShift.find(
        (shiftAnimal) => shiftAnimal.animalTrelloId === card.id
      )?.done || false;

    card.isDone = currentShiftId ? isCardOnShift : false;
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
