import { describe, expect, test } from "vitest";
import { checkedProductIdsReducer } from "../../../pages/CartPage/useCheckedProductIds";

describe("checkedProductIdsReducer", () => {
  test("init 액션은 선택된 상품 id 목록을 비운다", () => {
    expect(checkedProductIdsReducer([1, 2, 3], { type: "init" })).toEqual([]);
  });

  test("insert 액션은 상품 id를 추가한다", () => {
    expect(
      checkedProductIdsReducer([1, 2], { type: "insert", productId: 3 }),
    ).toEqual([1, 2, 3]);
  });

  test("insert 액션은 이미 존재하는 상품 id를 중복 추가하지 않는다", () => {
    expect(
      checkedProductIdsReducer([1, 2], { type: "insert", productId: 2 }),
    ).toEqual([1, 2]);
  });

  test("insertAll 액션은 여러 상품 id를 추가하고 중복을 제거한다", () => {
    expect(
      checkedProductIdsReducer([1], {
        type: "insertAll",
        productIds: [1, 2, 3],
      }),
    ).toEqual([1, 2, 3]);
  });

  test("remove 액션은 상품 id를 제거한다", () => {
    expect(
      checkedProductIdsReducer([1, 2, 3], { type: "remove", productId: 2 }),
    ).toEqual([1, 3]);
  });
});
