import styled from '@emotion/styled';

interface ButtonProps {
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: 4rem;
  padding: 1.5rem;
  border: none;
  background-color: ${({ disabled }) => (disabled ? '#BEBEBE' : '#000000')};
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export default Button;
