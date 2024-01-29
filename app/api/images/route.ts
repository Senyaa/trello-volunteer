import { getToken } from "@/app/helpers/getToken";
import trelloURL from "@/app/helpers/trelloUrlParser";
import { getServerSession } from "@/lib/getSession";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  try {
    const session = await getServerSession();
    const cardId = searchParams.get("cardId") || "";
    const trelloId = session?.user?.trelloId || "";
    if (!cardId) {
      throw Error("Missing value: cardId");
    }
    if (!trelloId) {
      throw Error("Missing value: trelloId");
    }

    const token = await getToken(trelloId);
    const response = await fetch(
      trelloURL(`/1/cards/${cardId}/attachments`, token)
    ).then((response) => response.body);

    return new Response(response);
  } catch (error) {
    console.error(error);
    return new Response();
  }
}
