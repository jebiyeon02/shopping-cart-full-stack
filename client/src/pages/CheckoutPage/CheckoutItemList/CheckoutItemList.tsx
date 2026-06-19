import type { CheckoutItem } from "../../../domain/checkout/checkout.api";
import CheckoutItemRow from "./CheckoutItemRow";

const CheckoutItemList = ({
  checkoutItems,
}: {
  checkoutItems: CheckoutItem[];
}) => {
  return (
    <div>
      <div>체크아웃 상품 리스트</div>
      {checkoutItems.map((checkoutItem) => (
        <CheckoutItemRow checkoutItem={checkoutItem} />
      ))}
    </div>
  );
};

export default CheckoutItemList;
