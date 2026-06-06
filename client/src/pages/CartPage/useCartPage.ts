import ApiError from "../../error/ApiError";
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
    try {
      await requestDeleteCartItem(productId);
      checkedProductIdsDispatch({ type: "remove", productId: productId });
    } catch (error) {
      // TODO: 리팩토링 필요
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  const handleUpdateCartItemCount = async (
    productId: number,
    itemCount: number,
  ) => {
    try {
      await requestUpdateCartItemCount(productId, itemCount);
    } catch (error) {
      // TODO: 리팩토링 필요
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
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
    deleteCartItemAsyncState,
    updateCartItemCountAsyncState,
    handleDeleteCartItem,
    handleUpdateCartItemCount,
    handleAllProductSelect,
    handleProductSelect,
  };
};

export default useCartPage;
