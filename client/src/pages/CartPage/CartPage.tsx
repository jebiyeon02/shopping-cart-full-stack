import { useState } from "react";
import Header from "../../shared/components/Header";
import CartContent from "./components/CartContent/CartContent/CartContent";
import CartEmpty from "./components/CartEmpty";
import BaseButton from "../../shared/components/BaseButton";
import useCartItem from "./useCartItem";
import { getOrderPrice } from "../../domain/cart/cart.util";

const CartPage = ({ cartId }: { cartId: number }) => {
  const { cartItems, requestDeleteCartItem, requestUpdateCartItemCount } =
    useCartItem(cartId);

  const [checkedProductIds, setCheckedProductIds] = useState<number[]>([]);

  if (!cartItems) return;

  const filteredCartItem = cartItems.filter((cartItem) =>
    checkedProductIds.includes(cartItem.id),
  );
  const orderPrice = getOrderPrice(filteredCartItem);

  const handleAllProductSelect = (action: "check" | "uncheck") => {
    if (action === "uncheck") {
      setCheckedProductIds([]);
      return;
    }
    // TODO: 전체 덮어쓰기 vs 체크 안된 것만 찾아서 checkedProductIds에 넣어주기 트레이드 오프 고민
    const allProductIds = cartItems.map((cartItem) => cartItem.id);
    setCheckedProductIds(allProductIds);
  };

  const handleProductSelect = (
    productId: number,
    action: "check" | "uncheck",
  ) => {
    if (action === "uncheck") {
      setCheckedProductIds((prev) => prev.filter((id) => id !== productId));
    } else {
      setCheckedProductIds((prev) => [...prev, productId]);
    }
  };
  return (
    <div>
      <Header actionIcon={<div>SHOP</div>} />
      {cartItems && (
        <CartContent
          cartItems={cartItems}
          checkedProductIds={checkedProductIds}
          orderPrice={orderPrice}
          onDeleteCartItem={requestDeleteCartItem}
          onUpdateCartItemCount={requestUpdateCartItemCount}
          onAllProductSelect={handleAllProductSelect}
          onProductSelect={handleProductSelect}
        />
      )}
      <CartEmpty />
      <BaseButton
        disabled={cartItems.length === 0 || checkedProductIds.length === 0}
      >
        주문 확인
      </BaseButton>
    </div>
  );
};

export default CartPage;
