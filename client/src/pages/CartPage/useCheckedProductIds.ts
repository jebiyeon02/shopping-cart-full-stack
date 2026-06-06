import { useEffect, useReducer, useState } from "react";
import type { AsyncState } from "../../shared/useAsyncState";
import type { CartItemModel } from "../../domain/cart/cart.api";

// localStorage, 클라이언트 상태 총 2곳에서 관리되는 checkedProductIds를 동기화하고 관리하는 훅
export const useCheckedProductIds = (
  cartItemsAsyncState: AsyncState<CartItemModel[]>,
) => {
  const [checkedProductIds, checkedProductIdsDispatch] = useReducer(
    checkedProductIdsReducer,
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

      checkedProductIdsDispatch({
        type: "insertAll",
        productIds: allProductIds,
      });
    } else {
      const parsedCheckedProductIds = JSON.parse(
        savedCheckedProductIds,
      ) as number[];

      checkedProductIdsDispatch({
        type: "insertAll",
        productIds: parsedCheckedProductIds,
      });
    }

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

export type CheckedProductIdsReducerAction =
  | { type: "init" }
  | { type: "insert"; productId: number }
  | { type: "insertAll"; productIds: number[] }
  | { type: "remove"; productId: number };

export const checkedProductIdsReducer = (
  productIds: number[],
  action: CheckedProductIdsReducerAction,
) => {
  switch (action.type) {
    case "init": {
      return [];
    }
    case "insert": {
      return Array.from(new Set([...productIds, action.productId]));
    }

    case "insertAll": {
      return Array.from(new Set([...productIds, ...action.productIds]));
    }
    case "remove": {
      return productIds.filter((id) => id !== action.productId);
    }
    default: {
      return productIds;
    }
  }
};
