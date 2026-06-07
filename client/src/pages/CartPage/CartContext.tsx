import { createContext, useContext, type ReactNode } from "react";
import type { CartItemModel } from "../../domain/cart/cart.api";
import type { AsyncState } from "../../shared/useAsyncState";
import useCartItem from "./useCartItem";

// 아마 각 AsyncState를 공유해줘야되는 문제는 나중에 asyncState개편때 해결 될 것이라고 생각함
type CartContextValue = {
  cartItems: CartItemModel[];
  cartItemsAsyncState: AsyncState<CartItemModel[]>;
  deleteCartItemAsyncState: AsyncState<null>;
  updateCartItemCountAsyncState: AsyncState<{
    id: number;
    itemCount: number;
  }>;
  requestDeleteCartItem: (productId: number) => Promise<void>;
  requestUpdateCartItemCount: (
    productId: number,
    itemCount: number,
  ) => Promise<void>;
};

type CartProviderProps = {
  cartId: number;
  children: ReactNode;
};

export const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ cartId, children }: CartProviderProps) => {
  const {
    cartItemsAsyncState,
    requestDeleteCartItem,
    deleteCartItemAsyncState,
    requestUpdateCartItemCount,
    updateCartItemCountAsyncState,
  } = useCartItem(cartId);

  const cartItems =
    cartItemsAsyncState.status === "success" ? cartItemsAsyncState.data : [];

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemsAsyncState,
        deleteCartItemAsyncState,
        updateCartItemCountAsyncState,
        requestDeleteCartItem,
        requestUpdateCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const cartContext = useContext(CartContext);

  if (cartContext === null) {
    throw new Error(
      "useCartContext는 CartProvider 내부에서만 사용할 수 있습니다.",
    );
  }

  return cartContext;
};
