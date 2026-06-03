import { useState } from "react";
import Header from "../../shared/components/Header";
import CartContent from "./components/CartContent/CartContent/CartContent";
import CartEmpty from "./components/CartEmpty";
import BaseButton from "../../shared/components/BaseButton";
import type { CartItemResponse } from "../../domain/cart/cart.api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[] | null>(null);

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
