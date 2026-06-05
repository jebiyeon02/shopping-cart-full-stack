import { useEffect, useState } from "react";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemCount,
  type CartItemResponse,
} from "../../domain/cart/cart.api";
import { errorHandler } from "../../error/errorHandler";
import useAsyncState from "../../useAsyncState";

// 서버상태인 cartItem을 관리하는 Custom Hook
const useCartItem = (cartId: number) => {
  const [cartItems, setCartItems] = useState<CartItemResponse[] | null>(null);
  const getCartItemsAsyncState = useAsyncState();
  const deleteCartItemAsyncState = useAsyncState();
  const updateCartItemCountAsyncState = useAsyncState();

  const loadCartItems = async () => {
    try {
      getCartItemsAsyncState.setLoading();

      const fetchedCartItems = await getCartItems(cartId);

      setCartItems(fetchedCartItems);
      getCartItemsAsyncState.setSuccess();
    } catch (error) {
      errorHandler(error);
      getCartItemsAsyncState.setFail();
    }
  };

  useEffect(() => {
    void loadCartItems();

    // TODO: cleanup 해보기
  }, [cartId]);

  const requestDeleteCartItem = async (productId: number) => {
    try {
      deleteCartItemAsyncState.setLoading();

      await deleteCartItem(cartId, productId);
      await loadCartItems();
      deleteCartItemAsyncState.setSuccess();
    } catch (error) {
      errorHandler(error);
      deleteCartItemAsyncState.setFail();
    }
  };

  const requestUpdateCartItemCount = async (
    productId: number,
    itemCount: number,
  ) => {
    try {
      updateCartItemCountAsyncState.setLoading();

      await updateCartItemCount(cartId, productId, itemCount);
      await loadCartItems();
      updateCartItemCountAsyncState.setSuccess();
    } catch (error) {
      errorHandler(error);
      updateCartItemCountAsyncState.setFail();
    }
  };

  return {
    cartItems,
    requestDeleteCartItem,
    requestUpdateCartItemCount,
    getCartItemsAsyncState: getCartItemsAsyncState.asyncState,
    deleteCartItemAsyncState: deleteCartItemAsyncState.asyncState,
    updateCartItemCountAsyncState: updateCartItemCountAsyncState.asyncState,
  };
};

export default useCartItem;
