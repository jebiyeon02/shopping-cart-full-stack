import Checkout, { CheckOutItem } from "./Checkout.js";

export interface CheckoutRepository {
  create(checkoutItems: CheckOutItem[]): Checkout;
  findById(checkoutId: number): Checkout | undefined;
}

export class InMemoryCheckoutRepository implements CheckoutRepository {
  private checkouts: Array<Checkout> = [];
  private id = 1;

  create(checkoutItems: CheckOutItem[]) {
    const checkout = new Checkout(this.id, checkoutItems);

    this.checkouts.push(checkout);
    this.id++;

    return checkout;
  }

  findById(cartId: number) {
    return this.checkouts.find((cart) => cart.isSameId(cartId));
  }
}
