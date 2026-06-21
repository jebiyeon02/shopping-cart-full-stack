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
    const cartItemIds = this.cartService
      .getCartItems(cartId)
      .map((item) => item.productId);

    if (
      !selectedProductIds.every((selectedId) =>
        cartItemIds.includes(selectedId),
      )
    ) {
      throw new AppError("PRODUCT_NOT_EXIST_IN_CART");
    }

    const checkoutItems = this.cartService
      .getCartItems(cartId)
      .filter((cartItem) => selectedProductIds.includes(cartItem.productId));

    const newCheckout = this.checkoutRepository.create(checkoutItems);

    return newCheckout.toJson().id;
  }

  getCheckoutContent(checkoutId: number) {
    const checkout = this.#findCheckout(checkoutId);

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
    const checkout = this.#findCheckout(checkoutId);

    checkout.updateRemoteArea(nextRemoteArea);
    if (nextRemoteArea) {
      checkout.updateDeliveryFee(6000);
    } else {
      checkout.updateDeliveryFee(3000);
    }

    return checkout.toJson().remoteArea;
  }

  getCheckoutCoupons(checkoutId: number, requestedAt: Date) {
    const checkout = this.#findCheckout(checkoutId);

    const { checkoutItems } = checkout.toJson();

    return this.couponService.getCoupons(checkoutItems, requestedAt);
  }

  getCheckoutRecommendedCouponIds(checkoutId: number, requestedAt: Date) {
    const checkout = this.#findCheckout(checkoutId);
    const { checkoutItems } = checkout.toJson();

    const orderPrice = checkout.getOrderPrice();
    const deliveryFee = checkout.toJson().deliveryFee;
    const recommendedCouponIds = this.couponService.getRecommendedCouponIds(
      orderPrice,
      checkoutItems,
      deliveryFee,
      requestedAt,
    );

    return recommendedCouponIds;
  }

  applyCoupon(
    checkoutId: number,
    couponIds: [number?, number?],
    requestedAt: Date,
  ) {
    const checkout = this.#findCheckout(checkoutId);
    this.validateCoupons(checkoutId, couponIds, requestedAt);

    checkout.updateAppliedCoupons(couponIds);

    return checkout.toJson().appliedCouponIds;
  }

  validateCoupons(
    checkoutId: number,
    couponIds: [number?, number?],
    requestedAt: Date,
  ) {
    const checkout = this.#findCheckout(checkoutId);

    const { checkoutItems } = checkout.toJson();

    const allCouponIds = this.couponService
      .getCoupons(checkoutItems, requestedAt)
      .map((coupon) => coupon.id);

    if (
      !couponIds.every(
        (couponId) => couponId && allCouponIds.includes(couponId),
      )
    ) {
      throw new AppError("COUPON_NOT_FOUND");
    }

    if (couponIds.length > 2) {
      throw new AppError("COUPON_APPLY_COUNT_EXCEEDED");
    }
    const unavailableCoupons = this.couponService
      .getCoupons(checkout.toJson().checkoutItems, requestedAt)
      .filter((coupon) => !coupon.isAvailable);

    if (unavailableCoupons.some((coupon) => couponIds.includes(coupon.id))) {
      throw new AppError("UNAVIALABLE_COUPON_EXIST");
    }
  }

  #findCheckout(checkoutId: number) {
    const checkout = this.checkoutRepository.findById(checkoutId);
    if (!checkout) {
      throw new AppError("CHECKOUT_NOT_FOUND");
    }

    return checkout;
  }
}

export default CheckoutService;
