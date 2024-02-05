"use server";

import { SettingsFormType } from "@/app/(site)/protected/settings/SettingsForm";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import getCurrentUserId from "./services/getCurrentUserId";

export async function updateSettings(formData: SettingsFormType) {
  const userId = await getCurrentUserId()

  await prisma.settings.upsert({
    where: { userId },
    update: { ...formData, userId },
    create: { ...formData, userId },
  });
  revalidatePath("/protected/animals/[slug]", "page");

  return formData;
}
