import styled from 'styled-components';
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

  -webkit-box-shadow: 0 8px 6px -7px black;
  -moz-box-shadow: 0 8px 6px -7px black;
  box-shadow: 0 8px 6px -7px black;
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
  flex: 1 100%;
  max-width: 30%;
  position: fixed;
  left: 1.5rem;
  top: 1.1rem;
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) { 
    width: 0;
    min-width: 0;
    display: none;
  }
`;

export const Logo = styled(motion.div)`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > svg {
    max-width: 5rem;
    height: auto;
    margin: 0.5rem 0.5rem 0.5rem 1rem;
  }
`

export const AnimatedRightNav = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 40%;
  min-width: 20rem;
  max-width: 40rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) { 
    width: 15%;
    min-width: 10rem;
  }
`;

export const MenuItems = styled.div`  
  width: 100%;
  max-width: 100%;
  margin-left: 30rem;
  display: flex;
  flex-direction: row;
  justify-content: start;  
  align-items: center;
  height: 100%;  
  color: ${({ theme }) => theme.colors.grey};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) { 
    margin-left: 1rem;
  }
`;

export const MenuItem = styled.div<{isActive: boolean}>`
  margin-right: 5rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center;
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.grey};

  :hover {
    color: ${({ theme }) => theme.colors.secondary};
    border-bottom: 0.3rem solid ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    margin-right: 2rem;
    margin-left: 1.5rem;    

    > p {
      display: none;
    }
  }
`;

export const Icon = styled.div`
  font-size: 24px;
`;