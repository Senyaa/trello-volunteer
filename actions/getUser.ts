"use server";

import { drizzle, drizzleSchema } from "@/drizzle/drizzle";
import { eq } from "drizzle-orm";
import getCurrentUserId from "./services/getCurrentUserId";

interface User {
  name: string | null;
  id: string;
  trelloId: string | null;
  fullName: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  boards: string[] | null;
  userType: "ADMIN" | "USER" | null;
}

const getUser = async (): Promise<User | undefined> => {
  const userID = await getCurrentUserId();
  if (!userID) return;
  const user = await drizzle.query.user.findFirst({
    where: eq(drizzleSchema.user.id, userID),
  });

  if (!user) return undefined;

  if (user.userType !== "ADMIN") {
    user.userType = "USER";
  }

  return user as User;
};

export default getUser;
