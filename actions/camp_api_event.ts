export interface Props {
  product_id: number;
}

export default async function camp_api_event(
  { product_id }: Props,
  _req: Request,
  _ctx: unknown,
) {
  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "teste123",
    },
    credentials: "include",
    body: JSON.stringify({ productId: String(product_id) }),
  });

  if (!response.ok) return { success: false };

  return { success: true };
}
