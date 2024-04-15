import type { Product } from "apps/commerce/types.ts";
import { Request } from "std/http/mod.ts";
import { AppContext } from "deco-sites/deco-andre/apps/site.ts";
import HorizontalProductCardItem from "deco-sites/deco-andre/sections/Product/HorizontalProductCardItem.tsx";

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

export default function HorizontalProductCard(
  {
    title,
    products,
    imageMaxSize,
    animateImage,
  }: Props,
) {
  return (
    <section class="w-full flex flex-col justify-center gap-8 px-8 py-10">
      <h3 class="text-2xl">{title}</h3>
      <div class="w-full flex flex-wrap justify-evenly items-center gap-4">
        {products?.map((product) => (
          <HorizontalProductCardItem
            product={product}
            imageMaxSize={imageMaxSize}
            animateImage={animateImage}
          />
        ))}
      </div>
    </section>
  );
}
