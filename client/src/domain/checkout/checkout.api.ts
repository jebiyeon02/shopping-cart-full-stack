import { BASE_URL, throwApiError, type ApiResponse } from "../../shared/api";

import type { CartItemModel } from "../cart/cart.api";

export type CheckoutItem = CartItemModel;

export type CheckoutContent = {
  checkoutId: number;
  checkoutItems: CheckoutItem[];
  appliedCouponIds: [number?, number?];
  remoteArea: boolean;
  orderPrice: number;
  couponDiscountPrice: number;
  deliveryFee: number;
  totalPrice: number;
};

export const createCheckout = async (
  cartId: number,
  selectedProductIds: number[],
): Promise<number> => {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId,
      selectedProductIds,
    }),
  });

  if (!response.ok) {
    throwApiError(response);
  }

  const data: ApiResponse<{ checkoutId: number }> = await response.json();
  const checkoutId = data.result.checkoutId;

  return checkoutId;
};

export const getCheckoutContent = async (
  checkoutId: number,
): Promise<CheckoutContent> => {
  const response = await fetch(`${BASE_URL}/checkout/${checkoutId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    await throwApiError(response);
  }

  const data: ApiResponse<CheckoutContent> = await response.json();
  const checkoutContent = data.result;

  return checkoutContent;
};

export const updateCheckoutApplyCoupon = async (
  checkoutId: number,
  couponIds: CheckoutContent["appliedCouponIds"],
): Promise<
  Pick<CheckoutContent, "couponDiscountPrice" | "deliveryFee" | "totalPrice">
> => {
  const response = await fetch(`${BASE_URL}/checkout/${checkoutId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ couponIds }),
  });

  if (!response.ok) {
    await throwApiError(response);
  }

  const data: ApiResponse<
    Pick<CheckoutContent, "couponDiscountPrice" | "deliveryFee" | "totalPrice">
  > = await response.json();
  const updatedPrice = data.result;

  return updatedPrice;
};

export const updateCheckoutRemoteArea = async (
  checkoutId: number,
  remoteArea: boolean,
): Promise<
  Pick<CheckoutContent, "couponDiscountPrice" | "deliveryFee" | "totalPrice">
> => {
  const response = await fetch(`${BASE_URL}/checkout/${checkoutId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    await throwApiError(response);
  }

  const data: ApiResponse<
    Pick<CheckoutContent, "couponDiscountPrice" | "deliveryFee" | "totalPrice">
  > = await response.json();
  const updatedPrice = data.result;

  return updatedPrice;
};
