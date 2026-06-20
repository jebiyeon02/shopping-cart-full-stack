import type { CheckoutContent } from "../../../../domain/checkout/checkout.api";
import type { CheckoutCoupon } from "../../../../domain/coupon/coupon.api";
import { formatCouponUsageConditions } from "../../../../domain/coupon/coupon.util";

const CheckoutCouponRow = ({
  coupon,
  selectedCouponIds,
}: {
  coupon: CheckoutCoupon;
  selectedCouponIds: CheckoutContent["appliedCouponIds"];
}) => {
  const {
    name,
    type,
    expiryDate,
    fixedDiscountPrice,
    fixedDiscountRate,
    minAmount,
    startTime,
    endTime,
    isAvailable,
  } = coupon;
  return (
    <div>
      <label>
        <input type="checkbox" />
        {name},
      </label>
      <span>{expiryDate}</span>
      <br />
      <span>
        {formatCouponUsageConditions({
          minAmount,
          startTime,
          endTime,
        })}
      </span>
    </div>
  );
};

export default CheckoutCouponRow;
