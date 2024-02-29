"use server";

import getCards from "@/app/client/getCards";
import { isAnimal } from "@/app/helpers/cardFilters";
import parseTrelloIdToCreatedDate from "@/app/helpers/parseTrelloIdToCreatedDate";

const getNewAnimals = async (trelloId: string, days: number) => {
  const trelloCards = await getCards(trelloId);

  const borderDate = new Date();
  borderDate.setDate(borderDate.getDate() - days);

  const newAnimals = trelloCards
    .filter(
      (c) => isAnimal(c.desc) && borderDate < parseTrelloIdToCreatedDate(c.id)
    )
    .sort(
      (animalA, animalB) =>
        1000 * parseInt(animalB.id.substring(0, 8), 16) -
        1000 * parseInt(animalA.id.substring(0, 8), 16)
    );

  return newAnimals;
};

export default getNewAnimals;
