export interface Return {
  total_likes: number;
}

export default async function get_total_likes(
  _props: unknown,
  _req: Request,
  _ctx: unknown,
): Promise<Return> {
  const response = await fetch("https://camp-api.deco.cx/events/", {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "teste123",
      "x-api-token": "deco-andre",
    },
    credentials: "include",
  });

  if (!response.ok) {
    return { total_likes: 0 };
  }

  const data = await response.json();

  return { total_likes: data.total };
}
