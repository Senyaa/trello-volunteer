import { getToken } from "@/app/helpers/getToken";
import trelloURL from "@/app/helpers/trelloUrlParser";
import { CardCover } from "@/app/types/Card";
import { getServerSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  try {
    const session = await getServerSession();
    const cardId = searchParams.get("cardId") || "";
    const attachmentId = searchParams.get("attachmentId") || "";
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
    );

    const responseData = await response.json();


    await cacheImageUrl(responseData, attachmentId);

    return new Response(JSON.stringify(responseData));
  } catch (error) {
    console.error(error);
    return new Response();
  }
}

const cacheImageUrl = async (responseData: CardCover[], attachmentId: string) => {
  const attachment = responseData.find((i) => i.id === attachmentId);
  const url = attachment?.previews.find(p => p.width === 300 && p.scaled)?.url;

  console.log(JSON.stringify(responseData));

  if (attachment) {
    const data = {
      attachmentId,
      url: url || attachment.url,
      createdAt: attachment.date,
    };

    await prisma.imageUrl.upsert({
      where: { attachmentId },
      update: data,
      create: data,
    });
  }
};
