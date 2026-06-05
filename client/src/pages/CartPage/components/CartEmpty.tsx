import styled from "@emotion/styled";

const CartEmpty = () => {
  return (
    <CartEmptyLayout>
      <CartEmptyTitle>장바구니</CartEmptyTitle>
      <CartEmptyText>장바구니에 담은 상품이 없습니다.</CartEmptyText>
    </CartEmptyLayout>
  );
};

export default CartEmpty;

const CartEmptyLayout = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: calc(100vh - 128px);
  padding: 36px 24px;
  color: black;
`;

const CartEmptyTitle = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 24px;
`;

const CartEmptyText = styled.p`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-weight: 500;
  font-size: 14px;
`;
