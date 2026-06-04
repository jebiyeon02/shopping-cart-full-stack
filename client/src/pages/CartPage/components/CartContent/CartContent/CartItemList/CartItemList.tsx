import { useState } from "react";
import type { CartItemResponse } from "../../../../../../domain/cart/cart.api";
import CartItem from "./CartItem";

const CartItemList = ({
  cartItems,
  onDeleteCartItem,
  onAllProductSelect,
}: {
  cartItems: CartItemResponse[];
  onDeleteCartItem: (productId: number) => void;
  onAllProductSelect: (action: "fill" | "empty") => void;
}) => {
  // TODO: 로컬 스토리지로 변경 필요
  const [isSelectAllProduct, setIsSelectAllProduct] = useState(false);
  return (
    <div>
      <input
        type="checkbox"
        onChange={() => {
          if (isSelectAllProduct) {
            onAllProductSelect("empty");
          } else {
            onAllProductSelect("fill");
          }
          setIsSelectAllProduct((prev) => !prev);
        }}
      />{" "}
      전체 선택
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          onDeleteCartItem={onDeleteCartItem}
        />
      ))}
    </div>
  );
};

export default CartItemList;
