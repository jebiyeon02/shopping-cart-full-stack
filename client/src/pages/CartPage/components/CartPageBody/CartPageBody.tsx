import CartContent from "./CartContent/CartContent";

import CartFail from "./CartFail";
import CartLoading from "./CartLoading";
import CartEmpty from "./CartEmpty";
import { useCartContext } from "../../CartContext";

const CartPageBody = () => {
  const { cartItems, getCartItemsAsyncState } = useCartContext();

  switch (getCartItemsAsyncState.status) {
    case "idle": {
      return <CartLoading />;
    }
    case "loading": {
      return <CartLoading />;
    }
    case "fail": {
      return <CartFail message={getCartItemsAsyncState.error.message} />;
    }
    case "success": {
      return cartItems.length === 0 ? <CartEmpty /> : <CartContent />;
    }
    default: {
      return <CartFail message="알 수 없는 에러가 발생했습니다." />;
    }
  }
};

export default CartPageBody;
