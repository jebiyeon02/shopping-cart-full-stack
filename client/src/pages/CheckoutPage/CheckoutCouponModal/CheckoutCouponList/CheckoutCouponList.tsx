import type { CheckoutContent } from "../../../../domain/checkout/checkout.api";
import type { CheckoutCoupon } from "../../../../domain/coupon/coupon.api";
import CheckoutCouponRow from "./CheckoutCouponRow";

const CheckoutCouponList = ({
  coupons,
  selectedCouponIds,
}: {
  coupons: CheckoutCoupon[];
  selectedCouponIds: CheckoutContent["appliedCouponIds"];
}) => {
  return (
    <div>
      <div>쿠폰은 최대 2개까지 사용할 수 있습니다.</div>
      {coupons.map((coupon) => (
        <CheckoutCouponRow
          coupon={coupon}
          selectedCouponIds={selectedCouponIds}
        />
      ))}
    </div>
  );
};

export default CheckoutCouponList;
