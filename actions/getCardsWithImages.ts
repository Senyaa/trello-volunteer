import { Card } from "../app/types/Card";
import getCards from "../app/client/getCards";
import prisma from "@/lib/prisma";

export const getCardsWithImages = async (trelloId: string): Promise<Card[]> => {
  const cards = await getCards(trelloId);
  const attachmentIds = cards
    .map((card) => card.cover.idAttachment || "")
    .filter(Boolean);

  const imageUrls = await prisma.imageUrl.findMany({
    where: { attachmentId: { in: attachmentIds } },
  });

  cards.forEach(
    (card) =>
      (card.cover.url = imageUrls.find(
        (url) => url.attachmentId === card.cover.idAttachment
      )?.url)
  );

  return cards;
};
