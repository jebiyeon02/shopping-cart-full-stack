export const checkedproductIdsReducer = (
  productIds: number[],
  action: {
    type: "init" | "insert" | "remove";
    productId?: number | number[];
  },
) => {
  switch (action.type) {
    case "init": {
      return [];
    }
    case "insert": {
      if (!action.productId) return productIds;
      if (Array.isArray(action.productId)) {
        return Array.from(new Set([...productIds, ...action.productId]));
      }

      return Array.from(new Set([...productIds, action.productId]));
    }
    case "remove": {
      return productIds.filter((id) => id !== action.productId);
    }
  }
};
