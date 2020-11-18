import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  max-width: 26.4rem;
  display: flex;
  flex: 1 100%;
  flex-direction: column;

  @media (max-width: 670px) {
    max-width: 100%;
  }
`;

export const AnimatedContainer = styled(motion.section)`
  ${({ theme }) => css`
    background: ${theme.colors.background};

    max-height: 60rem;
    width: 100%;
    height: 100%;
    border-radius: ${theme.radii.default};
    box-shadow: ${theme.shadows.default};
    padding: 2.4rem;
  `}
`;
