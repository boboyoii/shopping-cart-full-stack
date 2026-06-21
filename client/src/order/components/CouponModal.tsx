import styled from '@emotion/styled';
import { useState } from 'react';
import NoticeIcon from '../../Icons/NoticeIcon';
import Modal from '../../components/Modal';
import { useCoupons } from '../hooks/useCoupons';
import CouponContent from './CouponContent';
import CouponItem from './CouponItem';

interface CouponModalProps {
  onClose: () => void;
  initialSelectedCouponIds: string[];
}

const CouponModal = ({
  onClose,
  initialSelectedCouponIds,
}: CouponModalProps) => {
  const { couponData, isLoading, error } = useCoupons();
  const [selectedCouponIds, setSelectedCouponIds] = useState(
    initialSelectedCouponIds,
  );

  const handleCouponToggle = (couponId: string) => {
    setSelectedCouponIds((previousCouponIds) => {
      if (previousCouponIds.includes(couponId)) {
        return previousCouponIds.filter((id) => id !== couponId);
      }

      return [...previousCouponIds, couponId];
    });
  };

  return (
    <Modal isOpen onClose={onClose}>
      <Modal.Header>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>

      <Modal.Body>
        <CouponContent isLoading={isLoading} error={error}>
          {couponData && (
            <>
              <CouponNotice>
                <NoticeIcon />
                쿠폰은 최대 {couponData.maxCouponCount}개까지 사용할 수
                있습니다.
              </CouponNotice>

              <CouponList>
                {couponData.coupons.map((coupon) => (
                  <CouponItem
                    key={coupon.id}
                    coupon={coupon}
                    checked={selectedCouponIds.includes(coupon.id)}
                    onToggle={() => handleCouponToggle(coupon.id)}
                  />
                ))}
              </CouponList>
            </>
          )}
        </CouponContent>
      </Modal.Body>
    </Modal>
  );
};

const CouponNotice = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  font-size: 0.75rem;
`;

const CouponList = styled.ul`
  margin: 0.75rem 0 0;
  padding: 0;
`;

export default CouponModal;
