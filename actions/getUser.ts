"use server";

import { drizzle, drizzleSchema } from "@/drizzle/drizzle";
import { eq } from "drizzle-orm";

const getDocument = async (userID: string) => {
  const user = await drizzle.query.user.findFirst({
    where: eq(drizzleSchema.user.id, userID),
  });

  return user;
};

export default getDocument;
