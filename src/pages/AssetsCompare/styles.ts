import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  ${({ theme }) => css`
    flex: 1 0 auto;
    margin-top: 8rem;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 1.6rem;
    justify-content: center;
  `}
`;

export const AnimatedWrapper = styled(motion.main)`  
  ${({ theme }) => css`
    width: 100%;
    max-width: 70%;
    height: 100%;
    margin: 1rem 2.0rem;
    display: flex;
    flex-direction: row;
    background-color: ${theme.colors.background};
    border-radius: ${theme.radio.small};

    @media (max-width: ${theme.deviceWidth.mobile}) {
      margin: 0;
      max-width: 100%;
      align-self: center;
    }
  `}
`;

export const ButtonContainer = styled.div`
  padding: 1rem;
`;