import { useState } from "react";
import CheckoutItemList from "./CheckoutItemList/CheckoutItemList";
import CheckoutCouponApplyButton from "./CheckoutCouponApplyButton";
import CheckoutPaymentSummary from "./CheckoutPaymentSummary";

import CheckoutCouponModal from "./CheckoutCouponModal/CheckoutCouponModal";

import { useParams } from "react-router-dom";
import { useCheckoutContent } from "./CheckoutItemList/useCheckoutContent";

const CheckoutPage = () => {
  const { checkoutId } = useParams();
  // TODO: checkoutId가 존재하지 않을 때 분기처리 필요
  const {
    checkoutContent,
    requestUpdateCheckoutRemoteArea,
    remoteAreaAsyncState,
  } = useCheckoutContent(Number(checkoutId));

  const [isCheckoutCouponModalOpen, setIsCheckoutCouponModalOpen] =
    useState(false);
  const [remoteAreaChecked, setRemoteAreaChecked] = useState(false);

  if (!checkoutContent) return "로딩중...";
  const { checkoutItems } = checkoutContent;

  return (
    <div>
      <div>주문 확인</div>
      <div>{`총 ${checkoutItems.length}종류의 상품 n개를 주문합니다. 최종 결제금액을 확인해 주세요.`}</div>
      <CheckoutItemList checkoutItems={checkoutItems} />
      <CheckoutCouponApplyButton />
      <label>
        <input
          type="checkbox"
          checked={remoteAreaChecked}
          disabled={remoteAreaAsyncState.status === "loading"}
          onChange={(e) =>
            requestUpdateCheckoutRemoteArea(e.target.checked, {
              onSuccess: ({ remoteArea: updatedRemoteArea }) =>
                setRemoteAreaChecked(updatedRemoteArea),
              onFail: (error) => alert(error.message),
              showLoading: true,
            })
          }
        />
        제주도 및 도서 산간 지역
      </label>
      <CheckoutPaymentSummary />

      <CheckoutCouponModal
        isCheckoutCouponModalOpen={isCheckoutCouponModalOpen}
        onCloseModal={() => {}}
      />
    </div>
  );
};

export default CheckoutPage;
