import AppError from "../errors/AppError.js";
import CartService from "../modules/cart/cart.service.js";
import ProductService from "../modules/product/product.service.js";
import { InMemoryCartRepository } from "../modules/cart/cart.repository.js";
import { InMemoryProductRepository } from "../modules/product/product.repository.js";
import {
  CheckoutRepository,
  InMemoryCheckoutRepository,
} from "../modules/checkout/checkout.repository.js";
import CheckoutService from "../modules/checkout/checkout.service.js";

const mockProduct = {
  name: "아디다스 양말",
  price: 13000,
  imgUrl: "https://image-url.com",
  quantity: 10,
};

describe("임시 영수증 서비스 테스트", () => {
  let productRepository: InMemoryProductRepository;
  let cartRepository: InMemoryCartRepository;
  let checkoutRepository: CheckoutRepository;
  let productService: ProductService;
  let cartService: CartService;
  let checkoutService: CheckoutService;
  let productId: number;
  let cartId: number;
  let checkoutId: number;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    cartRepository = new InMemoryCartRepository();
    checkoutRepository = new InMemoryCheckoutRepository();

    productService = new ProductService(productRepository, cartRepository);
    cartService = new CartService(cartRepository, productRepository);
    checkoutService = new CheckoutService(checkoutRepository, cartService);

    // 상품 생성, 해당 상품을 장바구니에 추가, 임시 영수증 생성
    productId = productService.addProduct(mockProduct);
    cartId = cartService.addCart();
    const cartItemCount = 5;
    cartService.addCartItem(cartId, productId, cartItemCount);
    const selectedProductIds = [1];
    checkoutId = checkoutService.createCheckout(cartId, selectedProductIds);
  });

  test("임시 영수증을 생성하면 생성된 영수증 id를 반환한다.", () => {
    // given

    const selectedProductIds = [1];

    // when
    const newCheckoutId = checkoutService.createCheckout(
      cartId,
      selectedProductIds,
    );

    // then
    expect(newCheckoutId).toBe(2);
  });

  test("존재하는 영수증의 정보를 반환한다.", () => {
    // when
    const checkoutContent = checkoutService.getCheckoutContent(checkoutId);

    // then
    expect(checkoutContent).toEqual({
      checkoutId: 1,
      checkoutItems: [
        {
          productId: 1,
          name: "아디다스 양말",
          price: 13000,
          imgUrl: "https://image-url.com",
          itemCount: 5,
        },
      ],
      remoteArea: false,
      orderPrice: 65000,
      couponDiscountPrice: 0,
      deliveryFee: 3000,
      totalPrice: 68000,
    });
  });
});
