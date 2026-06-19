import { useState } from "react";
import CheckoutItemList from "./CheckoutItemList/CheckoutItemList";
import CheckoutCouponApplyButton from "./CheckoutCouponApplyButton";
import CheckoutPaymentSummary from "./CheckoutPaymentSummary";
import type { CheckoutContent } from "../../domain/checkout/checkout.api";
import CheckoutCouponModal from "./CheckoutCouponModal/CheckoutCouponModal";

const CheckoutPage = () => {
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutContent | null>(
    null,
  );
  const [isCheckoutCouponModalOpen, setIsCheckoutCouponModalOpen] =
    useState(false);

  if (!checkoutInfo) return "로딩중...";
  const { checkoutItems } = checkoutInfo;
  return (
    <div>
      <div>주문 확인</div>
      <CheckoutItemList checkoutItems={checkoutItems} />
      <CheckoutCouponApplyButton />
      <CheckoutPaymentSummary />

      <CheckoutCouponModal
        isCheckoutCouponModalOpen={isCheckoutCouponModalOpen}
        onCloseModal={() => {}}
      />
    </div>
  );
};

export default CheckoutPage;
