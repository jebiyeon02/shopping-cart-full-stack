import Header from "../../shared/components/Header";
import BaseButton from "../../shared/components/BaseButton";
import {
  getDeliveryFee,
  getFilteredCartItem,
  getOrderPrice,
  getProductAllItemCount,
  getTotalPrice,
} from "../../domain/cart/cart.util";
import { useNavigate } from "react-router-dom";
import CartPageBody from "./components/CartPageBody/CartPageBody";
import 임시추가버튼 from "./components/임시추가버튼";
import styled from "@emotion/styled";
import { typography } from "../../shared/styles/typography";
import { useCartContext } from "./CartContext";
import { useCheckedProductContext } from "./CheckedProductContext";

const CartPage = () => {
  const navigate = useNavigate();

  const { cartItems } = useCartContext();
  const { checkedProductIds } = useCheckedProductContext();

  const filteredCartItem = getFilteredCartItem(cartItems, checkedProductIds);
  const orderPrice = getOrderPrice(filteredCartItem);
  const deliveryFee = getDeliveryFee(orderPrice);
  const isOrderConfirm =
    cartItems.length === 0 || checkedProductIds.length === 0;

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
    <CartPageLayout>
      <HeaderArea>
        <Header actionIcon={<div>SHOP</div>} />
      </HeaderArea>
      <CartPageBodyArea>
        <CartContentTitle>
          장바구니 <임시추가버튼 />
        </CartContentTitle>

        <CartPageBody />
      </CartPageBodyArea>
      <BottomArea>
        <BaseButton
          disabled={isOrderConfirm}
          onClick={handleOrderConfirmButtonClick}
        >
          주문 확인
        </BaseButton>
      </BottomArea>
    </CartPageLayout>
  );
};

export default CartPage;

const CartPageLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 64px 0;
`;

const HeaderArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
`;

const CartPageBodyArea = styled.div`
  padding: 24px;
`;

const BottomArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  width: min(100vw, 400px);
  transform: translateX(-50%);
`;

const CartContentTitle = styled.div`
  ${typography.titleLarge}
  margin-bottom: 12px;
`;
