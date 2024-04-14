import type { Product } from "apps/commerce/types.ts";
import Slider from "deco-sites/deco-andre/components/ui/Slider.tsx";
import SliderJS from "deco-sites/deco-andre/islands/SliderJS.tsx";
import Icon from "deco-sites/deco-andre/components/ui/Icon.tsx";
import { clx } from "deco-sites/deco-andre/sdk/clx.ts";
import { useId } from "deco-sites/deco-andre/sdk/useId.ts";

export interface Props {
  title: string;
  products: Product[] | null;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <article class="w-full flex flex-col justify-center items-center md lg:gap-8 lg:flex-row">
      {product?.isVariantOf?.image && (
        <img
          class="object-contain mb-5 lg:mb-0"
          width={200}
          height={200}
          src={product?.isVariantOf?.image[0]?.url}
          alt={product?.isVariantOf?.name}
        />
      )}

      <div>
        <h3 class="text-2xl">{product?.isVariantOf?.name}</h3>
        <p>{product?.isVariantOf?.description}</p>
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
    </article>
  );
};

export default function HorizontalProductCard({ title, products }: Props) {
  const id = useId();

  return (
    <section
      id={id}
      class="w-full flex flex-col justify-center gap-8 px-8 py-10"
    >
      <div class="w-full flex justify-between items-center">
        <h3 class="text-2xl">{title}</h3>

        <div class="flex items-center gap-8">
          <Slider.PrevButton class="w-12 h-12 flex justify-center items-center">
            <Icon
              size={36}
              id="ChevronRight"
              strokeWidth={3}
              class="w-8 h-8 rotate-180"
            />
          </Slider.PrevButton>

          <Slider.NextButton class="w-12 h-12 flex justify-center items-center">
            <Icon size={36} id="ChevronRight" strokeWidth={3} class="w-8 h-8" />
          </Slider.NextButton>
        </div>
      </div>

      <Slider class="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5">
        {products?.map((product, index) => (
          <Slider.Item
            index={index}
            class={clx(
              "carousel-item",
              "md:w-full",
              "w-full",
            )}
          >
            <ProductItem product={product} />
          </Slider.Item>
        ))}
      </Slider>
      <SliderJS rootId={id} infinite />
    </section>
  );
}
