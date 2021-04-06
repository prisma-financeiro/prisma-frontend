import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  flex: 1 0 auto;
  margin-top: 8rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 1.6rem;
  
  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    padding: 0;
    margin-top: 6rem;
  }
`;

export const AnimatedWrapper = styled(motion.div)`  
  width: 50%;
  height: 50%;
  display: flex;  
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    flex-direction: column;   
    width: 90%; 
  }
`;

export const Card = styled(motion.div)`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    width: 100%;    
    height: 10rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-radius: ${theme.radio.default};
    padding: 1.6rem 2.4rem;
    box-shadow: ${theme.shadows.flat};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      margin-bottom: 0;
      border-radius: ${theme.radio.tiny};
      padding: 1.0rem;
    }
  `}
`

