import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const AnimatedContainer = styled(motion.header)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  position: fixed;
  top: 0;
  border: 0;
  z-index: 15;
`;

export const Wrapper = styled.div`  
  padding: 0 1.6rem;
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    padding: 0 1.0rem;
    height: 6.2rem;
  }
`;

export const AnimatedLeftNav = styled(motion.div)`
  width: 31rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 700;

  > svg {
    cursor: pointer;
    max-width: 11.2rem;
    height: auto;
    margin: 0 2.4rem 0.4rem -0.4rem;
  }

  @media (max-width: 470px) { 
    width: 0;

    > button {
      display: none;
    }
  }

  @media (max-width: 670px) { 
    width: 0;
  }
`;

export const AnimatedRightNav = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  
`;

export const MenuItems = styled.div`  
  flex: 1;
  min-width: 50%;
  max-width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: start;  
  align-items: center;
  height: 100%;  
  color: ${({ theme }) => theme.colors.primary};
`;

export const MenuItem = styled.div`
  margin-right: 5rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  :hover {
    color: ${({ theme }) => theme.colors.lightGrey};
    cursor: pointer;
    border-bottom: 0.3rem solid ${({ theme }) => theme.colors.lightGrey};
  }  

  @media (max-width: 780px) {
    margin-right: 3rem;
    margin-left: 3rem;
    
    > p {
      display: none;
    }
  }

  @media (max-width: 470px) {
    margin-right: 4rem;
    margin-left: 3rem;    
  }
`;

export const Icon = styled.div`
  font-size: 24px;
`;