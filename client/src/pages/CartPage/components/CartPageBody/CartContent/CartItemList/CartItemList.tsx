import styled from "@emotion/styled";
import CartItem from "./CartItem";
import { typography } from "../../../../../../shared/styles/typography";
import { useCartContext } from "../../../../CartContext";
import { useCheckedProductContext } from "../../../../CheckedProductContext";

const CartItemList = () => {
  const { cartItems } = useCartContext();
  const { checkedProductIds, checkedProductIdsDispatch } =
    useCheckedProductContext();

  const isCartItemSelected = cartItems.length === checkedProductIds.length;

  const handleAllProductSelect = (nextChecked: boolean) => {
    if (nextChecked) {
      const allProductIds = cartItems.map((cartItem) => cartItem.id);
      checkedProductIdsDispatch({
        type: "insertAll",
        productIds: allProductIds,
      });
      return;
    }

    checkedProductIdsDispatch({ type: "init" });
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
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
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
