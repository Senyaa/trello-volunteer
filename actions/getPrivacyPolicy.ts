"use server";

import prisma from "@/lib/prisma";

export async function getPrivacyPolicy() {
  const privacyPolicy = await prisma.documents.findFirst({
    where: {
      name: "privacy-policy",
    },
    select: { content: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return privacyPolicy?.content;
}
