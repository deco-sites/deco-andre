import type { Props as CouponProps } from "deco-sites/deco-andre/sections/Content/Coupon.tsx";
import Coupon from "deco-sites/deco-andre/sections/Content/Coupon.tsx";

export interface Props {
  title: string;
  coupon_list: CouponProps[];
}

export default function CouponList({ title, coupon_list }: Props) {
  return (
    <section className="w-full flex justify-center flex-col gap-8 px-8">
      <h3 className="w-full text-center text-2xl">{title}</h3>
      <ul className="w-full flex justify-center gap-8">
        {coupon_list.map(({ title, description }) => (
          <Coupon title={title} description={description} />
        ))}
      </ul>
    </section>
  );
}
