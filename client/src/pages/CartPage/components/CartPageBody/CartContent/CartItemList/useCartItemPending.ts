import { useState } from "react";

const useCartItemPending = () => {
  const [pendingProductIds, setPendingProductIds] = useState<number[]>([]);

  const addToPendingList = (productId: number) => {
    setPendingProductIds((prev) => Array.from(new Set([...prev, productId])));
  };

  const deleteFromPendingList = (productId: number) => {
    setPendingProductIds((prev) => prev.filter((id) => id !== productId));
  };

  return { pendingProductIds, addToPendingList, deleteFromPendingList };
};

export default useCartItemPending;
