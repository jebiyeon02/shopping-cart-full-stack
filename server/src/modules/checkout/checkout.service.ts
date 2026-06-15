import AppError from "../../errors/AppError.js";
import CartService from "../cart/cart.service.js";
import { ProductRepository } from "../product/product.repository.js";
import { CheckoutRepository } from "./checkout.repository.js";

class CheckoutService {
  constructor(
    private checkoutRepository: CheckoutRepository,
    private cartService: CartService,
  ) {}

  createCheckout(cartId: number, selectedProductIds: number[]) {
    const newCheckout = this.checkoutRepository.create(
      cartId,
      selectedProductIds,
    );

    return newCheckout.toJson().id;
  }

  getCartItems(cartId: number) {
    const cart = this.getCart(cartId);

    return cart.toJsonCartItems().map((cartItem) => {
      const product = this.productRepository.findById(cartItem.productId);

      if (!product) {
        throw new AppError("PRODUCT_NOT_EXIST");
      }

      const productData = product.toJson();

      return {
        id: productData.id,
        name: productData.name,
        price: productData.price,
        imgUrl: productData.imgUrl,
        itemCount: cartItem.itemCount,
      };
    });
  }
}

export default CheckoutService;
