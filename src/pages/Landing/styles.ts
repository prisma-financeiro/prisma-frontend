import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  margin-top: 8rem;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 1.6rem;
  padding-top: 10rem;  
`;

export const AnimatedWrapper = styled(motion.div)`
  width: 100%;
  display: flex;  
  justify-content: center;

  @media (max-width: 670px) {
    flex-direction: column;
  }
`;
