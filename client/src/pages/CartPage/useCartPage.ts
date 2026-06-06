import useCartItem from "./useCartItem";
import { useCheckedProductIds } from "./useCheckedProductIds";

const useCartPage = ({ cartId }: { cartId: number }) => {
  const {
    cartItemsAsyncState,
    requestDeleteCartItem,
    deleteCartItemAsyncState,
    requestUpdateCartItemCount,
    updateCartItemCountAsyncState,
  } = useCartItem(cartId);

  const { checkedProductIds, checkedProductIdsDispatch } =
    useCheckedProductIds(cartItemsAsyncState);

  const cartItems =
    cartItemsAsyncState.status === "success" ? cartItemsAsyncState.data : [];

  const handleDeleteCartItem = async (productId: number) => {
    if (deleteCartItemAsyncState.status === "loading") return;
    if (deleteCartItemAsyncState.status === "fail") {
      alert(deleteCartItemAsyncState.error.message);
    }

    await requestDeleteCartItem(productId);
    checkedProductIdsDispatch({ type: "remove", productId: productId });
  };

  const handleUpdateCartItemCount = (productId: number, itemCount: number) => {
    if (updateCartItemCountAsyncState.status === "loading") return;
    if (updateCartItemCountAsyncState.status === "fail") {
      alert(updateCartItemCountAsyncState.error.message);
    }
    requestUpdateCartItemCount(productId, itemCount);
  };

  const handleAllProductSelect = (nextChecked: boolean) => {
    if (nextChecked) {
      const allProductIds = cartItems.map((cartItem) => cartItem.id);
      checkedProductIdsDispatch({
        type: "insertAll",
        productIds: allProductIds,
      });
      return;
    }

    checkedProductIdsDispatch({ type: "init" });
  };

  const handleProductSelect = (productId: number, nextChecked: boolean) => {
    if (nextChecked) {
      checkedProductIdsDispatch({
        type: "insert",
        productId: productId,
      });
      return;
    }

    checkedProductIdsDispatch({
      type: "remove",
      productId: productId,
    });
  };

  return {
    cartItems,
    cartItemsAsyncState,
    checkedProductIds,
    handleDeleteCartItem,
    handleUpdateCartItemCount,
    handleAllProductSelect,
    handleProductSelect,
  };
};

export default useCartPage;
