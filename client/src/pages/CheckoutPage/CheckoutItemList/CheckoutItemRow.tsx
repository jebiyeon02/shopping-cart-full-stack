import type { CheckoutItem } from "../../../domain/checkout/checkout.api";

const CheckoutItemRow = ({ checkoutItem }: { checkoutItem: CheckoutItem }) => {
  const { imgUrl, name, price, itemCount } = checkoutItem;
  return (
    <div>
      <span>{imgUrl},</span>
      <span>{name},</span>
      <span>{price}원,</span>
      <span>{itemCount}개</span>
    </div>
  );
};

export default CheckoutItemRow;
