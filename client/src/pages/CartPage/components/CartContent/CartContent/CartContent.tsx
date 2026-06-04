import { useState } from "react";
import type { CartItemResponse } from "../../../../../domain/cart/cart.api";
import CartItemList from "./CartItemList/CartItemList";
import CartPaymentSummary from "./CartPaymentSummary";

const CartContent = ({
  cartItems,
  onDeleteCartItem,
}: {
  cartItems: CartItemResponse[];
  onDeleteCartItem: (productId: number) => void;
}) => {
  const [checkedProductIds, setCheckedProductIds] = useState<Number[]>([]);
  const filteredCartItem = cartItems.filter((cartItem) =>
    checkedProductIds.includes(cartItem.id),
  );

  // TODO 계산로직 분리 필요
  const orderPrice = filteredCartItem.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.itemCount,
    0,
  );

  // TODO CartItemList 내부 CartItem을 children으로 받게할 때 장단점 생각해보기
  return (
    <div>
      <CartItemList cartItems={cartItems} onDeleteCartItem={onDeleteCartItem} />
      <CartPaymentSummary orderPrice={orderPrice} deliveryFee={3000} />
    </div>
  );
};

export default CartContent;
