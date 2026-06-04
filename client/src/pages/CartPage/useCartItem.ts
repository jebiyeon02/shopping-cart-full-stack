import { useEffect, useState } from "react";
import {
  deleteCartItem,
  getCartItems,
  type CartItemResponse,
} from "../../domain/cart/cart.api";
// import ApiError from "../../error/ApiError";

// 이 훅은 서버상태인 cartItem을 관리하는 훅임
// 실제로는 그럴일이 없겠지만, 비로그인 상태에서 여러 카트에 담을 수 있다고 가정
const useCartItem = (cartId: number) => {
  const [cartItems, setCartItems] = useState<CartItemResponse[] | null>(null);
  // TODO: api요청별로 asyncState 훅 사용 필요
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const fetchedCartItems = await getCartItems(cartId);

        setCartItems(fetchedCartItems);
      } catch (error) {
        //TODO: 커스텀 에러처리 필요
        alert(error);
      }
    };
    void loadCartItems();

    // TODO: cleanup 해보기
  }, [cartId]);

  // TODO: requestDeleteCartItem 네이밍 수정 필요
  const requestDeleteCartItem = async (productId: number) => {
    try {
      await deleteCartItem(cartId, productId);
    } catch (error) {
      //TODO: 커스텀 에러처리 필요
      alert(error);
    }
  };

  return { cartItems, requestDeleteCartItem };
};

export default useCartItem;
