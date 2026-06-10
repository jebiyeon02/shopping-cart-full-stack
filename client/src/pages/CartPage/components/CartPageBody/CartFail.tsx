import styled from "@emotion/styled";
import { typography } from "../../../../shared/styles/typography";

const CartFail = ({ message }: { message: string }) => {
  return <FallbackLayout>{message}</FallbackLayout>;
};

export default CartFail;

const FallbackLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  ${typography.bodyMedium}
`;
