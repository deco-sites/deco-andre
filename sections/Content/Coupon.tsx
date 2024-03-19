/**
 * @titleBy alt
 */
export interface Props {
  code_coupon: string;
  /**
   * @description Código do cupom
   */
  description: string;
  /**
   * @description Descrição do cupom
   */
}

export default function Coupon({ code_coupon, description }: Props) {
  return (
    <section>
      <p>
        Código do cupom: <strong>{code_coupon}</strong>
      </p>
      <p>{description}</p>
    </section>
  );
}
