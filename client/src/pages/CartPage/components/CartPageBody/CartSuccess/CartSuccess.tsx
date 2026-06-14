import { useNavigate } from "react-router-dom";
import type { CartItemModel } from "../../../../../domain/cart/cart.api";
import CartEmpty from "./CartEmpty";
import { useCartSelectionContext } from "../../../CartSelectionContext";
import {
  getDeliveryFee,
  getFilteredCartItem,
  getOrderPrice,
  getProductAllItemCount,
  getTotalPrice,
} from "../../../../../domain/cart/cart.util";
import BaseButton from "../../../../../shared/components/BaseButton";
import CartContent from "./CartContent/CartContent";
import styled from "@emotion/styled";

const CartSuccess = ({ cartItems }: { cartItems: CartItemModel[] }) => {
  return (
    <>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <CartContent cartItems={cartItems} />
      )}
      <BottomArea>
        <OrderConfirmButton cartItems={cartItems} />
      </BottomArea>
    </>
  );
};

export default CartSuccess;

const BottomArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  width: min(100vw, 400px);
  transform: translateX(-50%);
`;

// 이런 식으로 로직 분리를 위해서 "특수화"? 라는 개념을 적용해봤다..!
const OrderConfirmButton = ({ cartItems }: { cartItems: CartItemModel[] }) => {
  const navigate = useNavigate();
  const { selectedProductIds } = useCartSelectionContext();

  const filteredCartItem = getFilteredCartItem(cartItems, selectedProductIds);
  const orderPrice = getOrderPrice(filteredCartItem);
  const deliveryFee = getDeliveryFee(orderPrice);
  const isOrderConfirm =
    cartItems.length === 0 || selectedProductIds.length === 0;

  const handleOrderConfirmButtonClick = () => {
    navigate("/cart/order-confirm", {
      state: {
        productCount: filteredCartItem.length,
        productItemCount: getProductAllItemCount(filteredCartItem),
        totalPrice: getTotalPrice(orderPrice, deliveryFee),
      },
    });
  };

  return (
    <BaseButton
      disabled={isOrderConfirm}
      onClick={handleOrderConfirmButtonClick}
    >
      주문 확인
    </BaseButton>
  );
};
