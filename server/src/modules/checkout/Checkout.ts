import CartItem, { CartItemType } from "../cart/CartItem.js";
import { ProductType } from "../product/Product.js";

export type CheckOutItem = Pick<
  ProductType,
  "id" | "imgUrl" | "name" | "price"
> &
  Pick<CartItemType, "itemCount">;

class Checkout {
  #remoteArea: boolean;
  #couponDiscountPrice: number;
  #deliveryFee: number;
  constructor(
    private id: number,
    private checkoutItems: CheckOutItem[],
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
}

export default Checkout;
