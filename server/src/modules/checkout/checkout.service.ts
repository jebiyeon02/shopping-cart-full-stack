import AppError from "../../errors/AppError.js";
import CartService from "../cart/cart.service.js";
import CouponService from "../coupon/coupon.service.js";
import { CheckoutRepository } from "./checkout.repository.js";

class CheckoutService {
  constructor(
    private checkoutRepository: CheckoutRepository,
    private cartService: CartService,
    private couponService: CouponService,
  ) {}

  createCheckout(cartId: number, selectedProductIds: number[]) {
    const checkoutItems = this.cartService
      .getCartItems(cartId)
      .filter((cartItem) => selectedProductIds.includes(cartItem.productId));

    const newCheckout = this.checkoutRepository.create(checkoutItems);

    return newCheckout.toJson().id;
  }

  getCheckoutContent(checkoutId: number) {
    const checkout = this.checkoutRepository.findById(checkoutId);
    if (!checkout) {
      throw new AppError("CHECKOUT_NOT_FOUND");
    }

    const { id, checkoutItems, remoteArea, appliedCouponIds, deliveryFee } =
      checkout.toJson();
    const orderPrice = checkout.getOrderPrice();
    const couponDiscountPrice = this.couponService.getTotalDiscountPrice(
      appliedCouponIds,
      orderPrice,
      checkoutItems,
      deliveryFee,
    );
    const totalPrice = orderPrice + deliveryFee - couponDiscountPrice;

    return {
      checkoutId: id,
      checkoutItems,
      appliedCouponIds,
      remoteArea,
      orderPrice,
      couponDiscountPrice,
      deliveryFee,
      totalPrice,
    };
  }

  updateRemoteArea(checkoutId: number, nextRemoteArea: boolean) {
    const checkout = this.checkoutRepository.findById(checkoutId);
    if (!checkout) {
      throw new AppError("CHECKOUT_NOT_FOUND");
    }

    // TODO: 상세 에러처리 필요
    checkout.updateRemoteArea(nextRemoteArea);
    if (nextRemoteArea) {
      checkout.updateDeliveryFee(6000);
    } else {
      checkout.updateDeliveryFee(3000);
    }

    return checkout.toJson().remoteArea;
  }

  getCheckoutCoupons(checkoutId: number, requestedAt: Date) {
    const checkout = this.checkoutRepository.findById(checkoutId);

    if (!checkout) {
      throw new Error("임시 영수증이 존재하지 않습니다.");
    }

    const { checkoutItems } = checkout.toJson();

    return this.couponService.getCoupons(checkoutItems, requestedAt);
  }

  applyCoupon(
    checkoutId: number,
    couponIds: [number?, number?],
    requestedAt: Date,
  ) {
    const checkout = this.checkoutRepository.findById(checkoutId);
    if (!checkout) {
      throw new AppError("CHECKOUT_NOT_FOUND");
    }
    if (couponIds.length >= 2) {
      // TODO: 커스텀 에러 처리 필요
      throw new Error("쿠폰은 2개까지 사용하실 수 있습니다.");
    }
    const unavailableCoupons = this.couponService
      .getCoupons(checkout.toJson().checkoutItems, requestedAt)
      .filter((coupon) => !coupon.isAvailable);

    if (unavailableCoupons.some((coupon) => couponIds.includes(coupon.id))) {
      // TODO: 커스텀 에러 처리 필요
      throw new Error("사용 불가능한 쿠폰이 존재합니다.");
    }

    checkout.updateAppliedCoupons(couponIds);

    return checkout.toJson().appliedCouponIds;
  }
}

export default CheckoutService;
