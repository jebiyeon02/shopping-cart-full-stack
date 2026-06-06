import styled from "@emotion/styled";

const CartFail = ({ message }: { message: string }) => {
  return <FallbackLayout>{message}</FallbackLayout>;
};

export default CartFail;

const FallbackLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: black;
  font-weight: 500;
  font-size: 14px;
`;
