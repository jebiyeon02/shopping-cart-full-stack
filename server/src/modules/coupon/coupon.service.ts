import { CheckoutItem } from "../checkout/Checkout.js";
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

  getTotalDiscountPrice(
    couponIds: [number?, number?],
    orderPrice: number,
    checkoutItems: CheckoutItem[],
    deliveryFee: number,
  ) {
    const coupons = couponIds
      .filter((couponId) => couponId !== undefined)
      .map((couponId) => {
        const coupon = this.couponRepository.findById(couponId);

        if (!coupon) {
          // TODO: 커스텀 에러 처리하기
          throw new Error("쿠폰이 존재하지 않습니다.");
        }

        return coupon;
      });

    // 정액쿠폰 먼저 적용하도록 정렬
    coupons.sort((a, b) => {
      if (a.getDiscountType() === b.getDiscountType()) {
        return 0;
      }

      return a.getDiscountType() === "fixed" ? -1 : 1;
    });

    let targetPrice = orderPrice;
    let totalDiscountPrice = 0;

    coupons.forEach((coupon) => {
      const discountPrice = coupon.getDiscountAmount({
        targetPrice,
        checkoutItems,
        deliveryFee,
      });

      totalDiscountPrice += discountPrice;
    });

    return totalDiscountPrice;
  }

  getDiscountPrice(
    couponId: number,
    orderPrice: number,
    checkoutItems: CheckoutItem[],
    deliveryFee: number,
  ) {
    const coupon = this.couponRepository.findById(couponId);
    if (!coupon) {
      // TODO: 커스텀 에러처리하기
      throw new Error("쿠폰이 존재하지 않습니다.");
    }

    return coupon.getDiscountAmount({
      targetPrice: orderPrice,
      checkoutItems,
      deliveryFee,
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
