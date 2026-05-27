type CartItem = Map<number, number>;

class Cart {
  private cartItems: CartItem;

  constructor() {
    this.cartItems = new Map();

    // 추가가 없기 때문에 mockData 사용
    this.cartItems.set(1, 10);
    this.cartItems.set(2, 5);
  }

  //   private validateOrderCount(quantity: number) {
  //     if (!quantity && quantity !== 0) {
  //       throw new Error('재고 필드가 누락되었습니다.');
  //     }
  //     if (typeof quantity === 'string' || quantity < 1 || quantity > 99) {
  //       throw new Error('상품 재고는 1이상 99이하의 정수이어야 합니다.');
  //     }
  //   }

  setOrderCount(id: number, orderCount: number) {
    if (typeof orderCount === 'string' || orderCount < 1) {
      throw new Error('변경할 수량은 0보다 큰 숫자여야 합니다.');
    }
    this.cartItems.set(id, orderCount);
  }

  getOrderCount(id: number) {
    return this.cartItems.get(id);
  }
}

export default Cart;
