import { useEffect, useState } from "react";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemCount,
  type CartItemResponse,
} from "../../domain/cart/cart.api";
import { errorHandler } from "../../error/errorHandler";
// import ApiError from "../../error/ApiError";

// 이 훅은 서버상태인 cartItem을 관리하는 훅임
// 실제로는 그럴일이 없겠지만, 비로그인 상태에서 여러 카트에 담을 수 있다고 가정
const useCartItem = (cartId: number) => {
  const [cartItems, setCartItems] = useState<CartItemResponse[] | null>(null);

  const loadCartItems = async () => {
    try {
      const fetchedCartItems = await getCartItems(cartId);

      setCartItems(fetchedCartItems);
    } catch (error) {
      errorHandler(error);
    }
  };

  // TODO: api요청별로 asyncState 훅 사용 필요
  useEffect(() => {
    void loadCartItems();

    // TODO: cleanup 해보기
  }, [cartId]);

  const requestDeleteCartItem = async (productId: number) => {
    try {
      await deleteCartItem(cartId, productId);
      await loadCartItems();
    } catch (error) {
      errorHandler(error);
    }
  };

  const requestUpdateCartItemCount = async (
    productId: number,
    itemCount: number,
  ) => {
    try {
      await updateCartItemCount(cartId, productId, itemCount);
      await loadCartItems();
    } catch (error) {
      errorHandler(error);
    }
  };

  return { cartItems, requestDeleteCartItem, requestUpdateCartItemCount };
};

export default useCartItem;
