import type { CheckoutItem } from "../../../domain/checkout/checkout.api";
import type { CheckoutCoupon } from "../../../domain/coupon/coupon.api";
import {
  getFilteredCoupon,
  getTotalCouponDiscountPrice,
} from "../../../domain/coupon/coupon.util";

const CheckoutCouponUseButton = ({
  coupons,
  selectedCouponIds,
  checkoutItems,
  orderPrice,
  deliveryFee,
}: {
  coupons: CheckoutCoupon[];
  selectedCouponIds: number[];
  checkoutItems: CheckoutItem[];
  orderPrice: number;
  deliveryFee: number;
}) => {
  const selectedCoupons = getFilteredCoupon(coupons, selectedCouponIds);

  const totalCouponDiscountPrice = getTotalCouponDiscountPrice({
    selectedCoupons,
    checkoutItems,
    orderPrice,
    deliveryFee,
  });

  return <button>총 {totalCouponDiscountPrice}원 할인 쿠폰 사용하기</button>;
};

export default CheckoutCouponUseButton;
