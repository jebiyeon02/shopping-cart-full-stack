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
      <div>주문 금액 {orderPrice}</div>
      <div>쿠폰 할인 금액 {couponDiscountPrice}</div>
      <div>배송비 {deliveryFee}</div>
      <div>총 결제 금액 {totalPrice}</div>
    </div>
  );
};

export default CheckoutPaymentSummary;
