import styled from "@emotion/styled";
import { typography } from "../../../../../../shared/styles/typography";
import { useCartSelectionContext } from "../../../../CartSelectionContext";
import CartItemRow from "./CartItemRow";
import type { CartItemModel } from "../../../../../../domain/cart/cart.api";
import useCartItemPending from "./useCartItemPending";

const CartItemList = ({ cartItems }: { cartItems: CartItemModel[] }) => {
  const { selectedProductIds, selectAllCartItems, clearCartItemSelection } =
    useCartSelectionContext();

  const { pendingProductIds, addToPendingList, deleteFromPendingList } =
    useCartItemPending();

  const isCartItemSelected = cartItems.length === selectedProductIds.length;

  const handleAllProductSelect = (nextChecked: boolean) => {
    if (nextChecked) {
      const allProductIds = cartItems.map((cartItem) => cartItem.id);
      selectAllCartItems(allProductIds);
      return;
    }

    clearCartItemSelection();
  };

  return (
    <CartItemListLayout>
      <CheckBoxLabel>
        <input
          type="checkbox"
          checked={isCartItemSelected}
          onChange={(event) => {
            handleAllProductSelect(event.target.checked);
          }}
        />
        전체선택
      </CheckBoxLabel>
      {cartItems.map((cartItem) => (
        <CartItemRow
          key={cartItem.id}
          cartItem={cartItem}
          isChecked={selectedProductIds.includes(cartItem.id)}
          pendingProductIds={pendingProductIds}
          onAsyncTaskStart={addToPendingList}
          onAsyncTaskEnd={deleteFromPendingList}
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
