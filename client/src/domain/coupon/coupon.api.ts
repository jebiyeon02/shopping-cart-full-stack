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
  startTime: number | null;
  endTime: number | null;
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
  const { coupons, recommendedCouponIds } = data.result;

  return { coupons, recommendedCouponIds };
};

export const getCouponValidation = async (
  checkoutId: number,
): Promise<boolean> => {
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

  const data: ApiResponse<{ valid: boolean }> = await response.json();
  const valid = data.result.valid;

  return valid;
};
