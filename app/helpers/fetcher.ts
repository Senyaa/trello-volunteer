import { redirect } from "next/navigation";

export const fetcher = async (
  input: URL | RequestInfo,
  ignoreUnauthorized?: boolean
) => {
  const response = await fetch(input);

  if (response.ok) {
    return response.json();
  }

  if (!ignoreUnauthorized && response.statusText === "Unauthorized") {
    redirect("/access-denied?boardAccess=false");
  }

  throw new Error(response.statusText);
};
