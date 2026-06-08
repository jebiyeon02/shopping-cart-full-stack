import { createContext, useContext, type ReactNode } from "react";
import { useCartItemSelection } from "./useCartItemSelection";
import { useCartContext } from "./CartContext";

// 일단 primitive 함수 내려주고 나중에 추상화 시키자
type CartSelectionContextValue = {
  selectedProductIds: number[];
  clearCartItemSelection: () => void;
  selectCartItem: (productId: number) => void;
  selectAllCartItems: (productIds: number[]) => void;
  unselectCartItem: (productId: number) => void;
};

// null로 두는 것은 Provider로 감싸진 곳이 아닌 곳에서 Context를 사용할 수도 있기 때문
export const CartSelectionContext =
  createContext<CartSelectionContextValue | null>(null);

export const CartSelectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // cartContext에 의존하고 있는데 이래도 괜찮을까?
  const { cartItemsAsyncState } = useCartContext();
  const cartItemSelection = useCartItemSelection(cartItemsAsyncState);
  const {
    selectedProductIds,
    clearCartItemSelection,
    selectCartItem,
    selectAllCartItems,
    unselectCartItem,
  } = cartItemSelection;

  return (
    <CartSelectionContext.Provider
      value={{
        selectedProductIds,
        clearCartItemSelection,
        selectCartItem,
        selectAllCartItems,
        unselectCartItem,
      }}
    >
      {children}
    </CartSelectionContext.Provider>
  );
};

export const useCartSelectionContext = () => {
  const cartSelectionContext = useContext(CartSelectionContext);

  if (!cartSelectionContext) {
    throw new Error(
      "useCartSelectionContext는 CartSelectionProvider 내부에서만 사용할 수 있습니다.",
    );
  }

  return cartSelectionContext;
};
