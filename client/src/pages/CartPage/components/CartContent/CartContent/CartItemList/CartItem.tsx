import type { CartItemResponse } from "../../../../../../domain/cart/cart.api";

const CartItem = ({
  cartItem,
  onDeleteCartItem,
}: {
  cartItem: CartItemResponse;
  onDeleteCartItem: (productId: number) => void;
}) => {
  const { id, name, price, itemCount, imgUrl } = cartItem;
  return (
    <div>
      {`${name}, ${price}, ${itemCount}`}
      <button type="button" onClick={() => onDeleteCartItem(id)}>
        삭제하기
      </button>
    </div>
  );
};

export default CartItem;
