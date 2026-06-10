import CartContent from "./CartContent/CartContent";

import CartFail from "./CartFail";
import CartLoading from "./CartLoading";
import CartEmpty from "./CartEmpty";
import { useCartContext } from "../../CartContext";
import BaseButton from "../../../../shared/components/BaseButton";
import {
  getDeliveryFee,
  getFilteredCartItem,
  getOrderPrice,
  getProductAllItemCount,
  getTotalPrice,
} from "../../../../domain/cart/cart.util";
import { useNavigate } from "react-router-dom";
import { useCartSelectionContext } from "../../CartSelectionContext";
import styled from "@emotion/styled";

const CartPageBody = () => {
  const { getCartItemsAsyncState } = useCartContext();
  const navigate = useNavigate();
  const { selectedProductIds } = useCartSelectionContext();

  switch (getCartItemsAsyncState.status) {
    case "idle": {
      return <CartLoading />;
    }
    case "loading": {
      return <CartLoading />;
    }
    case "fail": {
      return <CartFail message={getCartItemsAsyncState.error.message} />;
    }
    case "success": {
      const cartItems = getCartItemsAsyncState.data;
      const filteredCartItem = getFilteredCartItem(
        cartItems,
        selectedProductIds,
      );
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
        <>
          {cartItems.length === 0 ? (
            <CartEmpty />
          ) : (
            <CartContent cartItems={cartItems} />
          )}
          <BottomArea>
            <BaseButton
              disabled={isOrderConfirm}
              onClick={handleOrderConfirmButtonClick}
            >
              주문 확인
            </BaseButton>
          </BottomArea>
        </>
      );
    }
    default: {
      return <CartFail message="알 수 없는 에러가 발생했습니다." />;
    }
  }
};

export default CartPageBody;

const BottomArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  width: min(100vw, 400px);
  transform: translateX(-50%);
`;
