import { drizzle, drizzleSchema } from "@/drizzle/drizzle";

import { desc } from "drizzle-orm";

const getLinks = async () => {
  const links = await drizzle.query.link?.findMany({
    orderBy: [desc(drizzleSchema.link.createdAt)],
  });

  return links || [];
};

export default getLinks;
