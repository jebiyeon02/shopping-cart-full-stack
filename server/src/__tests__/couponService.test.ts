import { InMemoryCartRepository } from "../modules/cart/cart.repository.js";
import CartService from "../modules/cart/cart.service.js";
import { InMemoryCheckoutRepository } from "../modules/checkout/checkout.repository.js";
import CheckoutService from "../modules/checkout/checkout.service.js";
import { InMemoryCouponRepository } from "../modules/coupon/coupon.repository.js";
import CouponService from "../modules/coupon/coupon.service.js";
import { InMemoryProductRepository } from "../modules/product/product.repository.js";
import ProductService from "../modules/product/product.service.js";

describe("쿠폰 테스트", () => {
  let productRepository: InMemoryProductRepository;
  let cartRepository: InMemoryCartRepository;
  let checkoutRepository: InMemoryCheckoutRepository;
  let couponRepository: InMemoryCouponRepository;

  let productService: ProductService;
  let cartService: CartService;
  let checkoutService: CheckoutService;
  let couponService: CouponService;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    cartRepository = new InMemoryCartRepository();
    checkoutRepository = new InMemoryCheckoutRepository();
    couponRepository = new InMemoryCouponRepository();

    productService = new ProductService(productRepository, cartRepository);
    cartService = new CartService(cartRepository, productRepository);
    checkoutService = new CheckoutService(checkoutRepository, cartService);
    couponService = new CouponService(couponRepository, checkoutService);
  });

  test("쿠폰을 생성하면 생성된 쿠폰 id를 반환한다.", () => {
    // given

    // when
    const newCouponId = couponService.createCoupon({
      baseInformation: {
        name: "5,000원 할인 쿠폰",
        type: "FIXED5000",
        expiryDate: new Date("2026-11-30T23:59:59"),
      },
      discountPolicy: {
        fixedDiscountPrice: 5000,
        fixedDiscountRate: null,
      },
      condition: {
        minAmount: 100000,
        startTime: null,
        endTime: null,
      },
    });

    // then
    expect(newCouponId).toBe(1);
  });
});
