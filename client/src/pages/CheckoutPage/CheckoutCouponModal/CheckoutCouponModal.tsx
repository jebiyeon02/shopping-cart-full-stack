import { useState } from "react";
import type { CheckoutContent } from "../../../domain/checkout/checkout.api";
import CheckoutCouponList from "./CheckoutCouponList/CheckoutCouponList";
import CheckoutCouponUseButton from "./CheckoutCouponUseButton";
import useCheckoutCoupon from "./useCheckoutCoupon";
import {
  getFilteredCoupon,
  getTotalCouponDiscountPrice,
} from "../../../domain/coupon/coupon.util";

const CheckoutCouponModal = ({
  checkoutId,
  isCheckoutCouponModalOpen,
  onCloseModal,
  checkoutItems,
  orderPrice,
  deliveryFee,
}: {
  checkoutId: number;
  isCheckoutCouponModalOpen: boolean;
  onCloseModal: () => void;
  checkoutItems: CheckoutContent["checkoutItems"];
  orderPrice: CheckoutContent["orderPrice"];
  deliveryFee: CheckoutContent["deliveryFee"];
}) => {
  const { coupons, recommendedCouponIds } = useCheckoutCoupon(checkoutId);
  const [selectedCouponIds, setSelectedCouponIds] = useState<
    CheckoutContent["appliedCouponIds"]
  >([]);
  if (!coupons) return "쿠폰 로딩중...";
  const selectedCoupons = getFilteredCoupon(coupons, selectedCouponIds);

  // TODO: coupons말고 다른 네이밍 필요, ~~Response 접미사도 다른 것 고려해보기
  // TODO: 최초 1번 마운트 시 추천 쿠폰조합 적용

  return (
    <div>
      <div>쿠폰을 선택해주세요</div>
      <CheckoutCouponList
        coupons={coupons}
        selectedCouponIds={selectedCouponIds}
      />

      {getTotalCouponDiscountPrice({
        selectedCoupons,
        checkoutItems,
        orderPrice,
        deliveryFee,
      })}

      <CheckoutCouponUseButton />
    </div>
  );
};

export default CheckoutCouponModal;
