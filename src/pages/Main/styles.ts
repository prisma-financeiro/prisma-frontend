import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  flex: 1 0 auto;
  margin-top: 8rem;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 1.6rem;
  
  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    padding: 0;
    margin-top: 6rem;
  }
`;

export const AnimatedWrapper = styled(motion.div)`  
  width: 100%;
  height: 100%;
  display: flex;  
  flex-direction: row;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    flex-direction: column;    
  }
`;
