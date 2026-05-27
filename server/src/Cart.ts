type CartItem = Map<number, number>;

class Cart {
  private cartItems: CartItem;

  constructor() {
    this.cartItems = new Map();

    // 추가가 없기 때문에 mockData 사용
    this.cartItems.set(1, 10);
    this.cartItems.set(2, 5);
  }

  setOrderCount(id: number, orderCount: number) {
    this.cartItems.set(id, orderCount);
  }

  getOrderCount(id: number) {
    return this.cartItems.get(id);
  }
}

export default Cart;
