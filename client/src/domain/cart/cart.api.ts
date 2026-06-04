import ApiError from "../../error/ApiError";

const BASE_URL =
  "https://shopping-cart-full-stack-production-0cf6.up.railway.app";

type ApiResponse<T> = {
  code: string;
  message: string;
  result: T;
};

type ApiErrorResponse = {
  code: string;
  message: string;
};

// TODO: CartItemResponse 밖으로 뺄지 말지 생각해보기 -> 외부에서도 쓸건데 Response라고 해도 되나?
export type CartItemResponse = {
  id: number;
  name: string;
  price: number;
  imgUrl: string | null; // TODO: 서버에서 처리를 잘 못해주는 것 같음
  itemCount: number;
};

export const getCartItems = async (
  cartId: number,
): Promise<CartItemResponse[]> => {
  const response = await fetch(`${BASE_URL}/carts/${cartId}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    throw new ApiError(errorData.code, errorData.message);
  }

  const data: ApiResponse<{ cartItems: CartItemResponse[] }> =
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
