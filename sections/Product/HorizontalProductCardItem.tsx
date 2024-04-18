import type { Product } from "apps/commerce/types.ts";
import { AppContext } from "deco-sites/deco-andre/apps/site.ts";
import LikeMachine from "deco-sites/deco-andre/islands/LikeMachine.tsx";
import get_product_likes from "deco-sites/deco-andre/loaders/get_product_likes.ts";
import AddToCartButton from "deco-sites/deco-andre/islands/AddToCartButton/vtex.tsx";

interface ProductItemProps {
  product: Product;
  imageMaxSize: string;
  animateImage: boolean;
  likes?: number;
}

export async function loader(
  props: ProductItemProps,
  req: Request,
  ctx: AppContext,
) {
  const likes = await get_product_likes(
    { product_id: Number(props.product.productID) },
    req,
    ctx,
  );

  return ({ ...props, likes: likes.product_likes });
}

export default function HorizontalProductCardItem(
  { product, imageMaxSize, animateImage, likes }: ProductItemProps,
) {
  return (
    <article
      class={`w-full grid grid-cols-1 gap-2 place-items-center lg:gap-4 lg:grid-cols-[1fr_1fr_auto_auto] ${imageMaxSize}`}
    >
      {product?.isVariantOf?.image && (
        <div class="w-full h-full overflow-hidden mb-5 lg:mb-0">
          <img
            class={`w-full h-full object-contain rounded-lg transition-all duration-500 ${
              animateImage ? "hover:scale-125" : ""
            }`}
            width={200}
            height={200}
            src={product?.isVariantOf?.image[0]?.url}
            alt={product?.isVariantOf?.name}
          />
        </div>
      )}

      <div class="h-full w-full flex flex-col gap-4">
        <h3 class="text-xl w-full">{product?.isVariantOf?.name}</h3>
        <p class="w-full line-clamp-3">
          {product?.isVariantOf?.description}
        </p>
      </div>

      <div class="h-full flex flex-col justify-between">
        {product?.offers?.highPrice && (
          <p class="line-through">
            de R$ {product?.offers?.highPrice}
          </p>
        )}

        <p class="text-lg font-semibold">
          {product?.offers?.highPrice && "por "}R$ {product?.offers?.lowPrice}
        </p>

        <AddToCartButton
          seller="1"
          productID={product.sku}
          eventParams={{
            items: [{
              item_id: product.sku,
              item_name: product?.isVariantOf?.name,
              quantity: 1,
            }],
          }}
        />
      </div>

      <div class="mt-auto">
        <LikeMachine product_id={Number(product.productID)} />
      </div>
    </article>
  );
}
