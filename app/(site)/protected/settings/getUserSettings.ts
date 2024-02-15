import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { initialSettingsForm } from "./SettingsForm";
import { drizzle, drizzleSchema } from "@/drizzle/drizzle";
import { eq } from "drizzle-orm";

export const getUserSettings = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return initialSettingsForm;
  }

  const returnedSettings = await drizzle.query.settings.findFirst({
    where: eq(drizzleSchema.settings.userId, session?.user?.id || ""),
  });

  return returnedSettings || initialSettingsForm;
};
