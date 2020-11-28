import styled, { css } from 'styled-components';

export const Divider = styled.div`
${() => css`  
  margin-top: 1.0rem;  
  margin-bottom: 1.0rem;  
  border-bottom: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.greyLowerOpacity};
  opacity: 50%;
  width: 100%
  `}
`;

