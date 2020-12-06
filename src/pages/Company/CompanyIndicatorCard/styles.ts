import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface IconProps {
  color: string;
}

export const AnimatedCard = styled(motion.article)`
  ${({ theme }) => css`    
    background: ${theme.colors.background};
    width: 100%;
    border-radius: ${theme.radio.default};   
    display: flex;
    justify-content: flex-start;
  `}
`;

export const IconContainer = styled(motion.button)`  
  ${({ theme }) => css`
    margin: 1rem 0;
    color: ${(props: IconProps) => props.color};
    background-color: transparent; 
    font-size: ${theme.fontSizes.xlarge};

    :hover {    
      color: ${theme.colors.primary};
      cursor: pointer;
    }
  `}
`;

