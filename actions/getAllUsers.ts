"use server";

import { drizzle, drizzleSchema } from "@/drizzle/drizzle";
import { desc } from "drizzle-orm";

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

const getAllUsers = async (): Promise<any[] | undefined> => {
  const users = await drizzle.query.user.findMany({
  });


  return users as any[];
};

export default getAllUsers;
