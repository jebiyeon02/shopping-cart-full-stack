import CartContent from "./CartContent/CartContent";
import type { CartItemModel } from "../../../../domain/cart/cart.api";
import type { AsyncState } from "../../../../shared/useAsyncState";
import CartFail from "./CartFail";
import CartLoading from "./CartLoading";
import CartEmpty from "./CartEmpty";

const CartPageBody = ({
  cartItems,
  checkedProductIds,
  orderPrice,
  deliveryFee,
  cartItemsAsyncState,
  deleteCartItemAsyncState,
  updateCartItemCountAsyncState,
  onDeleteCartItem,
  onUpdateCartItemCount,
  onAllProductSelect,
  onProductSelect,
}: {
  cartItems: CartItemModel[];
  checkedProductIds: number[];
  orderPrice: number;
  deliveryFee: number;
  cartItemsAsyncState: AsyncState<CartItemModel[]>;
  deleteCartItemAsyncState: AsyncState<null>;
  updateCartItemCountAsyncState: AsyncState<{
    id: number;
    itemCount: number;
  }>;
  onDeleteCartItem: (productId: number) => void;
  onUpdateCartItemCount: (productId: number, itemCount: number) => void;
  onAllProductSelect: (nextChecked: boolean) => void;
  onProductSelect: (productId: number, nextChecked: boolean) => void;
}) => {
  switch (cartItemsAsyncState.status) {
    case "idle": {
      return <CartLoading />;
    }
    case "loading": {
      return <CartLoading />;
    }
    case "fail": {
      return <CartFail message={cartItemsAsyncState.error.message} />;
    }
    case "success": {
      return cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <CartContent
          cartItems={cartItems}
          checkedProductIds={checkedProductIds}
          orderPrice={orderPrice}
          deliveryFee={deliveryFee}
          deleteCartItemAsyncState={deleteCartItemAsyncState}
          updateCartItemCountAsyncState={updateCartItemCountAsyncState}
          onDeleteCartItem={onDeleteCartItem}
          onUpdateCartItemCount={onUpdateCartItemCount}
          onAllProductSelect={onAllProductSelect}
          onProductSelect={onProductSelect}
        />
      );
    }
    default: {
      return <CartFail message="알 수 없는 에러가 발생했습니다." />;
    }
  }
};

export default CartPageBody;
