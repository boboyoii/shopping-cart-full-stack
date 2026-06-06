import styled from '@emotion/styled';
import MinusIcon from '../Icons/MinusIcon';
import PlusIcon from '../Icons/PlusIcon';

interface StepperProps {
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  value: number;
}

const Stepper = ({ max = 99, min = 1, onChange, value }: StepperProps) => {
  const isDecreaseDisabled = value <= min;
  const isIncreaseDisabled = value >= max;

  return (
    <Container>
      <StepButton
        type="button"
        disabled={isDecreaseDisabled}
        onClick={() => onChange(value - 1)}
        aria-label="감소"
      >
        <MinusIcon />
      </StepButton>
      <Value>{value}</Value>
      <StepButton
        type="button"
        disabled={isIncreaseDisabled}
        onClick={() => onChange(value + 1)}
        aria-label="증가"
      >
        <PlusIcon />
      </StepButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StepButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background-color: #ffffff;
  cursor: pointer;

  &:disabled {
    color: #bebebe;
    cursor: not-allowed;
  }
`;

const Value = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
`;

export default Stepper;
