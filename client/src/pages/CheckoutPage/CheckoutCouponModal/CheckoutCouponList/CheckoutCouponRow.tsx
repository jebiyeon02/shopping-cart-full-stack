import type { CheckoutApplyCouponResponse } from "../../../../domain/checkout/checkout.api";
import type { CheckoutCoupon } from "../../../../domain/coupon/coupon.api";
import { formatCouponUsageConditions } from "../../../../domain/coupon/coupon.util";
import type { AsyncState } from "../../../../shared/useAsyncTask";

const CheckoutCouponRow = ({
  coupon,
  selectedCouponIds,
  onSelectCoupon,
  updateApplyCouponAsyncState,
}: {
  coupon: CheckoutCoupon;
  selectedCouponIds: number[];
  onSelectCoupon: (couponId: number, nextSelect: boolean) => void;
  updateApplyCouponAsyncState: AsyncState<CheckoutApplyCouponResponse>;
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
          disabled={
            updateApplyCouponAsyncState.status === "loading" || !isAvailable
          }
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
      </span>
    </div>
  );
};

export default CheckoutCouponRow;
