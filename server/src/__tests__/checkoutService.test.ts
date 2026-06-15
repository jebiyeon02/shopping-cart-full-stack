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

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    cartRepository = new InMemoryCartRepository();
    checkoutRepository = new InMemoryCheckoutRepository();

    productService = new ProductService(productRepository, cartRepository);
    cartService = new CartService(cartRepository, productRepository);
    checkoutService = new CheckoutService(checkoutRepository, cartService);
  });

  test("임시 영수증을 생성하면 생성된 영수증 id를 반환한다.", () => {
    // given
    const cartId = 1;
    const selectedProductIds = [1, 2];

    // when
    const newCheckoutId = checkoutService.createCheckout(
      cartId,
      selectedProductIds,
    );

    // then
    expect(newCheckoutId).toBe(1);
  });
});
