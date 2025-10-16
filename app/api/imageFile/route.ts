import { getToken } from "@/app/helpers/getToken";
import { drizzle } from "@/drizzle/drizzle";
import { imageUrl } from "@/drizzle/drizzleSchema";
import { getServerSession } from "@/lib/getSession";
import cloudinary from "cloudinary";
import { eq } from "drizzle-orm";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const API_KEY = process.env.NEXT_PUBLIC_TRELLO_API;
  const url = String(searchParams.get("url"));

  try {
    const session = await getServerSession();
    const token = await getToken(session?.user?.trelloId || "");
    const rawResponse = await fetch(url, {
      headers: {
        Authorization: `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${token}"`,
      },
    });

    try {
      const file = await rawResponse.clone().arrayBuffer();
      const imageAsBase64 = Buffer.from(file).toString("base64");

      const previewId = url.match(/previews\/(\w+)/)?.[1];
      const attachmentId = url.match(/attachments\/(\w+)/)?.[1];

      if (previewId && attachmentId) {
        const imageString = `data:image/${url
          ?.split(".")
          .at(-1)};base64,${imageAsBase64}`;

        const uploadedImage = await cloudinary.v2.uploader.upload(imageString, {
          public_id: previewId,
        });

        await drizzle
          .update(imageUrl)
          .set({ url: uploadedImage.url })
          .where(eq(imageUrl.attachmentId, attachmentId))
          .execute();
      }
    } catch (err) {
      console.error(err);
    }

    return new Response(rawResponse.body);
  } catch (error) {
    console.error(error);
    return new Response();
  }
}
