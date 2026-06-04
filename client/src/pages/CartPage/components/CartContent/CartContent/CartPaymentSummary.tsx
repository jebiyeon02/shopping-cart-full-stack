import styled from "@emotion/styled";
import { formatPrice } from "../../../../../shared/utils";

const CartPaymentSummary = ({
  orderPrice,
  deliveryFee,
}: {
  orderPrice: number;
  deliveryFee: number;
}) => {
  const totalPrice = orderPrice + deliveryFee;

  return (
    <CartPaymentSummaryLayout>
      <SummaryTable>
        <tbody>
          <SummaryTr>
            <SummaryTh scope="row">주문 금액</SummaryTh>
            <SummaryTd>{formatPrice(orderPrice)}원</SummaryTd>
          </SummaryTr>
          <SummaryTr $hasDivider>
            <SummaryTh scope="row">배송비</SummaryTh>
            <SummaryTd>{formatPrice(deliveryFee)}원</SummaryTd>
          </SummaryTr>
          <SummaryTr>
            <SummaryTh scope="row">총 결제 금액</SummaryTh>
            <SummaryTd>{formatPrice(totalPrice)}원</SummaryTd>
          </SummaryTr>
        </tbody>
      </SummaryTable>
    </CartPaymentSummaryLayout>
  );
};

export default CartPaymentSummary;

const CartPaymentSummaryLayout = styled.div`
  margin-top: 32px;
`;

const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid #0000001a;
`;

const SummaryTr = styled.tr<{ $hasDivider?: boolean }>`
  border-bottom: ${({ $hasDivider }) =>
    $hasDivider ? "1px solid #0000001a" : "none"};
`;

const SummaryTh = styled.th`
  color: black;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
`;

const SummaryTd = styled.td`
  padding: 12px;
  color: black;
  font-weight: 700;
  font-size: 24px;
  text-align: right;
`;
