import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const AnimatedCard = styled(motion.article)`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    width: 100%;
    height: 100%;
    min-height: 17.6rem;
    border-radius: ${theme.radii.default};
    padding: 1.6rem 2.4rem;
    box-shadow: ${theme.shadows.flat};
    display: flex;
    flex-direction: column;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;

    > h2 {
      font-weight: 500;
      color: ${theme.colors.darkGrey};
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
      color: ${theme.colors.darkGrey};
      font-size: ${theme.fontSizes.default};
    }
  `}
`;

export const DataWrapper = styled.div`
  display: grid;
  grid-gap: 2.1rem;
  grid-template-columns: auto auto;
`;