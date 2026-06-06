import { useEffect, useReducer, useState } from "react";
import { checkedproductIdsReducer } from "./checkedProductsIdReducer";
import type { AsyncState } from "../../shared/useAsyncState";
import type { CartItemResponse } from "../../domain/cart/cart.api";

// localStorage, 클라이언트 상태 총 2곳에서 관리되는 checkedProductIds를 동기화하고 관리하는 훅
export const useCheckedProductIds = (
  cartItemsAsyncState: AsyncState<CartItemResponse[]>,
) => {
  const [checkedProductIds, checkedProductIdsDispatch] = useReducer(
    checkedproductIdsReducer,
    [],
  );
  // 최초 렌더링 시 상품 전체선택으로 1번 바뀌었다는 것을 나타내는 flag
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (cartItemsAsyncState.status !== "success" || isInitialized) {
      return;
    }
    const cartItems = cartItemsAsyncState.data;

    const savedCheckedProductIds = localStorage.getItem(
      "cart-checked-product-ids",
    );

    if (!savedCheckedProductIds) {
      const allProductIds = cartItems.map((cartItem) => cartItem.id);
      checkedProductIdsDispatch({ type: "insert", productId: allProductIds });
      return;
    }

    const parsedCheckedProductIds = JSON.parse(savedCheckedProductIds);

    checkedProductIdsDispatch({
      type: "insert",
      productId: parsedCheckedProductIds,
    });

    setIsInitialized(true);
  }, [cartItemsAsyncState.status, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem(
      "cart-checked-product-ids",
      JSON.stringify(checkedProductIds),
    );
  }, [checkedProductIds, isInitialized]);

  return { checkedProductIds, checkedProductIdsDispatch };
};
