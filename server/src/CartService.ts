import Cart from './Cart.js';
import { Product } from './ProductManager.js';

class CartService {
  private cart: Cart;

  constructor(private products: Array<Product & { id: number }>) {
    this.cart = new Cart();
  }

  updateCartOrderCount(id: number, orderCount: number) {
    const targetProduct = this.products.find((product) => product.id === id);

    if (!targetProduct) {
      // TODO: 에러 엔드포인트 및 메시지 정의 필요
      throw new Error('찾으시는 상품이 존재하지 않습니다.');
    }

    if (targetProduct.quantity < orderCount) {
      throw new Error('보유한 상품의 개수를 넘어섰습니다.');
    }

    this.cart.setOrderCount(id, orderCount);
  }
}

export default CartService;
