import { BASE_URL, throwApiError, type ApiResponse } from "../../shared/api";
import type { CheckoutContent } from "../checkout/checkout.api";

export type CheckoutCoupon = {
  id: number;
  name: string;
  type: string;
  expiryDate: string;
  fixedDiscountPrice: number | null;
  fixedDiscountRate: number | null;
  minAmount: number | null;
  startTime: string | null;
  endTime: string | null;
  isAvailable: boolean;
};

export type CheckoutCouponResponse = {
  coupons: CheckoutCoupon[];
  recommendedCouponIds: CheckoutContent["appliedCouponIds"];
};

export const getCheckoutCoupons = async (
  checkoutId: number,
): Promise<CheckoutCouponResponse> => {
  const response = await fetch(`${BASE_URL}/checkout/${checkoutId}/coupons`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    await throwApiError(response);
  }

  const data: ApiResponse<CheckoutCouponResponse> = await response.json();
  const checkoutCouponResponse = data.result;

  return checkoutCouponResponse;
};

export const getCouponValidation = async (
  checkoutId: number,
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/checkout/${checkoutId}/coupons/validation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    await throwApiError(response);
  }
};
