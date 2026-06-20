import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import BackIcon from '../Icons/BackIcon';
import Button from '../components/Button';
import {
  ContentDescription,
  Notice,
  PageTitle,
} from '../components/Typography';
import OrderItem from './components/OrderItem';
import OrderContent from './components/OrderContent';
import { useOrderSheet } from './hooks/useOrderSheet';
import { useOrderSheetPricing } from './hooks/useOrderSheetPricing';
import NoticeIcon from '../Icons/NoticeIcon';
import OrderSummaryRow from './components/OrderSummaryRow';

const OrderConfirmPage = () => {
  const { orderSheetId } = useParams();
  const navigate = useNavigate();
  const { orderSheet, isLoading, error } = useOrderSheet(orderSheetId);
  const { pricing } = useOrderSheetPricing(orderSheetId);

  const productTypeCount = orderSheet?.items.length ?? 0;
  const productQuantity =
    orderSheet?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

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
      <PageTitle>주문 확인</PageTitle>

      <OrderContent isLoading={isLoading} error={error}>
        {orderSheet && (
          <OrderItemsSection>
            <ContentDescription>
              총 {productTypeCount}종류의 상품 {productQuantity}개를 주문합니다.
              <br />
              최종 결제 금액을 확인해 주세요.
            </ContentDescription>

            {orderSheet.items.map(({ product, quantity }) => (
              <OrderItem
                key={product.id}
                name={product.name}
                thumbnail={product.thumbnail}
                price={product.price}
                quantity={quantity}
              />
            ))}
          </OrderItemsSection>
        )}

        <NoticeSection>
          <NoticeIcon />
          <Notice>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</Notice>
        </NoticeSection>

        {pricing && (
          <OrderSummarySection aria-label="결제 금액 요약">
            <OrderSummaryRow label="주문 금액" amount={pricing.orderAmount} />
            <OrderSummaryRow
              label="쿠폰 할인 금액"
              amount={pricing.discountAmount}
              prefix="-"
            />
            <OrderSummaryRow label="배송비" amount={pricing.shippingFee} />

            <SummaryDivider />

            <OrderSummaryRow
              label="총 결제 금액"
              amount={pricing.totalPaymentAmount}
            />
          </OrderSummarySection>
        )}
      </OrderContent>

      <BottomButtonWrapper>
        <Button fullWidth disabled={!orderSheet || !pricing}>
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

const OrderItemsSection = styled.section``;

const NoticeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.5rem 0;
`;

const OrderSummarySection = styled.section`
  margin-top: 0.75rem;
  border-top: 1px solid #0000001a;
`;

const SummaryDivider = styled.hr`
  height: 1px;
  margin: 0.75rem 0;
  border: 0;
  background-color: #0000001a;
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
