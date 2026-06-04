import { useState } from "react";
import type { CartItemResponse } from "../../../../../domain/cart/cart.api";
import CartItemList from "./CartItemList/CartItemList";
import CartPaymentSummary from "./CartPaymentSummary";
import { getOrderPrice } from "../../../../../domain/cart/cart.util";
import styled from "@emotion/styled";

const CartContent = ({
  cartItems,
  onDeleteCartItem,
  onUpdateCartItemCount,
}: {
  cartItems: CartItemResponse[];
  onDeleteCartItem: (productId: number) => void;
  onUpdateCartItemCount: (productId: number, itemCount: number) => void;
}) => {
  const [checkedProductIds, setCheckedProductIds] = useState<number[]>([]);
  const filteredCartItem = cartItems.filter((cartItem) =>
    checkedProductIds.includes(cartItem.id),
  );
  const orderPrice = getOrderPrice(filteredCartItem);

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

  // TODO CartItemList 내부 CartItem을 children으로 받게할 때 장단점 생각해보기
  return (
    <CartContentLayout>
      <CartContentTitle>장바구니</CartContentTitle>
      <CartContentText>
        현재{cartItems.length}종류의 상품이 담겨있습니다.
      </CartContentText>

      <CartItemList
        cartItems={cartItems}
        onDeleteCartItem={onDeleteCartItem}
        onAllProductSelect={handleAllProductSelect}
        onProductSelect={handleProductSelect}
        checkedProductIds={checkedProductIds}
        isSelectAllProduct={checkedProductIds.length === cartItems.length}
        onUpdateCartItemCount={onUpdateCartItemCount}
      />
      <CartPaymentSummary
        orderPrice={orderPrice}
        deliveryFee={orderPrice >= 100000 ? 0 : 3000}
      />
    </CartContentLayout>
  );
};

export default CartContent;

const CartContentLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 36px 24px;
`;

const CartContentTitle = styled.div`
  color: black;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 12px;
`;

const CartContentText = styled.div`
  color: black;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 30px;
`;
