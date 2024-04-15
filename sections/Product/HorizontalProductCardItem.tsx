import type { Product } from "apps/commerce/types.ts";
import { AppContext } from "deco-sites/deco-andre/apps/site.ts";
import LikeMachine from "deco-sites/deco-andre/islands/LikeMachine.tsx";
import get_product_likes from "deco-sites/deco-andre/loaders/get_product_likes.ts";

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

  console.log([props.product.productID, likes]);

  return ({ ...props, likes: likes.product_likes });
}

export default function HorizontalProductCardItem(
  { product, imageMaxSize, animateImage, likes }: ProductItemProps,
) {
  return (
    <article
      class={`w-full grid grid-cols-1 place-items-center lg:gap-4 lg:grid-cols-[1fr_1fr_auto] ${imageMaxSize}`}
    >
      {product?.isVariantOf?.image && (
        <div class="w-full h-full overflow-hidden mb-5 lg:mb-0">
          <img
            class={`w-full h-full object-contain transition-all duration-500 ${
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
        <p class="w-full line-clamp-4">
          {product?.isVariantOf?.description}
        </p>
      </div>

      <div>
        {product?.offers?.highPrice && (
          <p>
            de R$ {product?.offers?.highPrice}
          </p>
        )}

        <p>
          {product?.offers?.highPrice && "por "}R$ {product?.offers?.lowPrice}
        </p>

        <button type="button" class="btn btn-outline  mt-3">
          Comprar
        </button>
      </div>

      <LikeMachine product_id={Number(product.productID)} />
    </article>
  );
}
