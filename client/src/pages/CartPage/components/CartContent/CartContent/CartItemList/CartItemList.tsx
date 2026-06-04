import type { CartItemResponse } from "../../../../../../domain/cart/cart.api";
import CartItem from "./CartItem";

const CartItemList = ({
  cartItems,
  onDeleteCartItem,
}: {
  cartItems: CartItemResponse[];
  onDeleteCartItem: (productId: number) => void;
}) => {
  return (
    <div>
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          onDeleteCartItem={onDeleteCartItem}
        />
      ))}
    </div>
  );
};

export default CartItemList;
