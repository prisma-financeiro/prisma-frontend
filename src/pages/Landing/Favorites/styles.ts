import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;

    > h2 {
      font-weight: 500;
      text-transform: uppercase;
      color: ${theme.colors.h2};
      font-size: ${theme.fontSizes.large};
    }
  `}
`;

export const SubHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;

    > h3 {
      font-weight: 500;
      color: ${theme.colors.h3};
      font-size: ${theme.fontSizes.default};
    }
  `}
`;

export const DataWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 2.1rem;
`;