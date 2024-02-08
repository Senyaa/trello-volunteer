import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { initialSettingsForm } from "./SettingsForm";

export const getUserSettings = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return initialSettingsForm;
    }

    const settings = await prisma.settings.findFirst({
      where: { user: session.user },
    });
  
   return settings || initialSettingsForm;
}