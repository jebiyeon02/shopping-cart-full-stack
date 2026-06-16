import { InMemoryCartRepository } from "../modules/cart/cart.repository.js";
import CartService from "../modules/cart/cart.service.js";
import { InMemoryCheckoutRepository } from "../modules/checkout/checkout.repository.js";
import CheckoutService from "../modules/checkout/checkout.service.js";
import { InMemoryCouponRepository } from "../modules/coupon/coupon.repository.js";
import CouponService from "../modules/coupon/coupon.service.js";
import { InMemoryProductRepository } from "../modules/product/product.repository.js";
import ProductService from "../modules/product/product.service.js";

const mockProduct = {
  name: "아디다스 양말",
  price: 13000,
  imgUrl: "https://image-url.com",
  quantity: 10,
};

const mockCouponData = {
  baseInformation: {
    name: "5,000원 할인 쿠폰",
    type: "FIXED5000",
    expiryDate: new Date("2026-06-10"),
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
};

describe("쿠폰 테스트", () => {
  let productRepository: InMemoryProductRepository;
  let cartRepository: InMemoryCartRepository;
  let checkoutRepository: InMemoryCheckoutRepository;
  let couponRepository: InMemoryCouponRepository;

  let productService: ProductService;
  let cartService: CartService;
  let checkoutService: CheckoutService;
  let couponService: CouponService;

  let productId: number;
  let cartId: number;
  let checkoutId: number;
  let couponId: number;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    cartRepository = new InMemoryCartRepository();
    checkoutRepository = new InMemoryCheckoutRepository();
    couponRepository = new InMemoryCouponRepository();

    productService = new ProductService(productRepository, cartRepository);
    cartService = new CartService(cartRepository, productRepository);
    checkoutService = new CheckoutService(checkoutRepository, cartService);
    couponService = new CouponService(couponRepository, checkoutService);

    // 상품 생성, 해당 상품을 장바구니에 추가, 임시 영수증 생성, 쿠폰 생성
    productId = productService.addProduct(mockProduct);
    cartId = cartService.addCart();
    const cartItemCount = 10;
    cartService.addCartItem(cartId, productId, cartItemCount);
    const selectedProductIds = [1];
    checkoutId = checkoutService.createCheckout(cartId, selectedProductIds);
    couponId = couponService.createCoupon(mockCouponData);
  });

  test("쿠폰을 생성하면 생성된 쿠폰 id를 반환한다.", () => {
    // when
    const newCouponId = couponService.createCoupon(mockCouponData);

    // then
    expect(newCouponId).toBe(2);
  });

  test("올바른 쿠폰 목록을 조회한다.", () => {
    // given
    const requestedAt = new Date("2026-06-10");

    // when
    const coupons = couponService.getCoupons(checkoutId, requestedAt);

    // then
    expect(coupons).toEqual([
      {
        id: 1,
        name: "5,000원 할인 쿠폰",
        type: "FIXED5000",
        expiryDate: "2026-06-10",
        fixedDiscountPrice: 5000,
        fixedDiscountRate: null,
        minAmount: 100000,
        startTime: null,
        endTime: null,
        isAvailable: true,
      },
    ]);
  });
});
