import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  margin-top: 8rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
  padding-top: 10rem;
  justify-content: center;

  @media (max-width: 1080px) {
    justify-content: center;
  }
  
`;

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
    flex-direction: row;
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


