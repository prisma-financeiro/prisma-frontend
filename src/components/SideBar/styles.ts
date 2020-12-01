import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`  
  display: flex;
  flex: 1 100%;
  flex-direction: column;
  position: fixed;
  left: 0;
  width: 30rem;
  height: 100%;

  @media (max-width: 670px) {
    max-width: 100%;
  }
`;

export const AnimatedContainer = styled(motion.section)`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    width: 100%;
    height: 100%;
    padding: 2.4rem;
  `}
`;
