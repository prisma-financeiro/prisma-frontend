import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`  
  display: flex;
  flex: 1 100%;
  flex-direction: column;
  position: fixed;
  left: 0;
  max-width: 30%;
  height: 100%;

  @media (max-width: 670px) {
    max-width: 100%;
  }
`;

export const AnimatedContainer = styled(motion.section)`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    padding: 2.4rem;
    font-size: ${theme.fontSizes.large};
    font-weight: bold;

    p {
      margin-top: 2rem;
    }

    p:first-child {
      margin-top: 0;
    }
  `}
`;
