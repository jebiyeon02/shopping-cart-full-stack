import Cart from '../Cart.js';
import CartService from '../CartService.js';
import ProductManager from '../ProductManager.js';

describe('장바구니 상품 수량 변경 기능 테스트', () => {
  test('상품 1개를 추가하면, 해당 상품의 주문 수량이 1 증가한다.', () => {
    // given
    const cart = new Cart();
    const productId = 1;
    const orderCount = 5;

    // when
    cart.setOrderCount(productId, orderCount);

    // then
    expect(cart.getOrderCount(productId)).toBe(orderCount);
  });

  test('상품 1개를 줄이면, 해당 상품의 주문 수량이 1 감소한다.', () => {
    // given
    const cart = new Cart();
    const productId = 1;
    const orderCount = 2;

    // when
    cart.setOrderCount(productId, orderCount);

    // then
    expect(cart.getOrderCount(productId)).toBe(orderCount);
  });
});

describe('장바구니 상품 수량 변경 예외 테스트', () => {
  test('상품 재고보다 더 많은 수량으로 변경 시 에러를 발생시킨다.', () => {
    // given
    const mockProducts = [
      {
        // id: 1
        name: '아디다스양말',
        price: 5000,
        imgUrl: 'https://abc.com',
        quantity: 10,
      },
      {
        // id: 2
        name: '나이키양말',
        price: 7000,
        imgUrl: 'https://abc.com',
        quantity: 20,
      },
    ];

    const productManager = new ProductManager();
    mockProducts.forEach((product) => {
      productManager.addProduct(product);
    });

    const cartService = new CartService(productManager.getProducts());
    const productId = 1;
    const orderCount = 11;

    // when & then
    expect(() => {
      cartService.updateCartOrderCount(productId, orderCount);
    }).toThrow('보유한 상품의 개수를 넘어섰습니다.');
  });

  test('상품 수량이 1 이상의 정수가 아닐때 에러를 발생시킨다.', () => {
    // given
    const cart = new Cart();
    const productId = 1;

    // when & then
    expect(() => {
      // @ts-ignore 예외 처리를 위한 타입 무시
      cart.setOrderCount(productId, 'abc');
    }).toThrow('변경할 수량은 0보다 큰 숫자여야 합니다.');

    expect(() => {
      // @ts-ignore 예외 처리를 위한 타입 무시
      cart.setOrderCount(productId, '2');
    }).toThrow('변경할 수량은 0보다 큰 숫자여야 합니다.');
  });
});

// 1. 남아있는 재고보다 더 많은 값으로 변경하려고 함
// 2. 에러가 발생해야되는 것을 테스트 해야 함.
