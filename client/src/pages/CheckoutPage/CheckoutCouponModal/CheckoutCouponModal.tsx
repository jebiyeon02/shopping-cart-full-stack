import { useState } from "react";
import type { CheckoutContent } from "../../../domain/checkout/checkout.api";
import type { CheckoutCoupon } from "../../../domain/coupon/coupon.api";
import CheckoutCouponList from "./CheckoutCouponList/CheckoutCouponList";
import CheckoutCouponUseButton from "./CheckoutCouponUseButton";

const CheckoutCouponModal = ({
  isCheckoutCouponModalOpen,
  onCloseModal,
}: {
  isCheckoutCouponModalOpen: boolean;
  onCloseModal: () => void;
}) => {
  const [coupons, setCoupons] = useState<CheckoutCoupon[] | null>(null);
  if (!coupons) return "쿠폰 로딩중...";
  // TODO: coupons말고 다른 네이밍 필요, ~~Response 접미사도 다른 것 고려해보기
  // TODO: 최초 1번 마운트 시 추천 쿠폰조합 적용
  const [selectedCouponIds, setSelectedCouponIds] = useState<
    CheckoutContent["appliedCouponIds"]
  >([]);
  return (
    <div>
      <div>쿠폰을 선택해주세요</div>
      <CheckoutCouponList
        coupons={coupons}
        selectedCouponIds={selectedCouponIds}
      />

      <CheckoutCouponUseButton />
    </div>
  );
};

export default CheckoutCouponModal;
