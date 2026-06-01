import { Router } from "express";
import CartController from "./cart.controller.js";

const createCartRouter = (cartController: CartController) => {
  const cartRouter = Router();

  cartRouter.post("/:cartId", cartController.addCartItem);
  cartRouter.get("/:cartId", cartController.getCartItems);
  cartRouter.delete("/:cartId/items/:productId", cartController.deleteCartItem);
  cartRouter.patch("/:cartId/items/:productId", cartController.updateItemCount);

  return cartRouter;
};

export default createCartRouter;
