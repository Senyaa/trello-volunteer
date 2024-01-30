import { fetcher } from "@/app/helpers/fetcher";
import { getToken } from "@/app/helpers/getToken";
import trelloURL from "@/app/helpers/trelloUrlParser";
import { getServerSession } from "@/lib/getSession";

export async function GET(request: Request): Promise<Response> {
    const boardId = process.env.NEXT_PUBLIC_MAIN_BOARD_ID;
  try {
    const session = await getServerSession();
    const trelloId = session?.user?.trelloId || "";

    if (!trelloId) {
      throw Error("Missing value: trelloId");
    }

    const token = await getToken(trelloId);
    const response = await fetcher(
      trelloURL(`/1/boards/${boardId}/cards`, token)
    ).then((response) => response.body);

    return new Response(response);
  } catch (error) {
    console.error(error);
    return new Response();
  }
}
