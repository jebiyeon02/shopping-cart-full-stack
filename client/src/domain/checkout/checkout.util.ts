import type { CheckoutItem } from "./checkout.api";

export const getCheckoutAllItemCount = (filteredCartItem: CheckoutItem[]) => {
  return filteredCartItem.reduce((acc, item) => acc + item.itemCount, 0);
};
