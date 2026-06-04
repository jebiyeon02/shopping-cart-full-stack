import Header from "../../shared/components/Header";
import CartContent from "./components/CartContent/CartContent/CartContent";
import CartEmpty from "./components/CartEmpty";
import BaseButton from "../../shared/components/BaseButton";
import useCartItem from "./useCartItem";

const CartPage = ({ cartId }: { cartId: number }) => {
  const { cartItems } = useCartItem(cartId);
  return (
    <div>
      <Header />
      {cartItems && <CartContent cartItems={cartItems} />}
      <CartEmpty />
      <BaseButton />
    </div>
  );
};

export default CartPage;
