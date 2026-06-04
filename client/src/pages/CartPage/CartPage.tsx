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
      <Header />
      {cartItems && (
        <CartContent
          cartItems={cartItems}
          onDeleteCartItem={requestDeleteCartItem}
          onUpdateCartItemCount={requestUpdateCartItemCount}
        />
      )}
      <CartEmpty />
      <BaseButton />
    </div>
  );
};

export default CartPage;
