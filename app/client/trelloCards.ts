import { Card } from "../types/Card";
import trelloURL from "../helpers/trelloUrlParser";
import { getToken } from "../helpers/getToken";
import { fetcher } from "../helpers/fetcher";

const getCards = async (trelloId: string): Promise<Card[]> => {
  const boardId = process.env.NEXT_PUBLIC_MAIN_BOARD_ID;
  const token = await getToken(trelloId);

  return await fetcher(trelloURL(`/1/boards/${boardId}/cards`, token));
};

export default getCards;
