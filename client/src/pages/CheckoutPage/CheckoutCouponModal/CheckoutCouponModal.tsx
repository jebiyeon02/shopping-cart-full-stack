import { useEffect, useRef, useState } from "react";
import type { CheckoutContent } from "../../../domain/checkout/checkout.api";
import CheckoutCouponList from "./CheckoutCouponList/CheckoutCouponList";
import CheckoutCouponUseButton from "./CheckoutCouponUseButton";
import useCheckoutCoupon from "./useCheckoutCoupon";
import { css } from "@emotion/react";

const CheckoutCouponModal = ({
  checkoutId,
  isCheckoutCouponModalOpen,
  onCloseModal,
  checkoutItems,
  orderPrice,
  deliveryFee,
  updateCheckoutContent,
}: {
  checkoutId: number;
  isCheckoutCouponModalOpen: boolean;
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

  const isCheckoutCouponModalMounted = useRef(false);

  useEffect(() => {
    if (
      getCheckoutCouponAsyncState.data &&
      !isCheckoutCouponModalMounted.current
    ) {
      setSelectedCouponIds(
        getCheckoutCouponAsyncState.data.recommendedCouponIds,
      );

      isCheckoutCouponModalMounted.current = true;
    }
  }, [getCheckoutCouponAsyncState.data, isCheckoutCouponModalMounted]);

  if (getCheckoutCouponAsyncState.status !== "success") return "쿠폰 로딩중...";

  const { coupons } = getCheckoutCouponAsyncState.data;

  const handleSelectCoupon = (couponId: number, nextSelect: boolean) => {
    if (nextSelect && selectedCouponIds.length < 2) {
      setSelectedCouponIds((prev) => [...prev, couponId]);
      return;
    }

    setSelectedCouponIds((prev) => prev.filter((id) => id !== couponId));
  };

  if (!isCheckoutCouponModalOpen) return null;

  return (
    <section
      css={css({
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      })}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          onCloseModal();
        }
      }}
    >
      <article
        css={css({
          border: "1px solid #fff",
          borderRadius: "4px",
          backgroundColor: "white",
          padding: "16px",
        })}
      >
        <div>
          <span>쿠폰을 선택해주세요</span>
          <button onClick={onCloseModal}>X</button>
        </div>
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
      </article>
    </section>
  );
};

export default CheckoutCouponModal;
