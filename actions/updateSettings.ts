"use server";

import { SettingsFormType } from "@/app/(site)/protected/settings/SettingsForm";
import { revalidatePath } from "next/cache";
import { drizzle } from "@/drizzle/drizzle";
import { settings } from "@/drizzle/drizzleSchema";
import getCurrentShiftIdOrThrow from "./services/getCurrentUserIdOrThrow";

export async function updateSettings(formData: SettingsFormType) {
  const userId = await getCurrentShiftIdOrThrow();

  await drizzle
    .insert(settings)
    .values({ userId, ...formData })
    .onConflictDoUpdate({
      target: [settings.userId],
      set: formData,
    });
  
  revalidatePath("/protected/animals/[slug]", "page");

  return formData;
}
