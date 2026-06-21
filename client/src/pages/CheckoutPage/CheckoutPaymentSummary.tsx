import { formatPrice } from "../../shared/utils";

const CheckoutPaymentSummary = ({
  orderPrice,
  couponDiscountPrice,
  deliveryFee,
  totalPrice,
}: {
  orderPrice: number;
  couponDiscountPrice: number;
  deliveryFee: number;
  totalPrice: number;
}) => {
  return (
    <div>
      <div>주문 금액 {formatPrice(orderPrice)}원</div>
      <div>쿠폰 할인 금액 -{formatPrice(couponDiscountPrice)}원</div>
      <div>배송비 {formatPrice(deliveryFee)}원</div>
      <div>총 결제 금액 {formatPrice(totalPrice)}원</div>
    </div>
  );
};

export default CheckoutPaymentSummary;
