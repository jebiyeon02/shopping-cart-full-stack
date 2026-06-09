import { useEffect } from "react";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemCount,
  type CartItemModel,
} from "../../domain/cart/cart.api";
import useAsyncTask, {
  type ExecuteAsyncFunctionProps,
} from "../../shared/useAsyncTask";

// 서버상태인 cartItem을 관리하는 Custom Hook
const useCartItem = (cartId: number) => {
  const getCartItemsAsyncTask = useAsyncTask<CartItemModel[]>();
  const deleteCartItemAsyncTask = useAsyncTask<void>();
  const updateCartItemCountAsyncTask = useAsyncTask<{
    id: number;
    itemCount: number;
  }>();

  const requestGetCartItems = () =>
    getCartItemsAsyncTask.executeAsyncFunction({
      asyncFunction: () => getCartItems(cartId),
    });

  useEffect(() => {
    void requestGetCartItems();

    // TODO: cleanup 해보기
  }, [cartId]);

  const requestDeleteCartItem = async (
    productId: number,
    options: Pick<ExecuteAsyncFunctionProps<void>, "options">,
  ) => {
    deleteCartItemAsyncTask.executeAsyncFunction({
      asyncFunction: () => deleteCartItem(cartId, productId),
      options: options.options,
    });
  };

  const requestUpdateCartItemCount = async (
    productId: number,
    itemCount: number,
    options: Pick<
      ExecuteAsyncFunctionProps<{ id: number; itemCount: number }>,
      "options"
    >,
  ) => {
    updateCartItemCountAsyncTask.executeAsyncFunction({
      asyncFunction: () => updateCartItemCount(cartId, productId, itemCount),
      options: options.options,
    });
  };

  return {
    requestGetCartItems,
    requestDeleteCartItem,
    requestUpdateCartItemCount,
    getCartItemsAsyncState: getCartItemsAsyncTask.asyncState,
    deleteCartItemAsyncState: deleteCartItemAsyncTask.asyncState,
    updateCartItemCountAsyncState: updateCartItemCountAsyncTask.asyncState,
  };
};

export default useCartItem;
