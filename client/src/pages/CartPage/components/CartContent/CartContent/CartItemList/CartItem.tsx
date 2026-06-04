import type { CartItemResponse } from "../../../../../../domain/cart/cart.api";

const CartItem = ({ cartItem }: { cartItem: CartItemResponse }) => {
  return (
    <div>{`${cartItem.name}, ${cartItem.price}, ${cartItem.itemCount}`}</div>
  );
};

export default CartItem;
