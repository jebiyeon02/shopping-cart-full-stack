import { useState } from "react";
import type { CheckoutContent } from "../../../domain/checkout/checkout.api";
import CheckoutCouponList from "./CheckoutCouponList/CheckoutCouponList";
import CheckoutCouponUseButton from "./CheckoutCouponUseButton";
import useCheckoutCoupon from "./useCheckoutCoupon";

const CheckoutCouponModal = ({
  checkoutId,
  onCloseModal,
  checkoutItems,
  orderPrice,
  deliveryFee,
  updateCheckoutContent,
}: {
  checkoutId: number;
  onCloseModal: () => void;
  checkoutItems: CheckoutContent["checkoutItems"];
  orderPrice: CheckoutContent["orderPrice"];
  deliveryFee: CheckoutContent["deliveryFee"];
  updateCheckoutContent: (updateContent: Partial<CheckoutContent>) => void;
}) => {
  const {
    getCheckoutCouponAsyncState,
    requestUpdateCheckoutApplyCoupon,
    updateApplyCouponAsyncState,
  } = useCheckoutCoupon(checkoutId);
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]); // TODO: selectedCouponIds 커스텀 훅으로 분리하기, 분리 이유는 책임관점 -> 클라이언트 상태관리라는 목적!
  if (getCheckoutCouponAsyncState.status !== "success") return "쿠폰 로딩중...";
  // console.log(getCheckoutCouponAsyncState.data);
  const coupons = getCheckoutCouponAsyncState.data.coupons;

  // TODO: coupons말고 다른 네이밍 필요, ~~Response 접미사도 다른 것 고려해보기
  // TODO: 최초 1번 마운트 시 추천 쿠폰조합 적용

  const handleSelectCoupon = (couponId: number, nextSelect: boolean) => {
    if (nextSelect && selectedCouponIds.length < 2) {
      setSelectedCouponIds((prev) => [...prev, couponId]);
      return;
    }

    setSelectedCouponIds((prev) => prev.filter((id) => id !== couponId));
  };

  return (
    <div>
      <div>쿠폰을 선택해주세요</div>
      <CheckoutCouponList
        coupons={coupons}
        selectedCouponIds={selectedCouponIds}
        onSelectCoupon={handleSelectCoupon}
        updateApplyCouponAsyncState={updateApplyCouponAsyncState}
      />

      <CheckoutCouponUseButton
        checkoutId={checkoutId}
        coupons={coupons}
        selectedCouponIds={selectedCouponIds}
        checkoutItems={checkoutItems}
        orderPrice={orderPrice}
        deliveryFee={deliveryFee}
        requestUpdateCheckoutApplyCoupon={requestUpdateCheckoutApplyCoupon}
        updateApplyCouponAsyncState={updateApplyCouponAsyncState}
        onCloseModal={onCloseModal}
        updateCheckoutContent={updateCheckoutContent}
      />
    </div>
  );
};

export default CheckoutCouponModal;
