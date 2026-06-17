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
  checkoutRouter.patch(
    "/:checkoutId/coupons",
    checkoutController.applyCheckoutCoupons,
  );

  return checkoutRouter;
};

export default createCheckoutRouter;
