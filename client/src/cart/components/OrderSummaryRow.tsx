import styled from '@emotion/styled';

interface OrderSummaryRowProps {
  amount: number;
  label: string;
}

const OrderSummaryRow = ({ amount, label }: OrderSummaryRowProps) => {
  return (
    <Row>
      <Label>{label}</Label>
      <Value>{amount.toLocaleString()}원</Value>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
`;

const Label = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

const Value = styled.strong`
  font-weight: 700;
  font-size: 1.5rem;
`;

export default OrderSummaryRow;
