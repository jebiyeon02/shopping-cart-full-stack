import styled from "@emotion/styled";
import type { CartItemResponse } from "../../../../../../domain/cart/cart.api";
import CartItem from "./CartItem";

const CartItemList = ({
  cartItems,
  onDeleteCartItem,
  onAllProductSelect,
  onProductSelect,
  checkedProductIds,
  isSelectAllProduct,
  onUpdateCartItemCount,
}: {
  cartItems: CartItemResponse[];
  onDeleteCartItem: (productId: number) => void;
  onAllProductSelect: (action: "check" | "uncheck") => void;
  onProductSelect: (productId: number, action: "check" | "uncheck") => void;
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
          onChange={() => {
            if (isSelectAllProduct) {
              onAllProductSelect("uncheck");
            } else {
              onAllProductSelect("check");
            }
          }}
        />
        전체선택
      </CheckBoxLabel>
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
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
  color: black;
  font-weight: 500;
  font-size: 12px;
`;

const CartItemListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
