import { getServerSession } from "@/lib/getSession";

const getCurrentUserId = async () => {
  const session = await getServerSession();

  return session?.user?.id;
};

export default getCurrentUserId;
