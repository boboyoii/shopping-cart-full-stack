import styled from '@emotion/styled';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import PageLayout from './common/PageLayout';
import BackIcon from './Icons/BackIcon';
import Button from './common/Button';

export interface OrderItem {
  productId: number;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

interface OrderConfirmState {
  orderItems: OrderItem[];
  shippingFee: number;
}

const OrderConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as OrderConfirmState | null;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { orderItems, shippingFee } = state;
  const productTypeCount = orderItems.length;

  const productQuantity = orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPaymentAmount =
    orderItems.reduce((total, item) => total + item.price * item.quantity, 0) +
    shippingFee;

  return (
    <PageLayout
      headerContent={
        <BackButton
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
        >
          <BackIcon />
        </BackButton>
      }
    >
      <Content>
        <Title>주문 확인</Title>
        <Description>
          총 {productTypeCount}종류의 상품 {productQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </Description>

        <PaymentLabel>총 결제 금액</PaymentLabel>
        <PaymentAmount>{totalPaymentAmount.toLocaleString()}원</PaymentAmount>
      </Content>

      <BottomButtonWrapper>
        <Button fullWidth disabled={true}>
          결제하기
        </Button>
      </BottomButtonWrapper>
    </PageLayout>
  );
};

const BackButton = styled.button`
  padding: 0;
  width: 2rem;
  border: none;
  background: none;
  cursor: pointer;
`;

const Content = styled.section`
  min-height: calc(100vh - 12.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 1.5rem;
`;

const Description = styled.p`
  margin-top: 1.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.5;
`;

const PaymentLabel = styled.strong`
  margin-top: 1.5rem;
  font-weight: 700;
  font-size: 1rem;
`;

const PaymentAmount = styled.strong`
  margin-top: 0.75rem;
  font-weight: 700;
  font-size: 1.5rem;
`;

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 26rem;
  transform: translateX(-50%);
  z-index: 100;
`;

export default OrderConfirmPage;
