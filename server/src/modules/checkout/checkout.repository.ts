import Checkout from "./Checkout.js";

export interface CheckoutRepository {
  create(cartId: number, selectedProductIds: number[]): Checkout;
  findById(checkoutId: number): Checkout | undefined;
}

export class InMemoryCheckoutRepository implements CheckoutRepository {
  private checkouts: Array<Checkout> = [];
  private id = 1;

  create(cartId: number, selectedProductIds: number[]) {
    const checkout = new Checkout(this.id, cartId, selectedProductIds);

    this.checkouts.push(checkout);
    this.id++;

    return checkout;
  }

  findById(cartId: number) {
    return this.checkouts.find((cart) => cart.isSameId(cartId));
  }
}
