import { describe, expect, test } from "vitest";
import { formatPrice } from "../../../shared/utils";

describe("formatPrice", () => {
  test("숫자를 천 단위 구분자가 포함된 문자열로 변환한다", () => {
    expect(formatPrice(1000)).toBe("1,000");
    expect(formatPrice(1234567)).toBe("1,234,567");
  });

  test("0은 그대로 문자열 0으로 변환한다", () => {
    expect(formatPrice(0)).toBe("0");
  });
});
