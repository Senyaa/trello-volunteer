import { drizzle } from "@/drizzle/drizzle";
import { account, user as dbUser } from "@/drizzle/drizzleSchema";
import { eq } from "drizzle-orm";

export const getToken = async (trelloId: string) => {
  const user = await drizzle.query.user.findFirst({
    where: eq(dbUser.trelloId, trelloId),
    with: { account: true }
  });
 
  return user?.account?.oauthToken || "";
};
