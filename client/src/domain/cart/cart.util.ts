import type { CartItemResponse } from "./cart.api";

export const getOrderPrice = (filteredCartItem: CartItemResponse[]) => {
  return filteredCartItem.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.itemCount,
    0,
  );
};
