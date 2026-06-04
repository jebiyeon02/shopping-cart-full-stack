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
  const [checkedProductIds, setCheckedProductIds] = useState<number[]>([]);
  const filteredCartItem = cartItems.filter((cartItem) =>
    checkedProductIds.includes(cartItem.id),
  );

  const handleAllProductSelect = (action: "check" | "uncheck") => {
    if (action === "uncheck") {
      setCheckedProductIds([]);
      return;
    }
    // TODO: 전체 덮어쓰기 vs 체크 안된 것만 찾아서 checkedProductIds에 넣어주기 트레이드 오프 고민
    const allProductIds = cartItems.map((cartItem) => cartItem.id);
    setCheckedProductIds(allProductIds);
  };

  const handleProductSelect = (
    productId: number,
    action: "check" | "uncheck",
  ) => {
    if (action === "uncheck") {
      setCheckedProductIds((prev) => prev.filter((id) => id !== productId));
    } else {
      setCheckedProductIds((prev) => [...prev, productId]);
    }
  };

  // TODO 계산로직 분리 필요
  const orderPrice = filteredCartItem.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.itemCount,
    0,
  );

  // TODO CartItemList 내부 CartItem을 children으로 받게할 때 장단점 생각해보기
  return (
    <div>
      <CartItemList
        cartItems={cartItems}
        onDeleteCartItem={onDeleteCartItem}
        onAllProductSelect={handleAllProductSelect}
        onProductSelect={handleProductSelect}
        checkedProductIds={checkedProductIds}
        isSelectAllProduct={checkedProductIds.length === cartItems.length}
      />
      <CartPaymentSummary
        orderPrice={orderPrice}
        deliveryFee={orderPrice >= 100000 ? 0 : 3000}
      />
    </div>
  );
};

export default CartContent;
