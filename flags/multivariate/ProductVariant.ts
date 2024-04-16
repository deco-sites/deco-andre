import type { Product } from "apps/commerce/types.ts";
export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";

export type ProductVariant = Product;

/**
 * @title Product Variants
 */
export default function ProductVariant(
  props: MultivariateProps<ProductVariant>,
): MultivariateFlag<ProductVariant> {
  return multivariate(props);
}
