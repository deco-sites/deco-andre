import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  title?: string;
  pagination?: number;
  images_by_pagination?: number;
  images: ImageWidget[];
}

export default function PartialImageGallery(
  {
    images,
    pagination = 1,
    images_by_pagination = 3,
    title = "Galeria de Imagens com partials",
  }: Props,
) {
  const has_more_images = images.length > pagination * images_by_pagination;

  return (
    <section class="w-full flex flex-col p-8 gap-8">
      <h2 class="text-2xl">{title}</h2>

      <ul class="w-full grid grid-cols-3 gap-4 place-items-center">
        {images.slice(0, pagination * images_by_pagination).map((image) => (
          <Image
            src={image}
            width={300}
            height={300}
            class="w-full h-full object-contain rounded-lg"
          />
        ))}
      </ul>

      {has_more_images && (
        <button
          class="btn btn-outline mt-3 rounded-lg"
          {...usePartialSection({ props: { pagination: pagination + 1 } })}
        >
          Mostrar mais imagens
        </button>
      )}
    </section>
  );
}
