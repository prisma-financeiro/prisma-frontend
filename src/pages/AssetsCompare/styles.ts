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

export const ButtonContainer = styled.div`
  top: 10.5rem;
  display: flex;
  flex-direction: row;
`;

export const ComparatorContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding: 0 2.4rem;
    display: flex;
    flex-direction: row;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      width: 100%;
      margin-bottom: 0;
      border-radius: ${theme.radio.tiny};
      padding: 1.0rem;
    }
  `}
`;

export const AssetHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 21rem;
    height: 20rem;
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 10.5rem;
    background: ${theme.colors.color4};
    box-shadow: 0 8px 6px -7px black, 0px -35px 1px ${theme.colors.darkGrey};

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      top: -4.5rem;
      border-radius: 0;
      padding: 0.5rem 1rem;
      margin-bottom: 1.5rem;
    }
  `}  
`;