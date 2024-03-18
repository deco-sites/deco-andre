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

function Coupon(props: Props) {
  return (
    <section>
      <p>
        Código do cupom: <strong>{props.code_coupon}</strong>
      </p>
      <p>{props.description}</p>
    </section>
  );
}
