import type { ReactNode } from 'react';

interface CouponContentProps {
  children: ReactNode;
  error: Error | null;
  isLoading: boolean;
}

const CouponContent = ({ children, error, isLoading }: CouponContentProps) => {
  if (isLoading) {
    return <p>쿠폰을 불러오는 중입니다.</p>;
  }

  if (error) {
    return <p role="alert">쿠폰 정보를 불러오지 못했습니다.</p>;
  }

  return children;
};

export default CouponContent;
