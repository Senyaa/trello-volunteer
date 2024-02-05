import { fetcher } from "../helpers/fetcher";
import { CardCover } from "../types/Card";

const getCardCover = async (
  cardID: string,
  attachmentId = ""
): Promise<CardCover[]> => {
  try {
    const cardCover = await fetcher(
      `/api/images?cardId=${cardID}&attachmentId=${attachmentId}`
    );

    return cardCover;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export default getCardCover;
