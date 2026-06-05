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
    cartItemsAsyncState,
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
    if (cartItemsAsyncState.status !== "success") {
      return;
    }
    const cartItems = cartItemsAsyncState.data;

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
  }, [cartItemsAsyncState.data]);

  if (
    cartItemsAsyncState.status === "idle" ||
    cartItemsAsyncState.status === "loading"
  ) {
    return <>로딩중...</>;
  }

  if (cartItemsAsyncState.status === "fail") {
    return <>에러...</>;
  }

  const cartItems = cartItemsAsyncState.data;
  const filteredCartItem = cartItems.filter((cartItem) =>
    checkedProductIds.includes(cartItem.id),
  );

  return (
    <div>
      <Header actionIcon={<div>SHOP</div>} />
      {cartItems.length !== 0 && (
        <CartContent
          cartItems={cartItems}
          checkedProductIds={checkedProductIds}
          orderPrice={getOrderPrice(filteredCartItem)}
          onDeleteCartItem={async (productId) => {
            if (deleteCartItemAsyncState.status === "loading") return;
            await requestDeleteCartItem(productId);
            checkedProductIdsDispatch({ type: "remove", productId: productId });
            checkedProductIdsLocalStorageManager.remove(productId);
          }}
          onUpdateCartItemCount={(productId: number, itemCount: number) => {
            if (updateCartItemCountAsyncState.status === "loading") return;
            requestUpdateCartItemCount(productId, itemCount);
          }}
          onAllProductSelect={(nextChecked: boolean) => {
            if (nextChecked) {
              const allProductIds = cartItems.map((cartItem) => cartItem.id);
              checkedProductIdsDispatch({
                type: "insert",
                productId: allProductIds,
              });
              checkedProductIdsLocalStorageManager.set(allProductIds);
              return;
            }

            checkedProductIdsDispatch({ type: "init" });
            checkedProductIdsLocalStorageManager.clear();
          }}
          onProductSelect={(productId: number, nextChecked: boolean) => {
            if (nextChecked) {
              checkedProductIdsDispatch({
                type: "insert",
                productId: productId,
              });
              checkedProductIdsLocalStorageManager.set([
                ...checkedProductIds,
                productId,
              ]);
              return;
            }

            checkedProductIdsDispatch({
              type: "remove",
              productId: productId,
            });
            checkedProductIdsLocalStorageManager.set(
              checkedProductIds.filter((id) => id !== productId),
            );
          }}
        />
      )}
      {cartItems.length === 0 && <CartEmpty />}
      <BaseButton
        disabled={cartItems.length === 0 || checkedProductIds.length === 0}
        onClick={() => {
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
        }}
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

  remove(productId: number) {
    const savedProductIds = this.get();

    if (!savedProductIds) {
      return;
    }

    this.set(savedProductIds.filter((id) => id !== productId));
  },

  clear() {
    localStorage.removeItem("cart-checked-product-ids");
  },
};
