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
