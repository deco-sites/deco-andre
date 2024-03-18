/**
 * @titleBy alt
 */
export interface Props {
  code_coupon: String;
  /**
   * @description Código do cupom
   */
  description: String;
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
