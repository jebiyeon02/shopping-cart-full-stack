import { createContext, useContext, type ReactNode } from "react";
import {
  useCheckedProductIds,
  type CheckedProductIdsReducerAction,
} from "./useCheckedProductIds";
import { useCartContext } from "./CartContext";

// 일단 primitive 함수 내려주고 나중에 추상화 시키자
type CheckedProductContextValue = {
  checkedProductIds: number[];
  checkedProductIdsDispatch: React.ActionDispatch<
    [action: CheckedProductIdsReducerAction]
  >;
};

// null로 두는 것은 Provider로 감싸진 곳이 아닌 곳에서 Context를 사용할 수도 있기 때문
export const CheckedProductContext =
  createContext<CheckedProductContextValue | null>(null);

export const CheckedProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // cartContext에 의존하고 있는데 이래도 괜찮을까?
  const { cartItemsAsyncState } = useCartContext();
  const checkedProductController = useCheckedProductIds(cartItemsAsyncState);
  const { checkedProductIds, checkedProductIdsDispatch } =
    checkedProductController;

  return (
    <CheckedProductContext.Provider
      value={{
        checkedProductIds,
        checkedProductIdsDispatch,
      }}
    >
      {children}
    </CheckedProductContext.Provider>
  );
};

export const useCheckedProductContext = () => {
  const checkedProductContext = useContext(CheckedProductContext);

  if (!checkedProductContext) {
    throw new Error(
      "useCheckedProductContext는 CheckedProductProvider 내부에서만 사용할 수 있습니다.",
    );
  }

  return checkedProductContext;
};
