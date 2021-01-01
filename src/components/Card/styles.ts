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
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-radius: ${theme.radio.default};
    padding: 1.6rem 2.4rem;
    box-shadow: ${theme.shadows.flat};
    display: flex;
    flex-direction: column;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      width: 100%;
      margin-bottom: 0;
      border-radius: ${theme.radio.tiny};
      padding: 1.0rem;
    }
  `}
`;

export const ContentHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    cursor: pointer;

    > h2 {   
      color: ${theme.colors.h2};
    }
  `}
`;


export const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
    > * {
      margin-left: 2rem;
      color: ${theme.colors.primary};
      width: 2rem;
      height: 2rem;

      :hover {
        cursor: pointer;
        background: ${theme.colors.greyLowerOpacity};
        border-radius: 50%;
      }
    }
    
  `}
`;

export const CardBody = styled(motion.article)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    
    @media (max-width: 670px) {
      align-items: flex-start;
    }
  `}
`;