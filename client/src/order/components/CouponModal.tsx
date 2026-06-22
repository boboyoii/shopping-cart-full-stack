import styled from '@emotion/styled';
import { useState } from 'react';
import NoticeIcon from '../../Icons/NoticeIcon';
import Modal from '../../components/Modal';
import { useAvailableCoupons } from '../hooks/useAvailableCoupons';
import { useCoupons } from '../hooks/useCoupons';
import CouponContent from './CouponContent';
import CouponItem from './CouponItem';

interface CouponModalProps {
  onClose: () => void;
  initialSelectedCouponIds: string[];
  orderSheetId: string;
}

type CouponStatus = 'selected' | 'available' | 'unavailable' | 'limit-reached';

const CouponModal = ({
  onClose,
  initialSelectedCouponIds,
  orderSheetId,
}: CouponModalProps) => {
  const {
    couponData,
    isLoading: isCouponLoading,
    error: couponError,
  } = useCoupons();
  const {
    availableCouponData,
    isLoading: isAvailableCouponLoading,
    error: availableCouponError,
  } = useAvailableCoupons(orderSheetId);
  const [selectedCouponIds, setSelectedCouponIds] = useState(
    initialSelectedCouponIds,
  );

  const availableCouponIds = new Set(
    availableCouponData?.coupons.map(({ id }) => id) ?? [],
  );

  const getCouponStatus = (
    couponId: string,
    currentSelectedCouponIds = selectedCouponIds,
  ): CouponStatus => {
    if (currentSelectedCouponIds.includes(couponId)) {
      return 'selected';
    }

    if (!availableCouponIds.has(couponId)) {
      return 'unavailable';
    }

    if (currentSelectedCouponIds.length >= (couponData?.maxCouponCount ?? 0)) {
      return 'limit-reached';
    }

    return 'available';
  };

  const handleCouponToggle = (couponId: string) => {
    setSelectedCouponIds((previousCouponIds) => {
      const status = getCouponStatus(couponId, previousCouponIds);

      if (status === 'selected') {
        return previousCouponIds.filter((id) => id !== couponId);
      }

      if (status !== 'available') {
        return previousCouponIds;
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
        <CouponContent
          isLoading={isCouponLoading || isAvailableCouponLoading}
          error={couponError ?? availableCouponError}
        >
          {couponData && (
            <>
              <CouponNotice>
                <NoticeIcon />
                쿠폰은 최대 {couponData.maxCouponCount}개까지 사용할 수
                있습니다.
              </CouponNotice>

              <CouponList>
                {couponData.coupons.map((coupon) => {
                  const status = getCouponStatus(coupon.id);

                  return (
                    <CouponItem
                      key={coupon.id}
                      coupon={coupon}
                      checked={status === 'selected'}
                      disabled={
                        status === 'unavailable' || status === 'limit-reached'
                      }
                      onToggle={() => handleCouponToggle(coupon.id)}
                    />
                  );
                })}
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
