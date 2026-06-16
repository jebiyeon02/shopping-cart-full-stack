import CheckoutService from "../checkout/checkout.service.js";
import { CouponItem } from "./Coupon.js";
import { mockCouponData } from "./coupon.mock.js";
import { CouponRepository } from "./coupon.repository.js";

class CouponService {
  constructor(
    private couponRepository: CouponRepository,
    private checkoutService: CheckoutService,
  ) {}

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

  getCoupons(checkoutId: number, requestedAt: Date) {
    const checkoutItems =
      this.checkoutService.getCheckoutContent(checkoutId).checkoutItems;
    const coupons = this.couponRepository.getCouponList();

    return coupons.map((coupon) => {
      const isAvailable = coupon.isAvailable({ checkoutItems, requestedAt });
      return {
        ...coupon.toJson(),
        isAvailable,
      };
    });
  }

  createBaseCoupon() {
    // 초기 쿠폰 생성 (하드코딩)
    mockCouponData.forEach((couponData) =>
      this.createCoupon({ ...couponData }),
    );
  }
}

export default CouponService;
