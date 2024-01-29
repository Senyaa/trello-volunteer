import { getToken } from "@/app/helpers/getToken";
import { getServerSession } from "@/lib/getSession";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const API_KEY = process.env.NEXT_PUBLIC_TRELLO_API;

  try {
    const session = await getServerSession();
    const token = await getToken(session?.user?.trelloId || "");
    const response = await fetch(searchParams.get("url") || "", {
      headers: {
        Authorization: `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${token}"`,
      },
    }).then((response) => response.body);

    return new Response(response);
  } catch (error) {
    console.error(error);
    return new Response();
  }
}
