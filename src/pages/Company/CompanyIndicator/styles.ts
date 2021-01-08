import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
`;

export const CardContainer = styled.article`
  ${({ theme }) => css`    
    background: ${theme.colors.background};
    width: 100%;
    border-radius: ${theme.radio.default};   
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    grid-gap: 2.1rem;

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {     
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-self: center;
      column-gap: 1rem;
      row-gap: 1rem;
    }
  `}
`;

export const ChartContainer = styled.article`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    width: 100%;
    border-radius: ${theme.radio.default};   
    display: flex;
    flex-direction: column;
    justify-content: center;    
  `}
`;

export const IconContainer = styled(motion.div)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    color: ${theme.colors.primary};
    font-size: ${theme.fontSizes.xlarge};
    margin-bottom: 2rem;
    width: 2rem;
    height: 2rem;
    
    :hover {
        cursor: pointer;
        background: ${theme.colors.greyLowerOpacity};
        border-radius: 50%;
    }
  `}
`;
