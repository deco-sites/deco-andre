export interface Props {
  product_id: number;
}

export interface Return {
  product_likes: number;
}

export default async function get_product_likes(
  { product_id }: Props,
  _req: Request,
  _ctx: unknown,
): Promise<Return> {
  const response = await fetch(
    "https://camp-api.deco.cx/event/" + product_id,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "teste123",
      },
      credentials: "include",
    },
  );

  if (!response.ok) return { product_likes: 0 };

  const data = await response.json();

  return { product_likes: data.product };
}
