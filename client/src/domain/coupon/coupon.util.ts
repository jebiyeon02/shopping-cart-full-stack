import type { CheckoutContent } from "../checkout/checkout.api";
import type { CheckoutCoupon } from "./coupon.api";

export const formatCouponUsageConditions = ({
  minAmount,
  startTime,
  endTime,
}: Pick<CheckoutCoupon, "minAmount" | "startTime" | "endTime">) => {
  const formattedConditions = [];
  if (minAmount) {
    formattedConditions.push(`최소 주문 금액:${minAmount}원`);
  }
  if (startTime && endTime) {
    formattedConditions.push(`사용 가능 시간: ${startTime}부터 ${endTime}까지`);
  }

  return formattedConditions;
};

export const getFilteredCoupon = (
  coupons: CheckoutCoupon[],
  selectedCouponIds: number[],
) => {
  return coupons.filter((coupon) => selectedCouponIds.includes(coupon.id));
};

export const getTotalCouponDiscountPrice = ({
  selectedCoupons,
  checkoutItems,
  orderPrice,
  deliveryFee,
}: { selectedCoupons: CheckoutCoupon[] } & Pick<
  CheckoutContent,
  "checkoutItems" | "orderPrice" | "deliveryFee"
>) => {
  const sortedCoupons = selectedCoupons.toSorted((a, b) => {
    if (
      getCouponDiscountType({ fixedDiscountRate: a.fixedDiscountRate }) ===
      getCouponDiscountType({ fixedDiscountRate: b.fixedDiscountRate })
    ) {
      return 0;
    }

    return getCouponDiscountType({
      fixedDiscountRate: a.fixedDiscountRate,
    }) === "fixed"
      ? -1
      : 1;
  });

  let targetPrice = orderPrice;
  let totalDiscountPrice = 0;

  sortedCoupons.forEach((coupon) => {
    const discountPrice = getDiscountAmount({
      coupon,
      checkoutItems,
      targetPrice,
      deliveryFee,
    });
    targetPrice -= discountPrice;
    totalDiscountPrice += discountPrice;
  });

  return totalDiscountPrice;
};

const getCouponDiscountType = ({
  fixedDiscountRate,
}: Pick<CheckoutCoupon, "fixedDiscountRate">): "ratio" | "fixed" => {
  if (fixedDiscountRate) {
    return "ratio";
  }

  return "fixed";
};

const getDiscountAmount = ({
  coupon,
  checkoutItems,
  targetPrice,
  deliveryFee,
}: {
  coupon: CheckoutCoupon;
  targetPrice: CheckoutContent["orderPrice"];
} & Pick<CheckoutContent, "checkoutItems" | "deliveryFee">) => {
  if (coupon.type.includes("FIXED")) {
    if (coupon.fixedDiscountPrice === null) {
      console.error("서버에서 올바른 할인금액이 설정되지 않았습니다.");
      return 0;
    }
    return coupon.fixedDiscountPrice;
  }

  if (coupon.type.includes("BOGO")) {
    const filteredPrice = checkoutItems
      .filter((item) => item.itemCount >= 3)
      .map((item) => item.price);

    if (filteredPrice.length === 0) {
      return 0;
    }

    return Math.max(...filteredPrice);
  }

  if (coupon.type.includes("FREESHIPPING")) {
    return deliveryFee;
  }

  if (coupon.type.includes("MIRACLESALE")) {
    if (coupon.fixedDiscountRate === null) {
      console.error("서버에서 올바른 할인 비율이 설정되지 않았습니다.");

      return 0;
    }

    return targetPrice * (coupon.fixedDiscountRate / 100);
  }

  return 0;
};
