import {
  type CheckoutApplyCouponResponse,
  type CheckoutItem,
} from "../../../domain/checkout/checkout.api";
import type { CheckoutCoupon } from "../../../domain/coupon/coupon.api";
import {
  getFilteredCoupon,
  getTotalCouponDiscountPrice,
} from "../../../domain/coupon/coupon.util";
import BaseButton from "../../../shared/components/BaseButton";
import {
  type AsyncState,
  type ExecuteAsyncFunctionProps,
} from "../../../shared/useAsyncTask";
import { formatPrice } from "../../../shared/utils";

// TODO: 이 컴포넌트 Modal 내부로 옮길지 말지 고민해보기
const CheckoutCouponUseButton = ({
  coupons,
  selectedCouponIds,
  checkoutItems,
  orderPrice,
  deliveryFee,
  requestUpdateCheckoutApplyCoupon,
  updateApplyCouponAsyncState,
}: {
  checkoutId: number;
  coupons: CheckoutCoupon[];
  selectedCouponIds: number[];
  checkoutItems: CheckoutItem[];
  orderPrice: number;
  deliveryFee: number;
  requestUpdateCheckoutApplyCoupon: (
    nextCouponIds: number[],
    options: ExecuteAsyncFunctionProps<CheckoutApplyCouponResponse>["options"],
  ) => Promise<void>;
  updateApplyCouponAsyncState: AsyncState<CheckoutApplyCouponResponse>;
}) => {
  const selectedCoupons = getFilteredCoupon(coupons, selectedCouponIds);

  const totalCouponDiscountPrice = getTotalCouponDiscountPrice({
    selectedCoupons,
    checkoutItems,
    orderPrice,
    deliveryFee,
  });

  const handleUseCouponButtonClick = async () => {
    await requestUpdateCheckoutApplyCoupon(selectedCouponIds, {
      onSuccess: () => {},
      onFail: (error) => alert(error.message),
      showLoading: true,
    });
  };

  return (
    <BaseButton
      disabled={updateApplyCouponAsyncState.status === "loading"}
      onClick={handleUseCouponButtonClick}
    >
      총 {formatPrice(totalCouponDiscountPrice)}원 할인 쿠폰 사용하기
    </BaseButton>
  );
};

export default CheckoutCouponUseButton;
