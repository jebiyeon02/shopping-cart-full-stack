import type { CartItemResponse } from "../../../../../domain/cart/cart.api";
import { DELIVERY } from "../../../../../domain/cart/cart.constants";
import CartItemList from "./CartItemList/CartItemList";
import CartPaymentSummary from "./CartPaymentSummary";
import styled from "@emotion/styled";

const CartContent = ({
  cartItems,
  checkedProductIds,
  orderPrice,
  onDeleteCartItem,
  onUpdateCartItemCount,
  onAllProductSelect,
  onProductSelect,
}: {
  cartItems: CartItemResponse[];
  checkedProductIds: number[];
  orderPrice: number;
  onDeleteCartItem: (productId: number) => void;
  onUpdateCartItemCount: (productId: number, itemCount: number) => void;
  onAllProductSelect: (nextChecked: boolean) => void;
  onProductSelect: (productId: number, nextChecked: boolean) => void;
}) => {
  return (
    <CartContentLayout>
      <CartContentTitle>장바구니</CartContentTitle>
      <CartContentText>
        현재{cartItems.length}종류의 상품이 담겨있습니다.
      </CartContentText>

      <CartItemList
        cartItems={cartItems}
        checkedProductIds={checkedProductIds}
        isSelectAllProduct={checkedProductIds.length === cartItems.length}
        onDeleteCartItem={onDeleteCartItem}
        onAllProductSelect={onAllProductSelect}
        onProductSelect={onProductSelect}
        onUpdateCartItemCount={onUpdateCartItemCount}
      />

      <CartPaymentSummary
        orderPrice={orderPrice}
        deliveryFee={
          orderPrice >= DELIVERY.FREE_PRICE_BOUNDARY ? 0 : DELIVERY.FEE
        }
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
