import { redirect } from "next/navigation";

export const fetcher = async (input: URL | RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response.json();
  }
  
  if (response.statusText.includes("Unauthorized")) {
    redirect("/access-denied?boardAccess=false");
  }
  throw new Error(response.statusText);
};
