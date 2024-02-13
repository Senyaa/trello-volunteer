import { drizzle } from "@/drizzle/drizzle";
import { accounts, users } from "@/drizzle/drizzleSchema";
import { eq } from "drizzle-orm";

export const getToken = async (trelloId: string) => {
  const user = await drizzle.query.users.findFirst({
    where: eq(users.trelloId, trelloId),
  });
  const accountReturned = await drizzle.query.accounts.findFirst({
    where:  eq(accounts.userId, user?.id || '') ,
  });
 
  return accountReturned?.oauth_token || "";
};
