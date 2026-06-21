import { useState } from "react";
import CheckoutItemList from "./CheckoutItemList/CheckoutItemList";
import CheckoutPaymentSummary from "./CheckoutPaymentSummary";

import CheckoutCouponModal from "./CheckoutCouponModal/CheckoutCouponModal";

import { useNavigate, useParams } from "react-router-dom";
import { useCheckoutContent } from "./useCheckoutContent";
import BaseButton from "../../shared/components/BaseButton";
import useAsyncTask from "../../shared/useAsyncTask";
import { getCouponValidation } from "../../domain/coupon/coupon.api";
import { getCheckoutAllItemCount } from "../../domain/checkout/checkout.util";
import { typography } from "../../shared/styles/typography";
import Header from "../../shared/components/Header";
import BaseCheckBox from "../../shared/components/BaseCheckBox";
import { css } from "@emotion/react";

const CheckoutPage = () => {
  const { checkoutId } = useParams();
  if (!checkoutId) return "잘못된 접근입니다.";
  const navigate = useNavigate();
  const {
    getCheckoutContentAsyncState,
    requestUpdateCheckoutRemoteArea,
    remoteAreaAsyncState,
    updateCheckoutContent,
  } = useCheckoutContent(Number(checkoutId));
  const {
    asyncState: requestPaymentAsyncState,
    executeAsyncFunction: executePayment,
  } = useAsyncTask<void>();

  const [isCheckoutCouponModalOpen, setIsCheckoutCouponModalOpen] =
    useState(false);

  const checkoutContent = getCheckoutContentAsyncState.data;

  if (!checkoutContent) return "로딩중...";
  const {
    checkoutItems,
    remoteArea,
    orderPrice,
    deliveryFee,
    couponDiscountPrice,
    totalPrice,
  } = checkoutContent;

  const handlePaymentButtonClick = async () => {
    await executePayment({
      asyncFunction: () => getCouponValidation(Number(checkoutId)),
      options: {
        onSuccess: () => {
          navigate("/order-complete", {
            state: {
              checkoutItems,
              totalPrice,
            },
          });
        },
        onFail: (error) => alert(error.message),
        showLoading: true,
      },
    });
  };

  return (
    <div
      css={css({
        position: "relative",
      })}
    >
      <Header actionIcon={<div>뒤로가기</div>} />
      <div css={typography.titleLarge}>주문 확인</div>
      <div>{`총 ${checkoutItems.length}종류의 상품 ${getCheckoutAllItemCount(checkoutItems)}개를 주문합니다.`}</div>
      <div>최종 결제금액을 확인해 주세요.</div>
      <CheckoutItemList checkoutItems={checkoutItems} />
      <BaseButton onClick={() => setIsCheckoutCouponModalOpen(true)}>
        쿠폰 적용
      </BaseButton>
      <div css={typography.titleMedium}>배송 정보</div>
      <label>
        <BaseCheckBox
          isSelected={remoteArea}
          disabled={remoteAreaAsyncState.status === "loading"}
          onSelect={(nextSelect) =>
            requestUpdateCheckoutRemoteArea(nextSelect, {
              onSuccess: ({
                remoteArea,
                couponDiscountPrice,
                deliveryFee,
                totalPrice,
              }) =>
                updateCheckoutContent({
                  remoteArea,
                  couponDiscountPrice,
                  deliveryFee,
                  totalPrice,
                }),
              onFail: (error) => alert(error.message),
              showLoading: true,
            })
          }
        />
        제주도 및 도서 산간 지역
      </label>
      <CheckoutPaymentSummary
        orderPrice={orderPrice}
        couponDiscountPrice={couponDiscountPrice}
        deliveryFee={deliveryFee}
        totalPrice={totalPrice}
      />

      <BaseButton
        onClick={handlePaymentButtonClick}
        disabled={requestPaymentAsyncState.status === "loading"}
      >
        결제하기
      </BaseButton>

      <CheckoutCouponModal
        checkoutId={Number(checkoutId)}
        isCheckoutCouponModalOpen={isCheckoutCouponModalOpen}
        onCloseModal={() => setIsCheckoutCouponModalOpen(false)}
        checkoutItems={checkoutItems}
        orderPrice={orderPrice}
        deliveryFee={deliveryFee}
        updateCheckoutContent={updateCheckoutContent}
      />
    </div>
  );
};

export default CheckoutPage;
