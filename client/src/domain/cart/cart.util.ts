import type { CartItemModel } from "./cart.api";

export const getOrderPrice = (filteredCartItem: CartItemModel[]) => {
  return filteredCartItem.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.itemCount,
    0,
  );
};
