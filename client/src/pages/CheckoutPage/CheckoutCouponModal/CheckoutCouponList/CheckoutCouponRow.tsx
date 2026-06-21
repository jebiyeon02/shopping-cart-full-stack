import type { CheckoutCoupon } from "../../../../domain/coupon/coupon.api";
import { formatCouponUsageConditions } from "../../../../domain/coupon/coupon.util";

const CheckoutCouponRow = ({
  coupon,
  selectedCouponIds,
  onSelectCoupon,
}: {
  coupon: CheckoutCoupon;
  selectedCouponIds: number[];
  onSelectCoupon: (couponId: number, nextSelect: boolean) => void;
}) => {
  const { id, name, expiryDate, minAmount, startTime, endTime, isAvailable } =
    coupon;
  const isSelected = selectedCouponIds.includes(id);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectCoupon(id, e.target.checked)}
        />
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
        {isAvailable && "사용가능"}
      </span>
    </div>
  );
};

export default CheckoutCouponRow;
