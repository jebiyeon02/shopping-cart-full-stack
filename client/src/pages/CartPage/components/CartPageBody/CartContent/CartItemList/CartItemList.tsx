import styled from "@emotion/styled";
import type { CartItemModel } from "../../../../../../domain/cart/cart.api";
import CartItem from "./CartItem";
import type { AsyncState } from "../../../../../../shared/useAsyncState";
import { typography } from "../../../../../../shared/styles/typography";

const CartItemList = ({
  cartItems,
  deleteCartItemAsyncState,
  updateCartItemCountAsyncState,
  onDeleteCartItem,
  onAllProductSelect,
  onProductSelect,
  checkedProductIds,
  isSelectAllProduct,
  onUpdateCartItemCount,
}: {
  cartItems: CartItemModel[];
  deleteCartItemAsyncState: AsyncState<null>;
  updateCartItemCountAsyncState: AsyncState<{
    id: number;
    itemCount: number;
  }>;
  onDeleteCartItem: (productId: number) => void;
  onAllProductSelect: (isChecked: boolean) => void;
  onProductSelect: (productId: number, isChecked: boolean) => void;
  checkedProductIds: number[];
  isSelectAllProduct: boolean;
  onUpdateCartItemCount: (productId: number, itemCount: number) => void;
}) => {
  return (
    <CartItemListLayout>
      <CheckBoxLabel>
        <input
          type="checkbox"
          checked={isSelectAllProduct}
          onChange={(event) => {
            onAllProductSelect(event.target.checked);
          }}
        />
        전체선택
      </CheckBoxLabel>
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          deleteCartItemAsyncState={deleteCartItemAsyncState}
          updateCartItemCountAsyncState={updateCartItemCountAsyncState}
          onProductSelect={onProductSelect}
          onDeleteCartItem={onDeleteCartItem}
          onUpdateCartItemCount={onUpdateCartItemCount}
          isChecked={checkedProductIds.includes(cartItem.id)}
        />
      ))}
    </CartItemListLayout>
  );
};

export default CartItemList;

const CheckBoxLabel = styled.label`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
  ${typography.bodySmall}
`;

const CartItemListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
