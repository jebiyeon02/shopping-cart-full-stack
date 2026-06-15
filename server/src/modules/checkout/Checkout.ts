class Checkout {
  #remoteArea: boolean;
  #couponDiscountPrice: number;
  #deliveryFee: number;
  constructor(
    private id: number,
    private cartId: number,
    private selectedProductIds: number[],
  ) {
    this.#remoteArea = false;
    this.#couponDiscountPrice = 0;
    this.#deliveryFee = 3000;
  }

  toJson() {
    return {
      id: this.id,
      cartId: this.cartId,
      checkoutProductIds: this.selectedProductIds,
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
