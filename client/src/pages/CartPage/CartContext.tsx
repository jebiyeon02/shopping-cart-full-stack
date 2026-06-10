import { createContext, useContext, type ReactNode } from "react";
import type { CartItemModel } from "../../domain/cart/cart.api";
import type {
  AsyncState,
  ExecuteAsyncFunctionProps,
} from "../../shared/useAsyncTask";
import useCartItem from "./useCartItem";

type CartContextValue = {
  getCartItemsAsyncState: AsyncState<CartItemModel[]>;
  deleteCartItemAsyncState: AsyncState<void>;
  updateCartItemCountAsyncState: AsyncState<{
    id: number;
    itemCount: number;
  }>;
  requestGetCartItems: () => Promise<void>;
  requestDeleteCartItem: (
    productId: number,
    options: ExecuteAsyncFunctionProps<void>["options"],
  ) => Promise<void>;
  requestUpdateCartItemCount: (
    productId: number,
    itemCount: number,
    options: ExecuteAsyncFunctionProps<{
      id: number;
      itemCount: number;
    }>["options"],
  ) => Promise<void>;
};

type CartProviderProps = {
  cartId: number;
  children: ReactNode;
};

export const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ cartId, children }: CartProviderProps) => {
  const {
    requestGetCartItems,
    getCartItemsAsyncState,
    requestDeleteCartItem,
    deleteCartItemAsyncState,
    requestUpdateCartItemCount,
    updateCartItemCountAsyncState,
  } = useCartItem(cartId);

  return (
    <CartContext.Provider
      value={{
        getCartItemsAsyncState,
        deleteCartItemAsyncState,
        updateCartItemCountAsyncState,
        requestGetCartItems,
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
