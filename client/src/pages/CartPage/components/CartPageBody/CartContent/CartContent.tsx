import type { CartItemModel } from "../../../../../domain/cart/cart.api";
import type { AsyncState } from "../../../../../shared/useAsyncState";
import CartItemList from "./CartItemList/CartItemList";
import CartPaymentSummary from "./CartPaymentSummary";
import styled from "@emotion/styled";

const CartContent = ({
  cartItems,
  checkedProductIds,
  orderPrice,
  deliveryFee,
  totalPrice,
  deleteCartItemAsyncState,
  updateCartItemCountAsyncState,
  onDeleteCartItem,
  onUpdateCartItemCount,
  onAllProductSelect,
  onProductSelect,
}: {
  cartItems: CartItemModel[];
  checkedProductIds: number[];
  orderPrice: number;
  deliveryFee: number;
  totalPrice: number;
  deleteCartItemAsyncState: AsyncState<null>;
  updateCartItemCountAsyncState: AsyncState<{
    id: number;
    itemCount: number;
  }>;
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
        deleteCartItemAsyncState={deleteCartItemAsyncState}
        updateCartItemCountAsyncState={updateCartItemCountAsyncState}
        onDeleteCartItem={onDeleteCartItem}
        onAllProductSelect={onAllProductSelect}
        onProductSelect={onProductSelect}
        onUpdateCartItemCount={onUpdateCartItemCount}
      />

      <CartPaymentSummary
        orderPrice={orderPrice}
        deliveryFee={deliveryFee}
        totalPrice={totalPrice}
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
