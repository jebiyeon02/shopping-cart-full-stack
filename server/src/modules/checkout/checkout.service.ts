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

    return checkout.toJson().remoteArea;
  }
}

export default CheckoutService;
