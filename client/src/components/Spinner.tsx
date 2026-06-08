import styled from '@emotion/styled';

const Spinner = styled.span`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid #dedede;
  border-top-color: #000000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.6s;
  }
`;

export default Spinner;
