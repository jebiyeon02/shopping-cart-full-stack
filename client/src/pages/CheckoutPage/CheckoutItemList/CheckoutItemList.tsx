import type { CheckoutItem } from "../../../domain/checkout/checkout.api";
import CheckoutItemRow from "./CheckoutItemRow";

const CheckoutItemList = ({
  checkoutItems,
}: {
  checkoutItems: CheckoutItem[];
}) => {
  return (
    <div>
      {checkoutItems.map((checkoutItem) => (
        <CheckoutItemRow
          key={checkoutItem.productId}
          checkoutItem={checkoutItem}
        />
      ))}
    </div>
  );
};

export default CheckoutItemList;
