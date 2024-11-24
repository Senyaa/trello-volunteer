"use server";

import Link from "@/app/(site)/admin/links/types";
import { drizzle } from "@/drizzle/drizzle";
import { link } from "@/drizzle/drizzleSchema";

export async function addLink(label: string, url: string, id?: string) {
let linkData: Link = {label, url}

if (id && !id.includes("new")) {
 linkData = {...linkData, id}
}
 const savedLink =  await drizzle.insert(link).values(linkData)
  .onConflictDoUpdate({
    target: [link.id],
    set: { label, url },
  });

  console.log("savedLink", savedLink)

  return savedLink;
}
