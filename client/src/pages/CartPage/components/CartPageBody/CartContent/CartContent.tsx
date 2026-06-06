import type { CartItemModel } from "../../../../../domain/cart/cart.api";
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
  cartItems: CartItemModel[];
  checkedProductIds: number[];
  orderPrice: number;
  onDeleteCartItem: (productId: number) => void;
  onUpdateCartItemCount: (productId: number, itemCount: number) => void;
  onAllProductSelect: (nextChecked: boolean) => void;
  onProductSelect: (productId: number, nextChecked: boolean) => void;
}) => {
  return (
    <CartContentLayout>
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
`;

const CartContentText = styled.div`
  color: black;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 30px;
`;
