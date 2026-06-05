import styled from '@emotion/styled';
import checkedIcon from '../assets/checked.svg';
import uncheckedIcon from '../assets/unchecked.svg';

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
      <Icon
        src={checked ? checkedIcon : uncheckedIcon}
        alt=""
        aria-hidden="true"
      />
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

const Icon = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

export default CheckBox;
