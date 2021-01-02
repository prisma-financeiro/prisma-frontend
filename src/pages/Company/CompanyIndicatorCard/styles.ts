import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface IconProps {
  color: string;
}

export const AnimatedCardContainer = styled(motion.article)`
  ${({ theme }) => css`    
    background: ${theme.colors.background};
    width: 100%;
    border-radius: ${theme.radio.default};   
    display: flex;
    justify-content: flex-start;

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {     
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-self: center;
      column-gap: 1rem;
      row-gap: 1rem;
    }
  `}
`;
export const AnimatedChartContainer = styled(motion.article)`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    width: 100%;
    border-radius: ${theme.radio.default};   
    display: flex;
    justify-content: center;    
  `}
`;

export const IconContainer = styled(motion.button)`  
  ${({ theme }) => css`
    margin: 1rem 0;
    color: ${(props: IconProps) => props.color};
    background-color: transparent; 
    font-size: ${theme.fontSizes.xlarge};
    align-self: flex-start;

    :hover {    
      color: ${theme.colors.primary};
      cursor: pointer;
    }
  `}
`;

