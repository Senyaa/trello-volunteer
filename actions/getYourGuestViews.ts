import { drizzle, drizzleSchema } from "@/drizzle/drizzle";
import { desc, eq } from "drizzle-orm";
import getCurrentUserIdOrThrow from "./services/getCurrentUserIdOrThrow";

const getYourGuestViews = async () => {
  const userId = await getCurrentUserIdOrThrow();

  const newbies = await drizzle.query.guestView.findMany({
    where: eq(drizzleSchema.guestView.userId, userId),
    orderBy: [desc(drizzleSchema.guestView.createdAt)]
  });
  return newbies;
};

export default getYourGuestViews;
