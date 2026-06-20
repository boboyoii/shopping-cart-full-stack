import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import BackIcon from '../Icons/BackIcon';
import Button from '../components/Button';
import { getOrderSheet, type OrderSheet } from '../apis/orderSheet';

const OrderConfirmPage = () => {
  const { orderSheetId } = useParams();
  const navigate = useNavigate();
  const [orderSheet, setOrderSheet] = useState<OrderSheet | null>(null);

  useEffect(() => {
    if (!orderSheetId) return;

    const fetchOrderSheet = async () => {
      const fetchedOrderSheet = await getOrderSheet(orderSheetId);

      setOrderSheet(fetchedOrderSheet);
      console.log(fetchedOrderSheet);
    };

    void fetchOrderSheet();
  }, [orderSheetId]);

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
      <Title>주문 확인</Title>

      <BottomButtonWrapper>
        <Button fullWidth>결제하기</Button>
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

const Title = styled.h2`
  margin: 0;
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
