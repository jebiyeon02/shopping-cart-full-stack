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
import styled from "@emotion/styled";

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
    return <FallbackLayout>로딩중...</FallbackLayout>;
  }

  if (cartItemsAsyncState.status === "fail") {
    return <FallbackLayout>{cartItemsAsyncState.error.message}</FallbackLayout>;
  }

  const cartItems = cartItemsAsyncState.data;
  const filteredCartItem = cartItems.filter((cartItem) =>
    checkedProductIds.includes(cartItem.id),
  );

  const handleDeleteCartItem = async (productId: number) => {
    if (deleteCartItemAsyncState.status === "loading") return;
    await requestDeleteCartItem(productId);
    checkedProductIdsDispatch({ type: "remove", productId: productId });
    checkedProductIdsLocalStorageManager.remove(productId);
  };

  const handleUpdateCartItemCount = (productId: number, itemCount: number) => {
    if (updateCartItemCountAsyncState.status === "loading") return;
    requestUpdateCartItemCount(productId, itemCount);
  };

  const handleAllProductSelect = (nextChecked: boolean) => {
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
  };

  const handleProductSelect = (productId: number, nextChecked: boolean) => {
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
  };

  const handleOrderConfirmButtonClick = () => {
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
          onDeleteCartItem={handleDeleteCartItem}
          onUpdateCartItemCount={handleUpdateCartItemCount}
          onAllProductSelect={handleAllProductSelect}
          onProductSelect={handleProductSelect}
        />
      )}
      {cartItems.length === 0 && <CartEmpty />}
      <BaseButton
        disabled={cartItems.length === 0 || checkedProductIds.length === 0}
        onClick={handleOrderConfirmButtonClick}
      >
        주문 확인
      </BaseButton>
    </div>
  );
};

export default CartPage;

const FallbackLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: black;
  font-weight: 500;
  font-size: 14px;
`;

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
