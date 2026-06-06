import styled from "@emotion/styled";

const CartLoading = () => {
  return <FallbackLayout>로딩중...</FallbackLayout>;
};

export default CartLoading;

const FallbackLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: black;
  font-weight: 500;
  font-size: 14px;
`;
