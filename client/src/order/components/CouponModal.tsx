import Modal from '../../components/Modal';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>

      <Modal.Body>쿠폰</Modal.Body>
    </Modal>
  );
};

export default CouponModal;
