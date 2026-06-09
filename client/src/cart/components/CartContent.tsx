import type { ReactNode } from 'react';
import Spinner from '../../components/Spinner';
import styled from '@emotion/styled';

interface CartContentProps {
  children: ReactNode;
  error: Error | null;
  isEmpty: boolean;
  isLoading: boolean;
}

const CartContent = ({
  children,
  error,
  isEmpty,
  isLoading,
}: CartContentProps) => {
  if (isLoading) {
    return (
      <LoadingState role="status">
        <Spinner aria-hidden="true" />
      </LoadingState>
    );
  }

  if (error) {
    return (
      <StatusMessage role="alert">
        장바구니 상품을 불러오지 못했습니다.
      </StatusMessage>
    );
  }

  if (isEmpty) {
    return <StatusMessage>장바구니에 담은 상품이 없습니다.</StatusMessage>;
  }

  return children;
};

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
  font-weight: 400;
  font-size: 1rem;
`;

export default CartContent;
