import { Card } from "../types/Card";

export const isAnimal = (description: string): boolean => {
  const isFromTemplate = new RegExp(/🏠 Status:/g);
  return Boolean(description.match(isFromTemplate));
};

export const catRooms: { name: string; id: string }[] = (
  process.env.NEXT_PUBLIC_CATS_PLACES || ""
)
  .toString()
  .split(",")
  .map((catroom: string) => {
    const [name, id] = catroom?.split("-");
    return { name, id };
  });

export const dogRooms: { name: string; id: string }[] = (
  process.env.NEXT_PUBLIC_DOGS_PLACES || ""
)
  .toString()
  .split(",")
  .map((dogroom: string) => {
    const [name, id] = dogroom?.split("-");
    return { name, id };
  });

export const isOnCatList = (idList: string): boolean => {
  return Boolean(catRooms.map((room) => room.id).includes(idList));
};

export const isOnDogList = (idList: string): boolean => {
  return Boolean(dogRooms.map((room) => room.id).includes(idList));
};

export const isTemplate = (name: string) => {
  const templates = ["❗Nowy kot - szablon (skopiuj kartę)❗", "Nowy pies - szablon", "Karta do kopiowania dla nowego kota"];
  return Boolean(templates.includes(name));
};

export const filterCats = (cards: Card[]) => {
  return cards
    .filter((card) => !isTemplate(card.name))
    .filter((card) => isAnimal(card.desc))
    .filter((animal) => isOnCatList(animal.idList));
};

export const filterDogs = (cards: Card[]) => {
  return cards
    .filter((card) => !isTemplate(card.name))
    .filter((card) => isAnimal(card.desc))
    .filter((animal) => isOnDogList(animal.idList));
};
