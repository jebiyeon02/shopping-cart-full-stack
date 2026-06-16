import AppError from "../../errors/AppError.js";
import { CouponItem } from "./Coupon.js";
import { mockCouponData } from "./coupon.mock.js";
import { CouponRepository } from "./coupon.repository.js";

class CheckoutService {
  constructor(
    private couponRepository: CouponRepository,
    private checkoutService: CheckoutService,
  ) {
    // 초기 쿠폰 생성
    mockCouponData.forEach((couponData) =>
      this.createCoupon({ ...couponData }),
    );
  }

  createCoupon({
    baseInformation,
    discountPolicy,
    condition,
  }: Omit<CouponItem, "id">) {
    const newCoupon = this.couponRepository.create({
      baseInformation,
      discountPolicy,
      condition,
    });

    return newCoupon.toJson().id;
  }
}

export default CheckoutService;
