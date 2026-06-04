const CartPaymentSummary = ({
  orderPrice,
  deliveryFee,
}: {
  orderPrice: number;
  deliveryFee: number;
}) => {
  return <div>{`주문 금액: ${orderPrice}, 배송비: ${deliveryFee}`}</div>;
};

export default CartPaymentSummary;
