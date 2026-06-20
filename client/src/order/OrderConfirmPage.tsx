import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import BackIcon from '../Icons/BackIcon';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { ContentDescription, PageTitle } from '../components/Typography';
import OrderItem from './components/OrderItem';
import { useOrderSheet } from './hooks/useOrderSheet';

const OrderConfirmPage = () => {
  const { orderSheetId } = useParams();
  const navigate = useNavigate();
  const { orderSheet, isLoading, error } = useOrderSheet(orderSheetId);

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

      {isLoading && (
        <LoadingState role="status">
          <Spinner aria-hidden="true" />
        </LoadingState>
      )}

      {error && <StatusMessage role="alert">{error.message}</StatusMessage>}

      {orderSheet && !isLoading && !error && (
        <>
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
        </>
      )}

      <BottomButtonWrapper>
        <Button fullWidth disabled={!orderSheet || isLoading || Boolean(error)}>
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

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 26rem;
  transform: translateX(-50%);
  z-index: 100;
`;

const LoadingState = styled.div`
  min-height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusMessage = styled.p`
  min-height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  font-size: 1rem;
  font-weight: 400;
`;

export default OrderConfirmPage;
