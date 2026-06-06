import Header from "../../shared/components/Header";
import BaseButton from "../../shared/components/BaseButton";
import { getOrderPrice } from "../../domain/cart/cart.util";
import { useNavigate } from "react-router-dom";
import { DELIVERY } from "../../domain/cart/cart.constants";
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

  const filteredCartItem = cartItems.filter((cartItem) =>
    checkedProductIds.includes(cartItem.id),
  );

  const handleOrderConfirmButtonClick = () => {
    const orderPrice = getOrderPrice(filteredCartItem);
    navigate("/cart/order-confirm", {
      state: {
        productCount: filteredCartItem.length,
        productItemCount: filteredCartItem.reduce(
          (acc, item) => acc + item.itemCount,
          0,
        ),
        totalPrice:
          orderPrice +
          (orderPrice >= DELIVERY.FREE_PRICE_BOUNDARY ? 0 : DELIVERY.FEE),
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
          orderPrice={getOrderPrice(filteredCartItem)}
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
          disabled={cartItems.length === 0 || checkedProductIds.length === 0}
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
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
`;

const CartContentTitle = styled.div`
  color: black;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 12px;
`;
