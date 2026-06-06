import ApiError from "../../error/ApiError";
import type {
  ApiErrorResponse,
  ApiResponse,
} from "../../shared/apiRespone.type";

const BASE_URL =
  "https://shopping-cart-full-stack-production-0cf6.up.railway.app";

export type CartItemModel = {
  id: number;
  name: string;
  price: number;
  imgUrl?: string;
  itemCount: number;
};

export const getCartItems = async (
  cartId: number,
): Promise<CartItemModel[]> => {
  const response = await fetch(`${BASE_URL}/carts/${cartId}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    throw new ApiError(errorData.code, errorData.message);
  }

  const data: ApiResponse<{ cartItems: CartItemModel[] }> =
    await response.json();
  const cartItems = data.result.cartItems;

  return cartItems;
};

export const addCartItem = async (
  cartId: number,
  productId: number,
  itemCount: number,
): Promise<number> => {
  const response = await fetch(`${BASE_URL}/carts/${cartId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      itemCount,
    }),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    throw new ApiError(errorData.code, errorData.message);
  }

  const data: ApiResponse<{ productId: number }> = await response.json();
  const addedProductId = data.result.productId;

  return addedProductId;
};

export const deleteCartItem = async (
  cartId: number,
  productId: number,
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/carts/${cartId}/items/${productId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    throw new ApiError(errorData.code, errorData.message);
  }
};

export const updateCartItemCount = async (
  cartId: number,
  productId: number,
  itemCount: number,
): Promise<{ id: number; itemCount: number }> => {
  const response = await fetch(
    `${BASE_URL}/carts/${cartId}/items/${productId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemCount,
      }),
    },
  );

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    throw new ApiError(errorData.code, errorData.message);
  }

  const data: ApiResponse<{ id: number; itemCount: number }> =
    await response.json();
  const updatedProduct = data.result;

  return updatedProduct;
};
