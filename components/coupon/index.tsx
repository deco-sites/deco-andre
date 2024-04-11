export interface Props {
  title: string;
  description?: string;
}

export const Coupon = ({ title, description }: Props) => (
  <section>
    <p>Use o cupom: {title}</p>
    {!!description && <p>{description}</p>}
  </section>
);
