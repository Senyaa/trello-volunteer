const trelloURL = (path: string, token: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_TRELLO_API;
  return `https://api.trello.com${path}?key=${API_KEY}&token=${token}`;
};

export default trelloURL;
