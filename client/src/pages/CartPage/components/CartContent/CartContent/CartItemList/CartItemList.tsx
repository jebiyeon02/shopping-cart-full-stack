import type { CartItemResponse } from "../../../../../../domain/cart/cart.api";
import CartItem from "./CartItem";

const CartItemList = ({
  cartItems,
  onDeleteCartItem,
  onAllProductSelect,
  onProductSelect,
  checkedProductIds,
  isSelectAllProduct,
  onUpdateCartItemCount,
}: {
  cartItems: CartItemResponse[];
  onDeleteCartItem: (productId: number) => void;
  onAllProductSelect: (action: "check" | "uncheck") => void;
  onProductSelect: (productId: number, action: "check" | "uncheck") => void;
  checkedProductIds: number[];
  isSelectAllProduct: boolean;
  onUpdateCartItemCount: (productId: number, itemCount: number) => void;
}) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={isSelectAllProduct}
        onChange={() => {
          if (isSelectAllProduct) {
            onAllProductSelect("uncheck");
          } else {
            onAllProductSelect("check");
          }
        }}
      />
      전체 선택
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          onProductSelect={onProductSelect}
          onDeleteCartItem={onDeleteCartItem}
          onUpdateCartItemCount={onUpdateCartItemCount}
          isChecked={checkedProductIds.includes(cartItem.id)}
        />
      ))}
    </div>
  );
};

export default CartItemList;
