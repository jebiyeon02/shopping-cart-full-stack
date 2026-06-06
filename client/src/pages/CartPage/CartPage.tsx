import Header from "../../shared/components/Header";
import BaseButton from "../../shared/components/BaseButton";
import {
  getDeliveryFee,
  getFilteredCartItem,
  getOrderPrice,
  getProductAllItemCount,
} from "../../domain/cart/cart.util";
import { useNavigate } from "react-router-dom";
import useCartPage from "./useCartPage";
import CartPageBody from "./components/CartPageBody/CartPageBody";
import styled from "@emotion/styled";

const CartPage = ({ cartId }: { cartId: number }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartItemsAsyncState,
    deleteCartItemAsyncState,
    updateCartItemCountAsyncState,
    checkedProductIds,
    handleDeleteCartItem,
    handleUpdateCartItemCount,
    handleAllProductSelect,
    handleProductSelect,
  } = useCartPage({ cartId });

  const filteredCartItem = getFilteredCartItem(cartItems, checkedProductIds);
  const orderPrice = getOrderPrice(filteredCartItem);
  const deliveryFee = getDeliveryFee(orderPrice);
  const totalPrice = orderPrice + deliveryFee;
  const isOrderConfirm =
    cartItems.length === 0 || checkedProductIds.length === 0;

  const handleOrderConfirmButtonClick = () => {
    navigate("/cart/order-confirm", {
      state: {
        productCount: filteredCartItem.length,
        productItemCount: getProductAllItemCount(filteredCartItem),
        totalPrice: orderPrice + deliveryFee,
      },
    });
  };

  return (
    <CartPageLayout>
      <HeaderArea>
        <Header actionIcon={<div>SHOP</div>} />
      </HeaderArea>
      <CartPageBodyArea>
        <CartContentTitle>장바구니</CartContentTitle>
        <CartPageBody
          cartItems={cartItems}
          checkedProductIds={checkedProductIds}
          orderPrice={orderPrice}
          deliveryFee={deliveryFee}
          totalPrice={totalPrice}
          cartItemsAsyncState={cartItemsAsyncState}
          deleteCartItemAsyncState={deleteCartItemAsyncState}
          updateCartItemCountAsyncState={updateCartItemCountAsyncState}
          onDeleteCartItem={handleDeleteCartItem}
          onUpdateCartItemCount={handleUpdateCartItemCount}
          onAllProductSelect={handleAllProductSelect}
          onProductSelect={handleProductSelect}
        />
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
  color: black;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 12px;
`;
