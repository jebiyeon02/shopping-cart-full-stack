import { NextFunction, Request, Response } from "express";
import CheckoutService from "./checkout.service.js";

class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  addCheckout = (req: Request, res: Response, next: NextFunction) => {
    const { cartId, selectedProductIds } = req.body;

    try {
      const newCheckoutId = this.checkoutService.createCheckout(
        cartId,
        selectedProductIds,
      );

      res.status(201).json({
        code: 201,
        message: "성공적으로 생성되었습니다.",
        result: { checkoutId: newCheckoutId },
      });
    } catch (error) {
      next(error);
    }
  };

  getCheckout = (req: Request, res: Response, next: NextFunction) => {
    const { checkoutId } = req.params;

    try {
      const newCheckoutId = this.checkoutService.getCheckoutContent(
        Number(checkoutId),
      );

      res.status(201).json({
        code: 201,
        message: "성공적으로 생성되었습니다.",
        result: { ...newCheckoutId },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CheckoutController;
