"use server";

import { SettingsFormType } from "@/app/(site)/protected/settings/SettingsForm";
import { getServerSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: SettingsFormType) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    throw new Error("Couldn't find user");
  }
  const userId = session.user.id;

  await prisma.settings.upsert({
    where: { userId },
    update: { ...formData, userId },
    create: { ...formData, userId },
  });
  revalidatePath("/protected/animals/[slug]", "page");

  return formData;
}
