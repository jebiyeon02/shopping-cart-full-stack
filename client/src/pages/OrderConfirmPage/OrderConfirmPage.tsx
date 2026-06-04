import BaseButton from "../../shared/components/BaseButton";
import Header from "../../shared/components/Header";
import ArrowBackIcon from "../../assets/arrow_back.png";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../../shared/utils";

const OrderConfirmPage = () => {
  const navigate = useNavigate();
  const { productCount, productItemCount, totalPrice } = useLocation().state;

  return (
    <OrderConfirmPageLayout>
      <Header
        actionIcon={
          <BackButton type="button" onClick={() => navigate(-1)}>
            <ArrowBackImage src={ArrowBackIcon} alt="뒤로가기" />
          </BackButton>
        }
      />
      <OrderConfirmContent>
        <OrderConfirmTitle>주문 확인</OrderConfirmTitle>
        <OrderConfirmDescription>
          총 {productCount}종류의 상품 {productItemCount}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </OrderConfirmDescription>
        <TotalPriceLabel>총 결제 금액</TotalPriceLabel>
        <TotalPrice>{formatPrice(totalPrice)}원</TotalPrice>
      </OrderConfirmContent>
      <BaseButton disabled={true}>결제하기</BaseButton>
    </OrderConfirmPageLayout>
  );
};

export default OrderConfirmPage;

const OrderConfirmPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const ArrowBackImage = styled.img`
  width: 20px;
  height: 20px;
`;

const OrderConfirmContent = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  color: black;
  text-align: center;
`;

const OrderConfirmTitle = styled.h1`
  margin-bottom: 28px;
  font-weight: 700;
  font-size: 24px;
`;

const OrderConfirmDescription = styled.p`
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
`;

const TotalPriceLabel = styled.div`
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 16px;
`;

const TotalPrice = styled.div`
  font-weight: 700;
  font-size: 24px;
`;
