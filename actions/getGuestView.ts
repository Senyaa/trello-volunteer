"use server";

import { drizzle, drizzleSchema } from "@/drizzle/drizzle";
import { eq } from "drizzle-orm";

export const getGuestView = async (guestViewId: string) => {
  const foundView = await drizzle.query.guestView.findFirst({
    where: eq(drizzleSchema.guestView.id, guestViewId),
  });

  return foundView;
};
