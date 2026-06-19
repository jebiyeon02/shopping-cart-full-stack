import type { CheckoutContent } from "../../../../domain/checkout/checkout.api";
import type { CheckoutCoupon } from "../../../../domain/coupon/coupon.api";

const CheckoutCouponRow = ({
  coupon,
  selectedCouponIds,
}: {
  coupon: CheckoutCoupon;
  selectedCouponIds: CheckoutContent["appliedCouponIds"];
}) => {
  return <div>쿠폰 아이템 row # </div>;
};

export default CheckoutCouponRow;
