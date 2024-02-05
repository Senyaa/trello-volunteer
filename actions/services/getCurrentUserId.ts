import { getServerSession } from "@/lib/getSession";

const getCurrentUserId = async () => {
    const session = await getServerSession();

  if (!session?.user?.id) {
    throw new Error("Couldn't find user");
  }
  return session.user.id;
}

export default getCurrentUserId;