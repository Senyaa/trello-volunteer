import { Card } from "../types/Card";

export const isAnimal = (description: string): boolean => {
  const isFromTemplate = new RegExp(/❗ UWAGA:*/g);
  return Boolean(description.match(isFromTemplate));
};

export const catRooms: { name: string; id: string }[] = (
  process.env.NEXT_PUBLIC_CATS_PLACES || ""
)
  .toString()
  .split(",")
  .map((catroom: string) => {
    const [name, id] = catroom.split("-");
    return { name, id };
  });

export const isOnCatList = (idList: string): boolean => {
  return Boolean(catRooms.map((room) => room.id).includes(idList));
};

export const isTemplate = (name: string) => {
  const templateName = "❗Nowy kot - szablon (skopiuj kartę)❗";
  return Boolean(name === templateName);
};

export const filterCats = (cards: Card[]) => {
  return cards
    .filter((card) => !isTemplate(card.name))
    .filter((card) => isAnimal(card.desc))
    .filter((animal) => isOnCatList(animal.idList));
};
