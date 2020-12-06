import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;    
  justify-content: center;  
`;

export const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;  
`;

export const AnimatedCard = styled(motion.article)`
  ${({ theme }) => css`    
    background: ${theme.colors.background};
    width: 100%;
    height: 100%;
    min-height: 17.6rem;
    border-radius: ${theme.radio.default};
    padding: 1.6rem 2.4rem;    
    display: flex;
    flex-direction: column;
    flex-flow: wrap;
  `}
`;

export const AnimatedWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 670px) {
    flex-direction: column;
  }
`;

