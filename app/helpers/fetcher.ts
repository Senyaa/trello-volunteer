export const fetcher = async (input: URL | RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
};
