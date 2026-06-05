import styled from '@emotion/styled';
import CheckedIcon from '../Icons/CheckedIcon';
import UncheckedIcon from '../Icons/UncheckedIcon';

interface CheckBoxProps {
  checked: boolean;
  onToggle: () => void;
}

const CheckBox = ({ checked, onToggle }: CheckBoxProps) => {
  return (
    <Button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
    >
      {checked ? <CheckedIcon /> : <UncheckedIcon />}
    </Button>
  );
};

const Button = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export default CheckBox;
