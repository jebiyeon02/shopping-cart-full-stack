import type { CartItemResponse } from "../../../../../../domain/cart/cart.api";

const CartItem = ({
  cartItem,
  onDeleteCartItem,
  onProductSelect,
  onUpdateCartItemCount,
  isChecked,
}: {
  cartItem: CartItemResponse;
  onDeleteCartItem: (productId: number) => void;
  onProductSelect: (productId: number, action: "check" | "uncheck") => void;
  onUpdateCartItemCount: (productId: number, itemCount: number) => void;
  isChecked: boolean;
}) => {
  const { id, name, price, itemCount, imgUrl } = cartItem;
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          if (isChecked) {
            onProductSelect(id, "uncheck");
          } else {
            onProductSelect(id, "check");
          }
        }}
      />
      <button
        type="button"
        onClick={() => onUpdateCartItemCount(id, itemCount - 1)}
      >
        -
      </button>
      <button
        type="button"
        onClick={() => onUpdateCartItemCount(id, itemCount + 1)}
      >
        +
      </button>
      {`${name}, ${price}, ${itemCount}`}
      <button type="button" onClick={() => onDeleteCartItem(id)}>
        삭제하기
      </button>
    </div>
  );
};

export default CartItem;
