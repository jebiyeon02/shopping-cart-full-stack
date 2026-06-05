import { useEffect, useState } from "react";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemCount,
  type CartItemResponse,
} from "../../domain/cart/cart.api";
import { errorHandler } from "../../error/errorHandler";
import useAsyncState from "../../useAsyncState";
// import ApiError from "../../error/ApiError";

// 이 훅은 서버상태인 cartItem을 관리하는 훅임
// 실제로는 그럴일이 없겠지만, 비로그인 상태에서 여러 카트에 담을 수 있다고 가정
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

  // TODO: api요청별로 asyncState 훅 사용 필요
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
