import { Router } from "express";
import CheckoutController from "./checkout.controller.js";

const createCheckoutRouter = (checkoutController: CheckoutController) => {
  const checkoutRouter = Router();

  checkoutRouter.post("/", checkoutController.addCheckout);
  checkoutRouter.get("/:checkoutId", checkoutController.getCheckout);
  checkoutRouter.get(
    "/:checkoutId/coupons",
    checkoutController.getCheckoutCoupons,
  );

  return checkoutRouter;
};

export default createCheckoutRouter;
