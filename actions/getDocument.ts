import { drizzle, drizzleSchema } from "@/drizzle/drizzle";
import { desc, eq } from "drizzle-orm";

const getDocument = async (documentName: string) => {
  const foundDoc = await drizzle.query.document.findFirst({
    where: eq(drizzleSchema.document.name, documentName),
    orderBy: [desc(drizzleSchema.document.createdAt)],
    columns: { content: true },
  });

  return foundDoc?.content || "";
};

export default getDocument;
