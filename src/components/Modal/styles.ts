import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  ${({ theme }) => css`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 500;
    width: 70%;
    border-radius: ${theme.radio.medium};
    left: 15%;
    top: 30%;
    transition: all 0.3s ease-out;
    overflow:hidden;
    background-color: ${theme.colors.background};

    @media (min-width: 600px) {
      width: 500px;
      left: calc(50% - 250px);
    }

    @media (max-width: ${theme.deviceWidth.mobile}) {
      width: 90%;
      left: 5%;
    }
  `}  
`;

export const Header = styled.div`
  ${({ theme }) => css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin: 1rem;
      min-height: 5rem;
      
      h1: {
        color: ${theme.colors.h1};
      }
  `} 
`;

export const CloseIcon = styled(motion.div)`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.xlarge};
    cursor: pointer;
  `}
`;

export const Body = styled.div`
  min-height: 10rem;
  padding: 16px;
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 1rem;
  padding: 1rem;
  min-height: 5rem;
`;


