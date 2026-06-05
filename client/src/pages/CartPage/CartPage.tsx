import { useEffect, useReducer } from "react";
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
  const {
    cartItems,
    requestDeleteCartItem,
    deleteCartItemAsyncState,
    requestUpdateCartItemCount,
    updateCartItemCountAsyncState,
  } = useCartItem(cartId);

  const [checkedProductIds, checkedProductIdsDispatch] = useReducer(
    checkedproductIdsReducer,
    [],
  );

  useEffect(() => {
    if (!cartItems) {
      return;
    }

    const savedCheckedProductIds = checkedProductIdsLocalStorageManager.get();

    if (!savedCheckedProductIds) {
      const allProductIds = cartItems.map((cartItem) => cartItem.id);
      checkedProductIdsDispatch({ type: "insert", productId: allProductIds });
      return;
    }

    checkedProductIdsDispatch({
      type: "insert",
      productId: savedCheckedProductIds,
    });
  }, [cartItems]);

  // TODO: 중간에 UI가 나와서 별로인데
  if (!cartItems) return <>로딩중...</>;

  const filteredCartItem = cartItems.filter((cartItem) =>
    checkedProductIds.includes(cartItem.id),
  );

  const handleAllProductSelect = (isChecked: boolean) => {
    if (isChecked) {
      checkedProductIdsDispatch({ type: "init" });
      checkedProductIdsLocalStorageManager.clear();
      return;
    }

    const allProductIds = cartItems.map((cartItem) => cartItem.id);
    checkedProductIdsDispatch({ type: "insert", productId: allProductIds });
    checkedProductIdsLocalStorageManager.set(allProductIds);
  };

  const handleProductSelect = (productId: number, isChecked: boolean) => {
    if (isChecked) {
      checkedProductIdsDispatch({ type: "remove", productId: productId });
      checkedProductIdsLocalStorageManager.set(
        checkedProductIds.filter((id) => id !== productId),
      );

      return;
    }

    checkedProductIdsDispatch({ type: "insert", productId: productId });
    checkedProductIdsLocalStorageManager.set([...checkedProductIds, productId]);
  };

  const handleOrderConfirmClick = () => {
    const orderPrice = getOrderPrice(filteredCartItem);
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
      {cartItems.length !== 0 && (
        <CartContent
          cartItems={cartItems}
          checkedProductIds={checkedProductIds}
          orderPrice={getOrderPrice(filteredCartItem)}
          onDeleteCartItem={async (productId) => {
            if (deleteCartItemAsyncState === "loading") return;
            await requestDeleteCartItem(productId);
            checkedProductIdsDispatch({ type: "remove", productId: productId });
          }}
          onUpdateCartItemCount={(productId: number, itemCount: number) => {
            if (updateCartItemCountAsyncState === "loading") return;
            requestUpdateCartItemCount(productId, itemCount);
          }}
          onAllProductSelect={handleAllProductSelect}
          onProductSelect={handleProductSelect}
        />
      )}
      {cartItems.length === 0 && <CartEmpty />}
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

const checkedProductIdsLocalStorageManager = {
  get() {
    const value = localStorage.getItem("cart-checked-product-ids");
    return value ? (JSON.parse(value) as number[]) : null;
  },

  set(productIds: number[]) {
    localStorage.setItem(
      "cart-checked-product-ids",
      JSON.stringify(productIds),
    );
  },

  clear() {
    localStorage.removeItem("cart-checked-product-ids");
  },
};
