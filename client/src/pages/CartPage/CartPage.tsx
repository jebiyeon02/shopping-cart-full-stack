import Header from "../../shared/components/Header";
import CartContent from "./components/CartContent/CartContent/CartContent";
import CartEmpty from "./components/CartEmpty";
import BaseButton from "../../shared/components/BaseButton";
import useCartItem from "./useCartItem";

const CartPage = ({ cartId }: { cartId: number }) => {
  const { cartItems, requestDeleteCartItem, requestUpdateCartItemCount } =
    useCartItem(cartId);
  return (
    <div>
      <Header actionIcon={<div>SHOP</div>} />
      {cartItems && (
        <CartContent
          cartItems={cartItems}
          onDeleteCartItem={requestDeleteCartItem}
          onUpdateCartItemCount={requestUpdateCartItemCount}
        />
      )}
      <CartEmpty />
      <BaseButton>주문 확인</BaseButton>
    </div>
  );
};

export default CartPage;
