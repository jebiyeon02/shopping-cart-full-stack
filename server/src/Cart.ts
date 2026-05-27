type CartItem = Map<number, number>;

class Cart {
  private cartItems: CartItem;

  constructor() {
    this.cartItems = new Map();

    // 추가가 없기 때문에 mockData 사용
    this.cartItems.set(1, 10);
    this.cartItems.set(2, 5);
  }

  private validateOrderCount(id: number, orderCount: number) {
    if (!this.cartItems.has(id)) {
      throw new Error('수량을 변경하려는 상품이 존재하지 않습니다.');
    }

    if (!orderCount && orderCount !== 0) {
      throw new Error('주문 수량 필드가 누락되었습니다.');
    }

    if (typeof orderCount === 'string' || orderCount < 1) {
      throw new Error('변경할 수량은 0보다 큰 숫자여야 합니다.');
    }
  }

  setOrderCount(id: number, orderCount: number) {
    this.validateOrderCount(id, orderCount);
    this.cartItems.set(id, orderCount);
  }

  deleteCartItem(id: number) {
    this.cartItems.delete(id);
  }

  getOrderCount(id: number) {
    return this.cartItems.get(id);
  }
}

export default Cart;
