import { useEffect, useState } from "react";
import {
  getCheckoutCoupons,
  type CheckoutCoupon,
  type CheckoutCouponResponse,
} from "../../../domain/coupon/coupon.api";
import useAsyncTask from "../../../shared/useAsyncTask";
import type { CheckoutContent } from "../../../domain/checkout/checkout.api";

const useCheckoutCoupon = (checkoutId: number) => {
  const { asyncState, executeAsyncFunction } =
    useAsyncTask<CheckoutCouponResponse>();

  const [coupons, setCoupons] = useState<CheckoutCoupon[] | null>(null);
  let recommendedCouponIds: CheckoutContent["appliedCouponIds"] | null = null; // 렌더링용은 아니기 때문에 state로 쓰지 않았음.

  useEffect(() => {
    executeAsyncFunction({
      asyncFunction: () => getCheckoutCoupons(checkoutId),
      options: {
        onSuccess: ({
          coupons: fetchedCoupons,
          recommendedCouponIds: fetchedrecommendedCouponIds,
        }) => {
          setCoupons(fetchedCoupons);
          recommendedCouponIds = fetchedrecommendedCouponIds;
        },
        onFail: (error) => alert(error.message),
      },
    });
  }, [executeAsyncFunction]);

  return { coupons, recommendedCouponIds };
};

export default useCheckoutCoupon;
