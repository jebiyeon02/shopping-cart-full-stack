import { useEffect } from "react";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemCount,
  type CartItemModel,
} from "../../domain/cart/cart.api";
import useAsyncState from "../../shared/useAsyncState";
import { normalizeError } from "../../error/normalizeError";

// 서버상태인 cartItem을 관리하는 Custom Hook
const useCartItem = (cartId: number) => {
  const getCartItemsAsyncState = useAsyncState<CartItemModel[]>();
  const deleteCartItemAsyncState = useAsyncState<null>();
  const updateCartItemCountAsyncState = useAsyncState<{
    id: number;
    itemCount: number;
  }>();

  const loadCartItems = async ({ showLoading }: { showLoading: boolean }) => {
    try {
      if (showLoading) {
        getCartItemsAsyncState.setLoading();
      }

      const fetchedCartItems = await getCartItems(cartId);

      getCartItemsAsyncState.setSuccess(fetchedCartItems);
    } catch (error) {
      getCartItemsAsyncState.setFail(normalizeError(error));
    }
  };

  useEffect(() => {
    void loadCartItems({ showLoading: true });

    // TODO: cleanup 해보기
  }, [cartId]);

  const requestDeleteCartItem = async (productId: number) => {
    try {
      deleteCartItemAsyncState.setLoading();

      await deleteCartItem(cartId, productId);
      await loadCartItems({ showLoading: false });
      deleteCartItemAsyncState.setSuccess(null);
    } catch (error) {
      deleteCartItemAsyncState.setFail(normalizeError(error));
    }
  };

  const requestUpdateCartItemCount = async (
    productId: number,
    itemCount: number,
  ) => {
    try {
      updateCartItemCountAsyncState.setLoading();

      const updatedInformation = await updateCartItemCount(
        cartId,
        productId,
        itemCount,
      );
      await loadCartItems({ showLoading: false });
      updateCartItemCountAsyncState.setSuccess({ ...updatedInformation });
    } catch (error) {
      updateCartItemCountAsyncState.setFail(normalizeError(error));
    }
  };

  return {
    requestDeleteCartItem,
    requestUpdateCartItemCount,
    cartItemsAsyncState: getCartItemsAsyncState.asyncState,
    deleteCartItemAsyncState: deleteCartItemAsyncState.asyncState,
    updateCartItemCountAsyncState: updateCartItemCountAsyncState.asyncState,
  };
};

export default useCartItem;
