import type { CheckoutApplyCouponResponse } from "../../../../domain/checkout/checkout.api";
import type { CheckoutCoupon } from "../../../../domain/coupon/coupon.api";
import List from "../../../../shared/components/Layout/List";
import type { AsyncState } from "../../../../shared/useAsyncTask";
import CheckoutCouponRow from "./CheckoutCouponRow";

const CheckoutCouponList = ({
  coupons,
  selectedCouponIds,
  onSelectCoupon,
  updateApplyCouponAsyncState,
}: {
  coupons: CheckoutCoupon[];
  selectedCouponIds: number[];
  onSelectCoupon: (couponId: number, nextSelect: boolean) => void;
  updateApplyCouponAsyncState: AsyncState<CheckoutApplyCouponResponse>;
}) => {
  return (
    <List gap="8px">
      <div>쿠폰은 최대 2개까지 사용할 수 있습니다.</div>
      {coupons.map((coupon) => (
        <CheckoutCouponRow
          key={coupon.id}
          coupon={coupon}
          selectedCouponIds={selectedCouponIds}
          onSelectCoupon={onSelectCoupon}
          updateApplyCouponAsyncState={updateApplyCouponAsyncState}
        />
      ))}
    </List>
  );
};

export default CheckoutCouponList;
