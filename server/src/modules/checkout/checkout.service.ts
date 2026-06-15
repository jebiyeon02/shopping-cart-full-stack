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
      .filter((cartItem) => selectedProductIds.includes(cartItem.id));
    const newCheckout = this.checkoutRepository.create(checkoutItems);

    return newCheckout.toJson().id;
  }
}

export default CheckoutService;
