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

export const ComparatorContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding: 0 2.4rem;
    display: flex;
    flex-direction: row;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      width: 100%;
      margin-bottom: 0;
      margin-top: 0;
      border-radius: ${theme.radio.tiny};
      padding: 1.0rem;
    }
  `}
`;

export const AssetVerticalList = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
  `}
`;

export const Placeholder = styled(motion.div)`
  ${({ theme }) => css`
    height: 100vh;
    width: 18rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    position: relative;
    border-radius: ${theme.radio.small};
    -webkit-animation-duration: 1.5s;
    -webkit-animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: placeHolderShimmer;
    -webkit-animation-timing-function: linear;
    background: ${theme.colors.color4};
    background-image: linear-gradient(to right, ${theme.colors.color4} 0%, ${theme.colors.background} 20%, ${theme.colors.color4} 40%, ${theme.colors.color4} 100%);
    background-repeat: no-repeat;
    background-size: 80rem 100vh;

    @keyframes placeHolderShimmer {
      0% {
        background-position: -46rem 0;
      }
      100% {
        background-position: 46rem 0;
      }
    }
  `}
`;

export const HorizontalScroll = styled.div`
  ${({ theme }) => css`
    overflow-x: scroll;
    width: 100%;
    display: flex;
    flex-direction: row;

    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 1rem;      
    }
  
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255,255,255,.1);
      border-radius: 3rem;
  
      &:hover {
        background: rgba(255,255,255,.2);
        opacity: 50%;
      }
    }  
  `}
`;