import styled from "@emotion/styled";
import { typography } from "../../../../shared/styles/typography";

const CartLoading = () => {
  return <FallbackLayout>로딩중...</FallbackLayout>;
};

export default CartLoading;

const FallbackLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  ${typography.bodyMedium}
`;
