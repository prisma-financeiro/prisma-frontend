import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { CardSizes } from './index';

interface CardProps {
  size: CardSizes;
}

export const AnimatedCard = styled(motion.div)`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    width: ${(props: CardProps) => props.size};
    height: 100%;
    margin: 2rem;
    border-radius: ${theme.radio.default};
    padding: 1.6rem 2.4rem;
    box-shadow: ${theme.shadows.flat};
    display: flex;
    flex-direction: column;
  `}
`;

export const ContentHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0 ;    

    > h2 {   
      color: ${theme.colors.h2};
      font-size: ${theme.fontSizes.large};
    }

    :hover {
      cursor: pointer;
    }
  `}
`;

export const CardBody = styled(motion.article)`
  ${({ theme }) => css`
  `}
`;