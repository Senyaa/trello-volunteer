import { fetcher } from "../helpers/fetcher";
import { CardCover } from "../types/Card";

const getCardCover = async (cardID: string): Promise<CardCover[]> => {
  try {
    const cardCover = await fetcher(
      `/api/images?cardId=${cardID}`
    );
    return cardCover;
  } catch (error) {
    console.error("Error fetching data");
    return [];
  }
};

export default getCardCover;
