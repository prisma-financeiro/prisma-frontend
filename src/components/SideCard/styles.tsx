import styled, { css } from 'styled-components';

export const Container = styled.div`
${({ theme }) => css`
    padding: 2rem;
    margin: 2.4rem 1rem;
    background: ${theme.colors.background};
    width: 100%;
    max-width: 30rem;
    min-height: 12rem;
    height: 80%;
    border-radius: 5px;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;

    > h2 {
      font-weight: 500;
      color: ${theme.colors.h2};
      font-size: ${theme.fontSizes.large};
    }
  `}
`;