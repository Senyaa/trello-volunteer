"use server";
import { Card } from "../app/types/Card";
import { getToken } from "@/app/helpers/getToken";
import { fetcher } from "@/app/helpers/fetcher";
import trelloURL from "@/app/helpers/trelloUrlParser";
import { getServerSession } from "@/lib/getSession";

export const getAnimalByCardId = async (animalId: string): Promise<Card> => {
  const boardId = process.env.NEXT_PUBLIC_MAIN_BOARD_ID;
  const session = await getServerSession();
  const trelloId = session?.user?.trelloId || "";
  const token = await getToken(trelloId);

  const card = await fetcher(
    trelloURL(`/1/boards/${boardId}/cards/${animalId}`, token)
  );
  return card;
};
