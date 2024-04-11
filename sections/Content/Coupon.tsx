export interface Props {
  title: string;
  description?: string;
}

export default function Coupon({ title, description }: Props) {
  return (
    <section className="w-full flex justify-center flex-col">
      <p className="text-center">Use o cupom: {title}</p>
      {!!description && <p>{description}</p>}
    </section>
  );
}
