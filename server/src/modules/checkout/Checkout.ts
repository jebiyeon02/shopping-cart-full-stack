import CartItem, { CartItemType } from "../cart/CartItem.js";
import { ProductType } from "../product/Product.js";

export type CheckoutItem = Pick<ProductType, "imgUrl" | "name" | "price"> &
  CartItemType;

class Checkout {
  #remoteArea: boolean;
  #couponDiscountPrice: number;
  #deliveryFee: number;
  constructor(
    private id: number,
    private checkoutItems: CheckoutItem[],
  ) {
    this.#remoteArea = false;
    this.#couponDiscountPrice = 0;
    this.#deliveryFee = 3000;
  }

  toJson() {
    return {
      id: this.id,
      checkoutItems: this.checkoutItems,
      remoteArea: this.#remoteArea,
      couponDiscountPrice: this.#couponDiscountPrice,
      deliveryFee: this.#deliveryFee,
    };
  }

  isSameId(checkoutId: number) {
    return checkoutId === this.id;
  }

  getOrderPrice() {
    return this.checkoutItems.reduce(
      (total, item) => total + item.itemCount * item.price,
      0,
    );
  }

  getTotalPrice() {
    return this.getOrderPrice() + this.#deliveryFee - this.#couponDiscountPrice;
  }
}

export default Checkout;
