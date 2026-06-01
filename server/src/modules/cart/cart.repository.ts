import Cart from "./Cart.js";

export interface CartRepository {
  create(): Cart;
  findById(cartId: number): Cart | undefined;
}

export class InMemoryCartRepository implements CartRepository {
  private carts: Array<Cart> = [];
  private id = 1;

  create() {
    const cart = new Cart(this.id);

    this.carts.push(cart);
    this.id++;

    return cart;
  }

  findById(cartId: number) {
    return this.carts.find((cart) => cart.isSameId(cartId));
  }
}
