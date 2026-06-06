import { describe, expect, test } from "vitest";
import ApiError from "../../../error/ApiError";
import { normalizeError } from "../../../error/normalizeError";

describe("normalizeError", () => {
  test("ApiError는 code와 message를 유지한다", () => {
    const error = new ApiError(
      "CART_ITEMS_FETCH_FAILED",
      "장바구니 정보를 불러오지 못했습니다.",
    );

    expect(normalizeError(error)).toEqual({
      code: "CART_ITEMS_FETCH_FAILED",
      message: "장바구니 정보를 불러오지 못했습니다.",
    });
  });

  test("알 수 없는 에러는 기본 메시지로 변환한다", () => {
    expect(normalizeError(new Error("unexpected"))).toEqual({
      message: "알 수 없는 에러가 발생했습니다.",
    });
  });
});
