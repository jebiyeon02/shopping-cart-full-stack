import { describe, expect, test } from "vitest";
import { getOrderPrice } from "../../../domain/cart/cart.util";
import type { CartItemModel } from "../../../domain/cart/cart.api";

describe("getOrderPrice", () => {
  test("상품 가격과 수량을 곱한 값의 합계를 반환한다", () => {
    const cartItems: CartItemModel[] = [
      {
        id: 1,
        name: "테스트 상품 1",
        price: 10000,
        itemCount: 2,
      },
      {
        id: 2,
        name: "테스트 상품 2",
        price: 3000,
        itemCount: 3,
      },
    ];

    expect(getOrderPrice(cartItems)).toBe(29000);
  });

  test("상품 목록이 비어있으면 0을 반환한다", () => {
    expect(getOrderPrice([])).toBe(0);
  });
});
