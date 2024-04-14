import type { Product } from "apps/commerce/types.ts";
import { Request } from "std/http/mod.ts";
import { AppContext } from "deco-sites/deco-andre/apps/site.ts";
import LikeMachine from "deco-sites/deco-andre/islands/LikeMachine.tsx";

export interface Props {
  title: string;
  animateImage: boolean;
  imageMaxSize:
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
  products: Product[] | null;
}

interface ProductItemProps {
  product: Product;
  imageMaxSize: string;
  animateImage: boolean;
}

export function ErrorFallback({ error }: { error?: Error }) {
  return (
    <section class="w-full flex flex-col p-8 justify-center items-center md lg:gap-8 lg:flex-row">
      <img
        class="object-contain mb-5 lg:mb-0"
        width={400}
        height={400}
        src="https://10festivalcururusiriri.files.wordpress.com/2011/10/incluart_reduzida3.jpg"
        alt="Siriri cuiabano"
      />

      <div>
        <h3 class="text-2xl">Traje de Siriri Cuiabano</h3>
        <p>Roupa tradicional para dançar Siriri</p>
      </div>

      <div>
        <p>de R$ 250,00</p>
        <p>por R$ 225</p>

        <a class="link mt-4 block" href="/cultura">Para saber mais</a>
      </div>
    </section>
  );
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  if (!props.products || props.products.length === 0) {
    return {
      ...props,
      title: "Carregando",
      products: [{
        sku: "1234",
        "@type": "Product",
        brand: { "@type": "Brand" },
        offers: {
          "@type": "AggregateOffer",
          offers: [],
          lowPrice: 0,
          highPrice: 0,
          offerCount: 2,
        },
        review: [],
        productID: "123",
        questions: [],
        isRelatedTo: [],
        isSimilarTo: [],
        isVariantOf: {
          name: "Carregando...",
          "@type": "ProductGroup",
          image: [{ url: "https://placehold.co/200x200" }],
          hasVariant: [],
          description: "Carregando...",
          productGroupID: "1",
          additionalProperty: [],
        },
        aggregateRating: { "@type": "AggregateRating" },
        additionalProperty: [],
        isAccessoryOrSparePartFor: [],
      }],
    };
  }

  return props;
}

function ProductItem(
  { product, imageMaxSize, animateImage }: ProductItemProps,
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

      <LikeMachine />
    </article>
  );
}

export default function HorizontalProductCard(
  { title, products, imageMaxSize, animateImage }: Props,
) {
  return (
    <section class="w-full flex flex-col justify-center gap-8 px-8 py-10">
      <h3 class="text-2xl">{title}</h3>
      <div class="w-full flex flex-wrap justify-evenly items-center gap-4">
        {products?.map((product) => (
          <ProductItem
            product={product}
            imageMaxSize={imageMaxSize}
            animateImage={animateImage}
          />
        ))}
      </div>
    </section>
  );
}
