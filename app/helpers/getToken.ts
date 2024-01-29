import prisma from "@/lib/prisma";

export const getToken = async (trelloId: string) => {
  const user = await prisma.user.findFirst({ where: { trelloId: trelloId } });
  const account = await prisma.account.findFirst({
    where: { userId: user?.id },
  });
  return account?.oauth_token || "";
};
