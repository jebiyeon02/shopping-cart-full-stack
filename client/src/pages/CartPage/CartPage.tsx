import { useReducer } from "react";
import Header from "../../shared/components/Header";
import CartContent from "./components/CartContent/CartContent/CartContent";
import CartEmpty from "./components/CartEmpty";
import BaseButton from "../../shared/components/BaseButton";
import useCartItem from "./useCartItem";
import { getOrderPrice } from "../../domain/cart/cart.util";
import { useNavigate } from "react-router-dom";
import { DELIVERY } from "../../domain/cart/cart.constants";
import { checkedproductIdsReducer } from "./checkedProductsIdReducer";

const CartPage = ({ cartId }: { cartId: number }) => {
  const navigate = useNavigate();
  const { cartItems, requestDeleteCartItem, requestUpdateCartItemCount } =
    useCartItem(cartId);

  const [checkedProductIds, checkedProductIdsDispatch] = useReducer(
    checkedproductIdsReducer,
    [],
  );

  if (!cartItems) return;

  const filteredCartItem = cartItems.filter((cartItem) =>
    checkedProductIds.includes(cartItem.id),
  );

  const orderPrice = getOrderPrice(filteredCartItem);

  const handleAllProductSelect = (isChecked: boolean) => {
    if (isChecked) {
      checkedProductIdsDispatch({ type: "init" });
      return;
    }
    // TODO: 전체 덮어쓰기 vs 체크 안된 것만 찾아서 checkedProductIds에 넣어주기 트레이드 오프 고민
    const allProductIds = cartItems.map((cartItem) => cartItem.id);
    checkedProductIdsDispatch({ type: "insert", productId: allProductIds });
  };

  const handleProductSelect = (productId: number, isChecked: boolean) => {
    if (isChecked) {
      checkedProductIdsDispatch({ type: "remove", productId: productId });
      return;
    }

    checkedProductIdsDispatch({ type: "insert", productId: productId });
  };

  const handleOrderConfirmClick = () => {
    navigate("/cart/order-confirm", {
      state: {
        productCount: filteredCartItem.length,
        productItemCount: filteredCartItem.map((item) => item.itemCount),
        totalPrice:
          orderPrice +
          (orderPrice >= DELIVERY.FREE_PRICE_BOUNDARY ? 0 : DELIVERY.FEE),
      },
    });
  };

  return (
    <div>
      <Header actionIcon={<div>SHOP</div>} />
      {cartItems && (
        <CartContent
          cartItems={cartItems}
          checkedProductIds={checkedProductIds}
          orderPrice={orderPrice}
          onDeleteCartItem={async (productId) => {
            await requestDeleteCartItem(productId);
            checkedProductIdsDispatch({ type: "remove", productId: productId });
          }}
          onUpdateCartItemCount={requestUpdateCartItemCount}
          onAllProductSelect={handleAllProductSelect}
          onProductSelect={handleProductSelect}
        />
      )}
      <CartEmpty />
      <BaseButton
        disabled={cartItems.length === 0 || checkedProductIds.length === 0}
        onClick={handleOrderConfirmClick}
      >
        주문 확인
      </BaseButton>
    </div>
  );
};

export default CartPage;
