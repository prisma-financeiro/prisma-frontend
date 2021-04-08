import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.default};
    cursor: pointer;

    :hover {
      color: ${theme.colors.secondary};
    }
  `}
`;
