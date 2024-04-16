import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  utm_campaign: string;
}

export default function UTM({ utm_campaign }: Props, ctx: MatchContext) {
  const { searchParams } = new URL(ctx.request.url);

  return searchParams.get("utm_campaign") === utm_campaign;
}
