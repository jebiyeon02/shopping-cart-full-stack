import AppError from "../../errors/AppError.js";
import CartService from "../cart/cart.service.js";
import { CartItemType } from "../cart/CartItem.js";
import { CheckoutRepository } from "./checkout.repository.js";

class CheckoutService {
  constructor(
    private checkoutRepository: CheckoutRepository,
    private cartService: CartService,
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

    const { id, checkoutItems, remoteArea, couponDiscountPrice, deliveryFee } =
      checkout.toJson();
    const orderPrice = checkout.getOrderPrice();
    const totalPrice = checkout.getTotalPrice();

    return {
      checkoutId: id,
      checkoutItems,
      remoteArea,
      orderPrice,
      couponDiscountPrice,
      deliveryFee,
      totalPrice,
    };
  }
}

export default CheckoutService;
